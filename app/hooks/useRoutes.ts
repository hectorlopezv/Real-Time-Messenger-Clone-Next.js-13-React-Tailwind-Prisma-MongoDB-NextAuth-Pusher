import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat, HiUsers } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConverstation from "./useConversation";
const useRoutes = () => {
  const pathName = usePathname();
  const { converstationId } = useConverstation();
  const routes = useMemo(
    () => [
      {
        label: "Chat",
        href: "/converstations",
        icon: HiChat,
        active: pathName === "/converstations" || !!converstationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUsers,
        active: pathName === "/users",
      },
      {
        label: "Logout",
        href: "#",
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathName, converstationId]
  );

  return routes;
};

export default useRoutes;
