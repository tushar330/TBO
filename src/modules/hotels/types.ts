export interface Hotel {
    id: string;
    name: string;
    location: string;
    image: string;
    price: number;
    stars: number;
    rating: number;
    description: string;
    amenities: string[];
    type: string;
    discount?: number;
    occupancy: number; // Added for filtering
}

export interface RoomType {
    id: number;
    name: string;
    capacity: number;
    price: number;
    description?: string;
    inventory: number;
}

export interface RoomsInventory {
    hotel_id: string;
    room_types: RoomType[];
}

export interface Banquet {
    id: string;
    name: string;
    capacity: number;
    facilities: string[];
    pricePerSlot: number;
}

export interface Catering {
    id: string;
    name: string;
    description: string;
    menuHighlights: string[];
    pricePerPerson: number;
}

export interface HotelDataWrapper<T> {
    data: T[];
}
