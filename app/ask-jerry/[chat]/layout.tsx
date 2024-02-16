import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Ask Jerry | Jerrydata`,
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
  params,
  children,
}: {
  params: { name: string };
  children: React.ReactNode;
}) {
  //   @ts-ignore
  metadata.title = `${decodeURIComponent(params.chat)} | Jerrydata`;

  return <section className="flex-[1_0_0]">{children}</section>;
}
