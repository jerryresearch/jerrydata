export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/stories",
    "/stories/(.*)",
    "/connectors",
    "/connectors/(.*)",
    "/dashboards",
    "/dashboards/(.*)",
    "/ask-jerry",
    "/ask-jerry/(.*)",
    "/profile",
    "/profile/(.*)",
  ],
};
