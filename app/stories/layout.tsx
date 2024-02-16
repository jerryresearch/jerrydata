import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: "Stories | Jerrydata",
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

  return (
    <section className={`bg-white`}>
      <Navbar name={name} image={image} />
      <main className="pb-14 md:pb-0 pt-14">{children}</main>
      <MobileNav />
    </section>
  );
}
