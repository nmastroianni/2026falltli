import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HomeIcon, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : "",
  ),
  title: "2026 Fall Teaching and Learning Institute Survey Results",
  description:
    "This is the feedback we received from our 2026 Fall Teaching and Learning Institute.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 lg:p-6 shadow-sm shadow-purple-400/50 mb-4 lg:mb-8 sticky top-0 z-50 backdrop-blur-lg bg-neutral-950/65 flex justify-between items-center">
          <Link href="/" className="flex-1">
            <HomeIcon className="size-4 lg:size-6" />
            <span className="sr-only">Go Home</span>
          </Link>
          <Link href="/" className="flex-1">
            <h1 className="text-xs md:text-lg w-64 lg:text-2xl lg:w-full text-center">
              2026 Fall Teaching &amp; Learning Institute Survey Results
            </h1>
          </Link>
          <div className="flex-1 flex justify-end">
            <Button asChild className="hidden md:inline">
              <Link href="https://forms.office.com/r/EEMnVePsfs" className="">
                <Lightbulb className="size-4 inline mr-2 mb-1" />
                Submit a Proposal
              </Link>
            </Button>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <Button
          asChild
          className="fixed bottom-8 right-8 md:hidden rounded-full w-12 h-12"
        >
          <Link href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=eX75-2KXzEedROnZnhy0bhYla4QZRjpPqhv7lh-qu0pUMllaVjJGM0JCSkIxTzRNVzQ2TlNOWDNSQS4u">
            <Lightbulb className="size-6" />
            <span className="sr-only">Submit a proposal</span>
          </Link>
        </Button>
      </body>
    </html>
  );
}
