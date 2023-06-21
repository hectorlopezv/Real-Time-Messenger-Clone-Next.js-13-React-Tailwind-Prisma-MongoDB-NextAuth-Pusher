"use client";

import useActiveChannels from "../hooks/useActiveChannels";

type Props = {};

export default function ActiveStatus({}: Props) {
  const x = useActiveChannels();
  return null;
}
