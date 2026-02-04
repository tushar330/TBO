'use client';

import { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import PortalHeader from '@/components/portal/PortalHeader';
import { mockHeadGuests, mockEvents } from '@/lib/mockData';

export default function PortalLayout({
    children,
}: {
    children: ReactNode;
}) {
    const params = useParams();
    const eventId = params.eventId as string;
    const guestId = params.guestId as string;

    const headGuest = mockHeadGuests.find(hg => hg.id === guestId);
    const event = mockEvents.find(e => e.id === eventId);

    if (!headGuest || !event) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 text-xl font-semibold">Invalid portal access</p>
                    <p className="text-gray-600 mt-2">Guest ID: {guestId}, Event ID: {eventId}</p>
                    <p className="text-sm text-gray-500 mt-4">Available guest: hg-123, hg-124</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PortalHeader eventName={event.name} headGuestName={headGuest.name} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}

