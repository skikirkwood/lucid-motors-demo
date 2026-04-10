import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <div className={inter.variable}>
        <Component {...pageProps} />
      </div>
    </ContentfulLivePreviewProvider>
  );
}
