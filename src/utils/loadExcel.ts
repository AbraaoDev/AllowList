import xlsx from "xlsx";
import path from "path";

export interface ProcessRecord {
  "Tipo de Processo": string;
  "Número de Processo": string;
  "Data do protocolo": string;
  "ID do requerente do processo": string;
  "Nome do requerente": string;
  "CPF do requerente": string;
  "Vezes que o processo voltou a caixa do requerente"?: string;
}

const workbook = xlsx.readFile(path.join(__dirname, "../../endpoint.xlsx"));
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const rawData: ProcessRecord[] = xlsx.utils.sheet_to_json(sheet, { raw: true });

export interface AggregatedRecord {
  "CPF do requerente": string;
  "Nome do requerente": string;
  "Media de vezes que o processo voltou a caixa do requerente": number;
  "Quantidade de processos": number;
}

export const aggregatedData: AggregatedRecord[] = [];

const cpfMap: {
  [cpf: string]: {
    somaVezes: number;
    nome: string;
    quantidadeProcessos: number;
  };
} = {};

rawData.forEach((record) => {
  const cpf = record["CPF do requerente"];
  if (!cpf) return;

  if (!cpfMap[cpf]) {
    cpfMap[cpf] = {
      somaVezes: 0,
      nome: record["Nome do requerente"],
      quantidadeProcessos: 0,
    };
  }

  const vezesVoltouStr =
    record["Vezes que o processo voltou a caixa do requerente"];
  const vezesVoltou = parseFloat(vezesVoltouStr as string) || 0;

  // Verificar se o valor é numérico
  if (!isNaN(vezesVoltou)) {
    cpfMap[cpf].somaVezes += vezesVoltou;
  } else {
    console.log(
      `Valor inválido encontrado em "Vezes que voltou" para CPF ${cpf}: ${vezesVoltouStr}`
    );
  }

  cpfMap[cpf].quantidadeProcessos += 1;
});

for (const cpf in cpfMap) {
  const { somaVezes, nome, quantidadeProcessos } = cpfMap[cpf];

  const mediaVezesVoltou = (somaVezes / quantidadeProcessos).toFixed(2);

  aggregatedData.push({
    "CPF do requerente": cpf,
    "Nome do requerente": nome,
    "Media de vezes que o processo voltou a caixa do requerente":
      parseFloat(mediaVezesVoltou),
    "Quantidade de processos": quantidadeProcessos,
  });
}
