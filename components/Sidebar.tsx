'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationSections = [
  { name: 'Events', href: '/dashboard', icon: '📅' },
  { name: 'Inventory', href: '/events/1/inventory', icon: '🏨' },
  { name: 'Guests', href: '/events/1/guests', icon: '👥' },
  { name: 'Room Mapping', href: '/events/1/room-mapping', icon: '🗺️' },
  { name: 'Booking Engine', href: '/events/1/booking', icon: '⚙️' },
  { name: 'Post-Booking Intelligence', href: '/post-booking-intelligence', icon: '🧠' },
  { name: 'Analytics', href: '/analytics', icon: '📊' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="bg-gradient-corporate shadow-inner-highlight w-64 h-screen fixed left-0 top-16 overflow-y-auto">
      <nav className="p-4 space-y-1">
        {navigationSections.map((section) => {
          const isActive = pathname === section.href || (pathname?.startsWith(section.href + '/') ?? false);
          
          return (
            <Link
              key={section.name}
              href={section.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-white transition-colors
                ${isActive 
                  ? 'bg-white/20 border-l-4 border-white' 
                  : 'hover:bg-white/10'
                }
              `}
            >
              <span className="text-xl">{section.icon}</span>
              <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {section.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
