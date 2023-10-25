import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <section className="bg-[#F6F8FA]">{children}</section>;
};

export default Layout;
