import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const ButtonVariants = tv({
  base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2",

  variants: {
    variant: {
      primary: "bg-green-400 text-green-950",
      secondary: "bg-red-400 text-red-950",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof ButtonVariants> {
  children: ReactNode;
}

export function ButtonConfirm({
  children,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button {...props} className={ButtonVariants({ variant, size })}>
      {children}
    </button>
  );
}
