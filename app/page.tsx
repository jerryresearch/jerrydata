/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */

import React from "react";
import fs from "fs";
import path from "path";

export default async function Home() {
  const filePath = path.join(process.cwd(), "public", "/static/index.html");
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return (
    <>
      <React.Fragment>
        <link
          href="/static/images/favicon.jpg"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link href="/static/images/webclip.jpg" rel="apple-touch-icon" />
        <link
          href="/static/css/normalize.css"
          rel="stylesheet"
          type="text/css"
        />
        <link href="/static/css/webflow.css" rel="stylesheet" type="text/css" />
        <link
          href="/static/css/jerrydata.webflow.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="/static/images/favicon.png"
          rel="shortcut icon"
          type="image/x-icon"
        />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        ></link>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="font-normal"
        />

        <script
          src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
          type="text/javascript"
        ></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            WebFont.load({google:{families:["Droid Serif:400,400italic,700,700italic","Protest Revolution:regular"]}})
            `,
          }}
        ></script>
        {/* <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            function(o,c){var n = c.documentElement,t = " w-mod-";n.className += t + "js",("ontouchstart" in o ||o.DocumentTouch && c instanceof DocumentTouch) &&(n.className += t + "touch")})(window, document);
          `,
          }}
        ></script> */}

        {/* Move the script tag to the bottom */}
        {/* <script src="/static/js/webflow.js" type="text/javascript"></script> */}
      </React.Fragment>
    </>
  );
}
