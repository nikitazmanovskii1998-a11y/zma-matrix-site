import type { LeadSubmitBody } from "@/lib/lead-payload";

export type SubmitLeadResult = { ok: true } | { ok: false; status: number };

export async function submitLead(payload: LeadSubmitBody): Promise<SubmitLeadResult> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, status: res.status };
    }
    return { ok: true };
  } catch {
    return { ok: false, status: 0 };
  }
}
