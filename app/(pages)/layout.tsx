'use client';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/site-header';
import { MobileNavBar } from '@/components/mobile-nav';
import { useIsMobile } from '@/hooks/use-mobile';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = useIsMobile();
  return (
    <div suppressHydrationWarning>
      {isMobile ? <></> : <SiteHeader />}
      <div className={`${isMobile ? 'pb-24' : ''}`}>{children}</div>
      {isMobile ? <></> : <Footer />}
      <MobileNavBar />
    </div>
  );
}
