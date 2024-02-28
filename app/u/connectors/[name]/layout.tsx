import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Connectors | Jerrydata`,
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
  metadata.title = `${decodeURIComponent(params.name)} | Jerrydata`;

  return <section className={`bg-white`}>{children}</section>;
}
