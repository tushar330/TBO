"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar";

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isGuestsPage = pathname?.includes("/guests");

  if (isGuestsPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation />
      <Sidebar />
      <main className="ml-64 mt-16">{children}</main>
    </>
  );
}
