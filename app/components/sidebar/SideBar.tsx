import { ReactNode } from "react";
import DeskTopSideBar from "./DeskTopSideBar";
import MobileFooter from "./MobileFooter";
import getCurrentUser from "@/app/actions/getCurentUser";
type Props = {
  children: ReactNode;
};

export default async function SideBar({ children }: Props) {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DeskTopSideBar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
      <MobileFooter currentUser={currentUser!} />
    </div>
  );
}
