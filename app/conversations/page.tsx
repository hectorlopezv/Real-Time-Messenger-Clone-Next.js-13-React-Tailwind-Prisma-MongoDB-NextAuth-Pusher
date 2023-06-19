"use client";

import clsx from "clsx";
import useConverstation from "../hooks/useConversation";
import EmptyState from "../components/EmptyState";

type Props = {};

export default function Home({}: Props) {
  const { isOpen } = useConverstation();
  return (
    <div
      className={clsx(`lg:pl-80 h-full lg:block`, isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
