/**
 * Compares RU and EN site dictionaries for structural parity.
 * Run: npm run check-i18n
 * Exits 1 if keys, array lengths, or value kinds differ.
 */

import { enDictionary } from "../src/i18n/dictionaries/en";
import { ruDictionary } from "../src/i18n/dictionaries/ru";

type Issue = { path: string; message: string };

function kindOf(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function compareShape(a: unknown, b: unknown, path: string, issues: Issue[]): void {
  const ka = kindOf(a);
  const kb = kindOf(b);
  if (ka !== kb) {
    issues.push({
      path,
      message: `type mismatch: RU is ${ka}, EN is ${kb}`,
    });
    return;
  }

  if (ka === "null" || ka === "string" || ka === "number" || ka === "boolean") {
    return;
  }

  if (ka === "array") {
    const aa = a as unknown[];
    const bb = b as unknown[];
    if (aa.length !== bb.length) {
      issues.push({
        path,
        message: `array length: RU ${aa.length}, EN ${bb.length}`,
      });
      return;
    }
    for (let i = 0; i < aa.length; i++) {
      compareShape(aa[i], bb[i], `${path}[${i}]`, issues);
    }
    return;
  }

  if (ka === "object") {
    const oa = a as Record<string, unknown>;
    const ob = b as Record<string, unknown>;
    const keysA = Object.keys(oa).sort();
    const keysB = Object.keys(ob).sort();
    const setA = new Set(keysA);
    const setB = new Set(keysB);
    for (const k of keysA) {
      if (!setB.has(k)) {
        issues.push({ path: path ? `${path}.${k}` : k, message: "missing in EN" });
      }
    }
    for (const k of keysB) {
      if (!setA.has(k)) {
        issues.push({ path: path ? `${path}.${k}` : k, message: "missing in RU (extra in EN)" });
      }
    }
    for (const k of keysA) {
      if (!setB.has(k)) continue;
      compareShape(oa[k], ob[k], path ? `${path}.${k}` : k, issues);
    }
  }
}

function main(): void {
  const issues: Issue[] = [];
  compareShape(ruDictionary, enDictionary, "root", issues);

  if (issues.length === 0) {
    console.log("check-i18n: RU and EN dictionaries match shape (keys, array lengths, kinds).");
    process.exit(0);
  }

  console.error(`check-i18n: ${issues.length} issue(s):\n`);
  for (const { path, message } of issues) {
    console.error(`  ${path}: ${message}`);
  }
  process.exit(1);
}

main();
