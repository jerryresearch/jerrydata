import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import MobileNav from "@/components/MobileNav";
import ChatsList from "@/components/chat/ChatsList";
import NewChat from "@/components/chat/NewChat";
import getChats from "@/lib/chats/getChats";
import getDatasets from "@/lib/getDatasets";

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
  const name = session?.user?.name;
  const image = session?.user?.image;

  const chats: Chat[] = await getChats(userId);
  const datasets: Dataset[] = await getDatasets(userId);

  return (
    <section className={`bg-white`}>
      <Navbar name={name} image={image} />
      <main className="pb-14 md:pb-0 pt-14">
        <section className="flex w-full h-[calc(100vh-56px)]">
          <ChatsList chats={chats} />
          {children}
        </section>
      </main>
      <MobileNav />
    </section>
  );
}
