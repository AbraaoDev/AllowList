import { Request, Response } from "express";
import { AggregatedRecord, aggregatedData } from "../utils/loadExcel";

export function consultaProcessoPorCPF(req: Request, res: Response) {
  const { cpf } = req.body;

  if (!cpf) {
    return res.status(400).send("Por favor, forneça um CPF para a consulta.");
  }

  const requerente = aggregatedData.find(
    (item: AggregatedRecord) => item["CPF do requerente"].trim() === cpf.trim()
  );

  if (requerente) {
    const mediaVezesVoltou =
      requerente["Media de vezes que o processo voltou a caixa do requerente"];

    if (mediaVezesVoltou === undefined || mediaVezesVoltou === null) {
      return res.status(500).send("Erro ao acessar dados do processo.");
    }

    const limiteAceitacao = 1.33;

    if (mediaVezesVoltou <= limiteAceitacao) {
      res.send(
        `${requerente["Nome do requerente"]}. Este usuário está no raio de aceitação! Média de vezes que voltou: ${mediaVezesVoltou}.`
      );
    } else {
      res.send(
        `${requerente["Nome do requerente"]} não está no raio de aceitação. Média de vezes que voltou: ${mediaVezesVoltou}.`
      );
    }
  } else {
    res.status(404).send("CPF não encontrado.");
  }
}
