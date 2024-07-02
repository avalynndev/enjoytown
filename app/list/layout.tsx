import { SiteHeader } from "@/components/navbar/site-header";
import Sidebar from "@/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <Sidebar />
      <div className="sm:pr-64 xl:pr-0 transition-all duration-300">
        {children}
      </div>
    </>
  );
}
