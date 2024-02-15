import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Jerrydata",
  description: "Sign in to your Jerrydata account.",
  icons: {
    icon: [
      {
        url: "/static/images/favicon.png",
        href: "/static/images/favicon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={`-tracking-[1%]`}>{children}</section>;
}
