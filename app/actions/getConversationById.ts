import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurentUser";

export default async function getConversationById(id: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) {
      return null;
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return conversation;
  } catch (error) {
    return undefined;
  }
}
