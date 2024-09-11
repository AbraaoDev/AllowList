import { Router } from "express";
import { consultaProcessoPorCPF } from "../controllers/processController";
import { exportToExcel } from "../utils/exportToExcel";
import { aggregatedData } from "../utils/loadExcel";
import path from "path";

const router = Router();

router.post("/consulta", consultaProcessoPorCPF);

router.get("/exportar", (req, res) => {
  const filePath = path.join(__dirname, "../../dados-processos.xlsx");

  exportToExcel(aggregatedData, filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Erro ao gerar o arquivo.");
    }
  });
});

export default router;
