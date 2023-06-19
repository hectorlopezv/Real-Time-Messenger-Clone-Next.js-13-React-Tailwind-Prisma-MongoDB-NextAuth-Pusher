import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";

type Props = {
  children: ReactNode;
};

export default async function UsersLayout({ children }: Props) {
  return (
    <SideBar>
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
