import React from "react";

type Props = {
  params: {
    conversationId: string;
  };
};

export default function Conversation({ params: { conversationId } }: Props) {
  return <div>Conversation</div>;
}
