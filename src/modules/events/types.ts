/**
 * Event-related types
 * Migrated from lib/types.ts
 */

export interface Event {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    organizer: string;
    guestCount: number;
    hotelCount: number;
    inventoryConsumed: number;
    status: 'active' | 'upcoming' | 'completed';
    headGuestId?: string;
}

export interface HeadGuest {
    id: string;
    name: string;
    email: string;
    phone: string;
    eventId: string;
    subGroupName: string;
}

export interface SubGuest {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    age?: number;
    guestCount?: number;
    headGuestId: string;
    roomGroupId?: string;
    familyId?: string;
}

export interface Guest {
    id: string;
    name: string;
    email: string;
    checkIn: string;
    checkOut: string;
    guestCount: number;
    foodPreference: string;
    allergies?: string;
    assigned: boolean;
}
