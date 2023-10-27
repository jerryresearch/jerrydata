import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="bg-[#F6F8FA] min-h-screen">{children}</section>;
};

export default Layout;
