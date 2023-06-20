import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import Conversationlist from "./components/Conversationlist";
import getConversations from "../actions/getConversations"; 
import getUsers from "../actions/getUsers";

type Props = {
  children: ReactNode;
};

export default async function ConversationsLayout({ children }: Props) {
  const conversations = await getConversations();
  const users = await getUsers();
  return (
    <SideBar>
      <div className="h-full">
        <Conversationlist
          users={users}
          initialItems={conversations}
          title="messages"
        />
        {children}
      </div>
    </SideBar>
  );
}
