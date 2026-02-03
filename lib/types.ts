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
}

export interface Hotel {
    id: string;
    name: string;
    location: string;
    allotment: number;
    consumed: number;
    remaining: number;
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

export interface MetricData {
    label: string;
    value: string | number;
    change?: number;
    trend?: 'up' | 'down' | 'neutral';
}
