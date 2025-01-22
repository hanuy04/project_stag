import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <Script src="http://localhost:8097" strategy="lazyOnload" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
