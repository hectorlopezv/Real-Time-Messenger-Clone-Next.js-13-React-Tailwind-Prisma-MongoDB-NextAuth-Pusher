"use client";
import useConverstation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";

type Props = {};

export default function MobileFooter({}: Props) {
  const routes = useRoutes();
  const { isOpen } = useConverstation();

  if (isOpen) {
    return null;
  }
  return (
    <div
      className="flex justify-between w-full bottom-0 z-40 flex items-center bg-white
    border-t-[1px] lg:hidden"
    >
      {routes.map((item) => (
        <MobileItem
          key={item.label}
          href={item.href}
          label={item.label}
          icon={item.icon}
          active={item.active}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
