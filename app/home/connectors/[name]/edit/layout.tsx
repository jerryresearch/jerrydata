import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className=" min-h-screen">{children}</section>;
};

export default Layout;
