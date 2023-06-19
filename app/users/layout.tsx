import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

type Props = {
  children: ReactNode;
};

export default async function UsersLayout({ children }: Props) {
  const users = await getUsers();
  return (
    <SideBar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </SideBar>
  );
}
