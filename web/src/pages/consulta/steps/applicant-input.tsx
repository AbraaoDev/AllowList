import { ArrowRight, Badge } from "lucide-react";
import "react-day-picker/dist/style.css";
import { Button } from "../../../components/button";
import InputMask from "react-input-mask";
import { api } from "../../../lib/axios";
import { useState } from "react";

interface ApplicantData {
  name: string;
  average: number;
  acceptAt: boolean;
}

interface ApplicantInputProps {
  setApplicantData: (data: ApplicantData) => void;
}

export function ApplicantInput({ setApplicantData }: ApplicantInputProps) {
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      const sanitizedCpf = cpf.replace(/\D/g, "");
      const response = await api.post("/consulta", { cpf: sanitizedCpf });
      setApplicantData(response.data);
    } catch {
      console.error("Erro de consulta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 max-sm:h-48 max-sm:p-4 max-sm:flex-col max-sm:items-stretch">
      <div className="flex items-center gap-2 flex-1">
        <Badge className="text-zinc-400 size-5" />
        <InputMask
          mask="999.999.999-99"
          type="text"
          placeholder="Insira o número do CPF do Requerente"
          className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
          alwaysShowMask={false}
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>

      <div className="w-px h-6 bg-zinc-800 max-sm:w-full max-sm:h-px" />

      <Button
        variant={loading ? "secondary" : "primary"}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Consultando..." : "Continuar"}
        {!loading && <ArrowRight className="size-5" />}
      </Button>
    </div>
  );
}
