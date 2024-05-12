import { SiteHeader } from "@/components/anime/anime-nav";
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <NextUIProvider>
        <div className="flex-1">{children}</div>
      </NextUIProvider>
    </div>
  );
}
