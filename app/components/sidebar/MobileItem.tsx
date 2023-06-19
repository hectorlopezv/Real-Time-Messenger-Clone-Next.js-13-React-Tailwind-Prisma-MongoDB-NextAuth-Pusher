"use client";

import Link from "next/link";
import clsx from "clsx";
import { IconType } from "react-icons/lib";

type Props = {
  href: string;
  label: string;
  icon: IconType;
  active?: boolean;
  onClick?: () => void;
};

export default function MobileItem({
  href,
  icon: Icon,
  label,
  active,
  onClick,
}: Props) {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500
    hover:text-black
    hover:bg-gray-100
    `,
        active && "text-black bg-gray-100"
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
}
