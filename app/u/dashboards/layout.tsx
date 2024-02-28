import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboards | Jerrydata",
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
  return <section className={`bg-white`}>{children}</section>;
}
