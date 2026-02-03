import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';

export default function EventLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <Sidebar />
      <main className="ml-64 mt-16">
        {children}
      </main>
    </>
  );
}
