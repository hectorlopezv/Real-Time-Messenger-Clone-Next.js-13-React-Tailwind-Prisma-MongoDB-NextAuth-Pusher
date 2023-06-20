import getCurrentUser from "@/app/actions/getCurentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
interface IParams {
  conversationId?: string;
}
export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;
    if (!currentUser) {
      return new NextResponse("UNAUTHORIZED", { status: 401 });
    }
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("BAD_REQUEST", { status: 400 });
    }
    //find existring conversation to update
    const converstation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });
    if (!converstation) {
      return new NextResponse("INVALID ID", { status: 404 });
    }
    //FIND last message
    const lastMessage =
      converstation.messages[converstation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(converstation);
    }
    const updateMessage = await prisma.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });
    return NextResponse.json(updateMessage);
  } catch (error) {
    console.log("error", "ERROR_MESSAGES_SEEN");
    return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
  }
}
