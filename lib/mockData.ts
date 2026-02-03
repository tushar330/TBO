import { Event, MetricData } from './types';

export const mockEvents: Event[] = [
    {
        id: '1',
        name: 'Ananya & Rahul Wedding',
        location: 'Jaipur',
        startDate: '2026-02-12',
        endDate: '2026-02-14',
        organizer: 'Ananya Sharma',
        guestCount: 240,
        hotelCount: 5,
        inventoryConsumed: 82,
        status: 'active',
    },
    {
        id: '2',
        name: 'Tech Summit 2026',
        location: 'Bangalore',
        startDate: '2026-03-20',
        endDate: '2026-03-22',
        organizer: 'TechCorp Events',
        guestCount: 450,
        hotelCount: 3,
        inventoryConsumed: 65,
        status: 'upcoming',
    },
    {
        id: '3',
        name: 'Annual Sales Conference',
        location: 'Mumbai',
        startDate: '2026-04-15',
        endDate: '2026-04-17',
        organizer: 'Global Sales Inc',
        guestCount: 180,
        hotelCount: 2,
        inventoryConsumed: 90,
        status: 'active',
    },
];

export const mockMetrics: MetricData[] = [
    { label: 'Active Events', value: 12, change: 8, trend: 'up' },
    { label: 'Total Guests', value: '1,240', change: 15, trend: 'up' },
    { label: 'Rooms Blocked', value: 485, change: -3, trend: 'down' },
    { label: 'Rooms Sold', value: 392, change: 12, trend: 'up' },
    { label: 'Inventory Risk', value: '18%', change: -5, trend: 'down' },
    { label: 'Revenue Locked', value: '₹42.8L', change: 22, trend: 'up' },
];
