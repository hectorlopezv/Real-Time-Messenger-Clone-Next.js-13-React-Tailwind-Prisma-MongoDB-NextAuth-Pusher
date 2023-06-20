import { User } from "@prisma/client";

type Props = { users: User[] };

export default function AvatarGroup({}: Props) {
  return <div>AvatarGroup</div>;
}
