import { ReactNode } from "react";
import SideBar from "../components/sidebar/SideBar";
import Conversationlist from "./components/Conversationlist";
import getConversations from "../actions/getConversations";
import { FullConversationType } from "@/types";

type Props = {
  children: ReactNode;
};

export default async function conversationsLayout({ children }: Props) {
  const conversations = await getConversations();
  return (
    <SideBar>
      <div className="h-full">
        <Conversationlist initialItems={conversations} />
        {children}
      </div>
    </SideBar>
  );
}
