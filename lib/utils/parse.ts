/**
 * Parse a text input into an array of numbers.
 * Supports comma, semicolon, space, tab, and newline separators.
 * Works with Excel/Google Sheets paste (tab-separated values).
 */
export function parseNumbers(text: string): number[] {
  return text
    .split(/[\s,;\n]+/)
    .map((s) => s.trim())
    .filter((s) => s !== "")
    .map(Number)
    .filter((n) => !isNaN(n));
}

/**
 * Detect if pasted text contains two tab-separated columns.
 * Returns [col1, col2] if detected, null otherwise.
 */
export function parseTwoColumns(text: string): [number[], number[]] | null {
  const lines = text
    .trim()
    .split(/\n/)
    .filter((l) => l.trim() !== "");
  if (lines.length < 2) return null;

  const col1: number[] = [];
  const col2: number[] = [];

  for (const line of lines) {
    const parts = line.split(/\t/);
    if (parts.length < 2) return null;
    const a = Number(parts[0].trim());
    const b = Number(parts[1].trim());
    if (isNaN(a) || isNaN(b)) return null;
    col1.push(a);
    col2.push(b);
  }

  return [col1, col2];
}
