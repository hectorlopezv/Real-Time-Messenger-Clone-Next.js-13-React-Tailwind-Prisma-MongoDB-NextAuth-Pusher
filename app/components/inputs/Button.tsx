"use client";
import { ReactNode } from "react";
import clsx from "clsx";
type Props = {
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  danger?: boolean;
  fullWidth?: boolean;
};

export default function Button({
  children,
  danger,
  disabled,
  fullWidth,
  onClick,
  secondary,
  type,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
    
    flex justify-center rounded-md px-3 py-2 text-sm font-semibold
    focus:visible:outline focus-visible:outline-2
    focus-visible:outline-offset-2
    `,
        disabled && "opacity-50 cursor-not-allowed",
        fullWidth && "w-full",
        secondary ? "text-gray-900" : "text-white",
        danger && "bg-rose-500 hover:bg-rose-600 focus-visible:ring-rose-500",

        !secondary &&
          !danger &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {children}
    </button>
  );
}
