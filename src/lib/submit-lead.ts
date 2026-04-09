import type { LeadSubmitBody } from "@/lib/lead-payload";

export type SubmitLeadResult =
  | { ok: true }
  | { ok: false; status: number; error?: string };

export async function submitLead(payload: LeadSubmitBody): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let error: string | undefined;
    try {
      const data = (await res.json()) as { error?: unknown };
      if (typeof data.error === "string") {
        error = data.error;
      }
    } catch {
      /* ignore */
    }

    if (!res.ok) {
      return { ok: false, status: res.status, error };
    }
    return { ok: true };
  } catch {
    return { ok: false, status: 0 };
  }
}
