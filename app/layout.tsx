import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

import { Analytics } from "@vercel/analytics/react";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
            <footer className="bg-black text-white py-8">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex items-center space-x-4">
                    <a href="/" className="text-2xl font-bold hover:text-yellow-300 transition-colors duration-300">
                      EnjoyTown
                    </a>
                    <div className="flex space-x-4">
                      <a
                        href="https://github.com/avalynndev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4a3.1 3.1 0 00-1.3-1.8c-1-.7 0-.7 0-.7 1.2.1 1.9 1.2 1.9 1.2 1 1.7 2.6 1.2 3.3.9a2.6 2.6 0 01.8-1.6c-2.7-.3-5.5-1.3-5.5-5.9a4.7 4.7 0 011.3-3.3 4.4 4.4 0 01.1-3.2s1-.3 3.3 1.3a11 11 0 016 0c2.3-1.6 3.3-1.3 3.3-1.3a4.4 4.4 0 01.1 3.2 4.7 4.7 0 011.3 3.3c0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0012 0z" clip-rule="evenodd"/>
                        </svg>
                      </a>
                      <a
                        href="/support"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        Ko-fi
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <a href="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                      About
                    </a>
                    <a href="/contact" className="text-gray-300 hover:text-white transition-colors duration-300">
                      Contact
                    </a>
                    <a href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                      Terms
                    </a>
                    <a href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                      Privacy
                    </a>
                  </div>
                </div>
                <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                  <p className="text-sm">© 2024 EnjoyTown. All rights reserved.</p>
                  <p className="text-sm">Made with ❤️ by the EnjoyTown Team.</p>
                </div>
              </div>
            </footer>
          </div>
          <Analytics />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
