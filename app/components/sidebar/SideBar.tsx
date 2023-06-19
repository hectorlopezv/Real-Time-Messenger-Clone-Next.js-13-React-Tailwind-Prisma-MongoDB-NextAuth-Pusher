import { ReactNode } from "react";
import DeskTopSideBar from "./DeskTopSideBar";
import MobileFooter from "./MobileFooter";

type Props = {
  children: ReactNode;
};

export default function SideBar({ children }: Props) {
  return (
    <div className="h-full">
      <DeskTopSideBar />
      <main className="lg:pl-20 h-full">{children}</main>
      <MobileFooter />
    </div>
  );
}
