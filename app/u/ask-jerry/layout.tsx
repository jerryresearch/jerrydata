import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import ChatsList from "@/components/chat/ChatsList";
import getChats from "@/lib/chats/getChats";

export const metadata: Metadata = {
  title: "Ask Jerry | Jerrydata",
  description: "",
  icons: {
    icon: [
      {
        url: "/static/images/favicon.png",
        href: "/static/images/favicon.png",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const chats: Chat[] = await getChats(userId);

  return (
    <section className="flex w-full h-[calc(100vh-56px)]">
      <ChatsList chats={chats} />
      {children}
    </section>
  );
}
