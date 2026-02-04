"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import LogoutButton from "@/components/auth/LogoutButton";

interface PortalHeaderProps {
  eventName: string;
  headGuestName: string;
}

export default function PortalHeader({
  eventName,
  headGuestName,
}: PortalHeaderProps) {
  const params = useParams();
  const eventId = params.eventId as string;
  const guestId = params.guestId as string;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            {/* Logo and Branding */}
            <Link
              href={`/events/${eventId}/portal/${guestId}`}
              className="flex items-center gap-3"
            >
              <img
                src="/images/logo.jpg"
                alt="TBO Logo"
                className="h-10 w-10 object-contain rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900">
                TBO MICE Connect
              </span>
            </Link>
            <span className="text-sm text-gray-400">|</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">
                {eventName}
              </span>
              <span className="text-xs text-gray-600">
                Welcome, {headGuestName}
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <Link
              href={`/events/${eventId}/portal/${guestId}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href={`/events/${eventId}/portal/${guestId}/rooms`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Room Mapping
            </Link>
            <Link
              href={`/events/${eventId}/portal/${guestId}/venue`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Venues
            </Link>
            <Link
              href={`/events/${eventId}/portal/${guestId}/guests`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Guests
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
