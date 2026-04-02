import { matchCountryFromE164 } from "@/lib/phone-international";
import type { LeadSubmitBody } from "@/lib/lead-payload";

function nz(s: string): string {
  const t = s.trim();
  return t.length > 0 ? t : "—";
}

/**
 * Human-readable phone line for Telegram: full number + country name.
 */
export function formatPhoneLine(phoneE164: string): string {
  const m = matchCountryFromE164(phoneE164.trim());
  if (!m) return nz(phoneE164);
  const full = `+${m.row.dial}${m.nationalDigits}`;
  return `${full} (${m.row.name})`;
}

function formLabel(source: LeadSubmitBody["source"]): string {
  if (source === "Contact") return "Contact";
  return "Brief";
}

/** Plain-text body for Telegram (no HTML). */
export function formatLeadTelegramMessage(body: LeadSubmitBody): string {
  const lang = body.locale === "ru" ? "RU" : "EN";
  const lines = [
    "Новая заявка",
    "",
    `Форма: ${formLabel(body.source)}`,
    `Язык: ${lang}`,
    `Услуга: ${nz(body.serviceLine)}`,
    `Имя: ${nz(body.name)}`,
    `Телефон: ${formatPhoneLine(body.phone)}`,
    `Email: ${nz(body.email)}`,
    `Telegram / MAX: ${nz(body.telegramOrMax)}`,
    "",
    "Комментарий:",
    body.comment.trim() || "—",
  ];
  return lines.join("\n");
}
