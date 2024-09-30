import { Check, CircleX, UserRoundPlus } from "lucide-react";
import { ButtonConfirm } from "../../../components/button-confirm";

interface ConfirmAllowApplicantProps {
  name: string;
  acceptAt: boolean;
}

export function ConfirmAllowApplicant({
  name,
  acceptAt,
}: ConfirmAllowApplicantProps) {
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 max-[530px]:h-32 max-[530px]:p-4 max-[530px]:flex-col max-[530px]:items-stretch">
      <button
        type="button"
        className="flex items-center gap-2 flex-1 text-left"
      >
        <UserRoundPlus className="text-zinc-400 size-5" />

        <span className="text-zinc-100 text-lg flex-1">{name}</span>
      </button>

      {acceptAt ? (
        <ButtonConfirm variant="primary">
          Este usuário está no raio de aceitação
          <Check className="size-5" />
        </ButtonConfirm>
      ) : (
        <ButtonConfirm variant="secondary">
          Este usuário não está no raio de aceitação
          <CircleX className="size-5" />
        </ButtonConfirm>
      )}
    </div>
  );
}
