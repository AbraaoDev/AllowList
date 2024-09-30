import { useState } from "react";
import { ApplicantInput } from "./steps/applicant-input";
import { ConfirmAllowApplicant } from "./steps/confirm-allow-applicant";

interface ApplicantData {
  name: string;
  average: number;
  acceptAt: boolean;
}

export function CreateTripPage() {
  const [applicantData, setApplicantData] = useState<ApplicantData | null>(
    null
  );

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.png" alt="allowlist" width={150} />
          <p className="text-zinc-300 text-lg">
            Verifique algum Requerente, e saiba se está dentro do AllowList.
          </p>
        </div>

        <div className="space-y-4">
          <ApplicantInput setApplicantData={setApplicantData} />

          {applicantData && (
            <ConfirmAllowApplicant
              name={applicantData.name}
              acceptAt={applicantData.acceptAt}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao continuar os dados serão automaticamente salvos na API, e serão
          aceitos os critérios <br />
          de nossos{" "}
          <span className=" cursor-pointer text-zinc-300 underline">
            termos de uso
          </span>{" "}
          e{" "}
          <span className=" cursor-pointer text-zinc-300 underline">
            políticas de privacidade
          </span>
          .
        </p>

        <div className="text-zinc-600 flex items-center justify-center gap-4 pt-8">
          <span>Desenvolvido por</span>
          <img src="abraaodev.svg" alt="Logo AbraãoDEV" width={150} />
        </div>
      </div>
    </div>
  );
}
