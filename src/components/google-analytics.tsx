import { ENV_CLIENT } from "@/config";
import Script from "next/script";
import React from "react";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${ENV_CLIENT.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ENV_CLIENT.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
}
