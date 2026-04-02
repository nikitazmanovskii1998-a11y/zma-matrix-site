import { NextResponse } from "next/server";
import type { LeadSubmitBody } from "@/lib/lead-payload";
import { formatLeadTelegramMessage } from "@/lib/format-lead-telegram";
import { isValidInternationalPhone } from "@/lib/phone-international";

const MAX_MESSAGE_LEN = 3900;

const isDev = process.env.NODE_ENV === "development";

function devPayload(stage: "env" | "telegram" | "validation" | "server", message: string) {
  return { success: false as const, stage, message };
}

function prodError(error: string) {
  return { error };
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
): NextResponse {
  return NextResponse.json(body, { status });
}

function isLeadBody(x: unknown): x is LeadSubmitBody {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    (o.source === "Contact" || o.source === "Quiz") &&
    (o.locale === "ru" || o.locale === "en") &&
    typeof o.serviceLine === "string" &&
    typeof o.name === "string" &&
    typeof o.phone === "string" &&
    typeof o.email === "string" &&
    typeof o.telegramOrMax === "string" &&
    typeof o.comment === "string"
  );
}

async function sendTelegramMessage(text: string): Promise<{ ok: boolean; status: number; body: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (isDev) {
    console.info(
      "[api/lead] env:",
      "TELEGRAM_BOT_TOKEN=",
      token ? `set (len ${token.length})` : "MISSING",
      "TELEGRAM_CHAT_ID=",
      chatId ? "set" : "MISSING",
    );
  }

  if (!token || !chatId) {
    return { ok: false, status: 503, body: "Telegram is not configured" };
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.length > MAX_MESSAGE_LEN ? `${text.slice(0, MAX_MESSAGE_LEN)}\n…` : text,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const raw = await res.text();
    if (isDev) {
      const preview = raw.length > 800 ? `${raw.slice(0, 800)}…` : raw;
      console.info("[api/lead] telegram HTTP:", res.status, "body:", preview);
    }
    return { ok: res.ok, status: res.status, body: raw };
  } catch (e) {
    clearTimeout(timeout);
    const msg = e instanceof Error ? e.message : "fetch failed";
    if (isDev) {
      console.error("[api/lead] telegram fetch error:", msg);
    }
    return { ok: false, status: 0, body: msg };
  }
}

/** Safe one-line reason from Telegram JSON (no secrets). */
function telegramFailureHint(telegramBody: string): string {
  try {
    const j = JSON.parse(telegramBody) as { description?: string; error_code?: number };
    if (typeof j.description === "string") {
      return j.error_code != null ? `${j.description} (code ${j.error_code})` : j.description;
    }
  } catch {
    /* ignore */
  }
  return "Telegram API rejected the request";
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonResponse(
      isDev
        ? { ...devPayload("validation", "Request body is not valid JSON"), error: "Invalid JSON" }
        : prodError("Invalid JSON"),
      400,
    );
  }

  if (!isLeadBody(json)) {
    return jsonResponse(
      isDev
        ? { ...devPayload("validation", "Payload shape does not match LeadSubmitBody"), error: "Invalid payload" }
        : prodError("Invalid payload"),
      400,
    );
  }

  const body = json;
  if (!body.name.trim() || !body.phone.trim()) {
    return jsonResponse(
      isDev
        ? { ...devPayload("validation", "Missing name or phone"), error: "Missing name or phone" }
        : prodError("Missing name or phone"),
      400,
    );
  }
  if (!isValidInternationalPhone(body.phone)) {
    return jsonResponse(
      isDev
        ? { ...devPayload("validation", "Phone failed E.164 validation"), error: "Invalid phone" }
        : prodError("Invalid phone"),
      400,
    );
  }

  try {
    const text = formatLeadTelegramMessage(body);
    const tg = await sendTelegramMessage(text);

    if (!tg.ok) {
      if (tg.status === 503) {
        return jsonResponse(
          isDev
            ? {
                ...devPayload(
                  "env",
                  "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing after trim — use .env.local in project root (not src/) and restart dev server",
                ),
                error: "Service unavailable",
              }
            : prodError("Service unavailable"),
          503,
        );
      }
      if (tg.status === 0) {
        return jsonResponse(
          isDev
            ? {
                ...devPayload("server", `Outbound request failed: ${tg.body}`),
                error: "Delivery failed",
              }
            : prodError("Delivery failed"),
          502,
        );
      }
      const hint = telegramFailureHint(tg.body);
      return jsonResponse(
        isDev
          ? {
              ...devPayload("telegram", hint),
              error: "Delivery failed",
            }
          : prodError("Delivery failed"),
        502,
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unexpected error";
    if (isDev) {
      console.error("[api/lead] handler error:", msg);
    }
    return jsonResponse(
      isDev ? { ...devPayload("server", msg), error: "Delivery failed" } : prodError("Delivery failed"),
      500,
    );
  }
}
