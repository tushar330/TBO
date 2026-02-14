import { Hotel, HotelDataWrapper, Banquet, Catering, RoomType } from '../types';

export const hotelApi = {
    /**
     * Fetch hotels for a specific city
     */
    async getHotelsByCity(cityId: string, token?: string): Promise<Hotel[]> {
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`/api/hotels?city_id=${cityId}`, { headers });
        if (!response.ok) throw new Error('Failed to fetch hotels');
        const result = await response.json();

        // Map backend PascalCase to camelCase
        const hotelsList = result.data || [];
        return hotelsList.map((h: any) => ({
            id: h.ID || h.id,
            name: h.Name || h.name,
            location: h.Address || h.location,
            amenities: h.Facilities || h.amenities || [],
            stars: h.StarRating || h.stars || 0,
            image: (h.ImageUrls && h.ImageUrls[0]) || h.image || '',
            occupancy: h.Occupancy || h.occupancy || 0,
            // Fallbacks for missing fields in basic list
            price: h.Price || h.price || 0,
            rating: h.Rating || h.rating || 4.5,
            description: h.Description || h.description || '',
            type: h.Type || h.type || 'Hotel'
        }));
    },

    /**
     * Fetch rooms for a specific hotel
     */
    async getRooms(hotelCode: string, token?: string): Promise<RoomType[]> {
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`/api/hotels/${hotelCode}/rooms`, { headers });
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const result = await response.json();

        const roomsList = result.data || result || [];
        return (Array.isArray(roomsList) ? roomsList : []).map((r: any) => ({
            id: r.ID || r.id,
            name: r.Name || r.name,
            price: r.Price || r.price || 0,
            capacity: r.Capacity || r.capacity || 0,
            inventory: r.Inventory || r.inventory || 0,
            description: r.Description || r.description || ''
        }));
    },

    /**
     * Fetch banquets for a specific hotel
     */
    async getBanquets(hotelCode: string, token?: string): Promise<Banquet[]> {
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`/api/hotels/${hotelCode}/banquets`, { headers });
        if (!response.ok) throw new Error('Failed to fetch banquets');
        const result = await response.json();

        const banquetsList = result.data || result || [];
        return (Array.isArray(banquetsList) ? banquetsList : []).map((b: any) => ({
            id: b.ID || b.id,
            name: b.Name || b.name,
            capacity: b.Capacity || b.capacity || 0,
            pricePerSlot: b.PricePerSlot || b.pricePerSlot || 0,
            facilities: b.Facilities || b.facilities || []
        }));
    },

    /**
     * Fetch catering options for a specific hotel
     */
    async getCatering(hotelCode: string, token?: string): Promise<Catering[]> {
        const headers: HeadersInit = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`/api/hotels/${hotelCode}/catering`, { headers });
        if (!response.ok) throw new Error('Failed to fetch catering');
        const result = await response.json();

        const cateringList = result.data || result || [];
        return (Array.isArray(cateringList) ? cateringList : []).map((c: any) => ({
            id: c.ID || c.id,
            name: c.Name || c.name,
            description: c.Description || c.description || '',
            pricePerPerson: c.PricePerPerson || c.pricePerPerson || 0,
            menuHighlights: c.MenuHighlights || c.menuHighlights || []
        }));
    }
};
