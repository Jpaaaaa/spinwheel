import * as XLSX from "xlsx";

const TEMPLATE_FILENAME = "participants-template.xlsx";

export function downloadParticipantsTemplate(): void {
  const rows = [
    ["Name"],
    ["Hans Müller"],
    ["Anna Schmidt"],
    ["Klaus Weber"],
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Participants");
  XLSX.writeFile(workbook, TEMPLATE_FILENAME);
}
