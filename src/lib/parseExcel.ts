import * as XLSX from "xlsx";

export async function parseNamesFromExcel(file: File): Promise<string[]> {
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const names = rows
    .map((row) => String(row?.[0] ?? "").trim())
    .filter((name) => name.length > 0);

  if (names[0]?.toLowerCase() === "name") {
    return names.slice(1);
  }

  return names;
}
