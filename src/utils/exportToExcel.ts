import xlsx from "xlsx";
import { AggregatedRecord } from "./loadExcel";

export function exportToExcel(data: AggregatedRecord[], filePath: string) {
  const worksheet = xlsx.utils.json_to_sheet(data);

  const workbook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workbook, worksheet, "Resumo");

  xlsx.writeFile(workbook, filePath);
}
