'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { HOTELS } from './data';

// --- Components ---

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  return (
    <div className="bg-corporate-blue-600 p-6 rounded-xl shadow-lg mb-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4 relative">
          <label className="block text-xs uppercase font-bold text-blue-200 mb-1">City, Hotel, or Area</label>
          <div className="relative">
             <input
              type="text"
              placeholder="Search by hotel name or location"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/50"
            />
             <svg className="w-5 h-5 absolute left-3 top-3.5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>
        <div className="md:col-span-3">
             <label className="block text-xs uppercase font-bold text-blue-200 mb-1">Check-in</label>
            <input type="date" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20" />
        </div>
         <div className="md:col-span-3">
             <label className="block text-xs uppercase font-bold text-blue-200 mb-1">Check-out</label>
            <input type="date" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:bg-white/20" />
        </div>
        <div className="md:col-span-2 flex items-end">
          <button className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-[1.02]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

const FilterPanel = ({ filters, setFilters }: { filters: any, setFilters: any }) => {
  const amenitiesList = ['WiFi', 'Pool', 'Parking', 'Breakfast', 'AC', 'Spa'];
  const typesList = ['Hotel', 'Resort', 'Guest House'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-24 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-neutral-900 text-lg">Filters</h3>
        <button onClick={() => setFilters({ priceRange: [0, 20000], stars: [], amenities: [], type: [] })} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Clear All</button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-neutral-800 mb-3">Price Range</h4>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })}
          className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-sm text-neutral-600 mt-2">
          <span>₹0</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-8">
        <h4 className="font-semibold text-neutral-800 mb-3">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2].map(star => (
            <label key={star} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.stars.includes(star)}
                onChange={(e) => {
                  const newStars = e.target.checked
                    ? [...filters.stars, star]
                    : filters.stars.filter((s: number) => s !== star);
                  setFilters({ ...filters, stars: newStars });
                }}
                className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
              />
              <div className="flex text-amber-400">
                {[...Array(star)].map((_, i) => <span key={i}>★</span>)}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <h4 className="font-semibold text-neutral-800 mb-3">Property Type</h4>
        <div className="space-y-2">
          {typesList.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={(e) => {
                   const newTypes = e.target.checked
                    ? [...filters.type, type]
                    : filters.type.filter((t: string) => t !== type);
                  setFilters({ ...filters, type: newTypes });
                }}
                className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
              />
              <span className="text-neutral-600 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

       {/* Amenities */}
       <div>
        <h4 className="font-semibold text-neutral-800 mb-3">Amenities</h4>
        <div className="space-y-2">
          {amenitiesList.map(item => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                 checked={filters.amenities.includes(item)}
                 onChange={(e) => {
                   const newAmenities = e.target.checked
                    ? [...filters.amenities, item]
                    : filters.amenities.filter((a: string) => a !== item);
                  setFilters({ ...filters, amenities: newAmenities });
                }}
                className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
              />
              <span className="text-neutral-600 text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Page Component ---

export default function HotelListingPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    stars: [] as number[],
    amenities: [] as string[],
    type: [] as string[]
  });
  const [sortOption, setSortOption] = useState<'price_low' | 'price_high' | 'rating' | 'popularity'>('popularity');

  // Filter & Sort Logic
  const filteredHotels = useMemo(() => {
    return HOTELS.filter(hotel => {
      // Search
      const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Price
      if (hotel.price < filters.priceRange[0] || hotel.price > filters.priceRange[1]) return false;

      // Stars
      if (filters.stars.length > 0 && !filters.stars.includes(hotel.stars)) return false;

      // Type
      if (filters.type.length > 0 && !filters.type.includes(hotel.type)) return false;

      // Amenities (Check if hotel has ALL selected amenities)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every(a => hotel.amenities.includes(a));
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price_low': return a.price - b.price;
        case 'price_high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return b.rating - a.rating; // Popularity fallback
      }
    });
  }, [filters, searchQuery, sortOption]);

  const handleSelectHotel = (hotelId: string) => {
      router.push(`/events/${eventId}/hotels/${hotelId}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Search */}
        <SearchBar onSearch={setSearchQuery} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Filters */}
          <div className="hidden lg:block lg:col-span-1">
             <FilterPanel filters={filters} setFilters={setFilters} />
          </div>

          {/* Right Results */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Sort Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200 flex justify-between items-center">
              <span className="font-semibold text-neutral-900">{filteredHotels.length} Hotels Found</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">Sort by:</span>
                <select 
                  value={sortOption} 
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-transparent font-medium text-neutral-800 focus:outline-none cursor-pointer"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">User Rating</option>
                </select>
              </div>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredHotels.map(hotel => {
                  return (
                    <div 
                        key={hotel.id} 
                        onClick={() => handleSelectHotel(hotel.id)}
                        className="bg-white rounded-xl shadow-sm border border-neutral-200 hover:shadow-md hover:border-blue-300 overflow-hidden flex flex-col md:flex-row transition-all duration-200 cursor-pointer"
                    >
                        {/* Image */}
                        <div className="w-full md:w-64 h-48 md:h-auto relative bg-neutral-200">
                             <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                             {hotel.discount && (
                                 <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                     {hotel.discount}% OFF
                                 </span>
                             )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                         <h3 className="text-xl font-bold text-neutral-900 hover:text-blue-600 transition-colors">{hotel.name}</h3>
                                         <div className="flex text-amber-400 text-sm">
                                            {[...Array(hotel.stars)].map((_, i) => <span key={i}>★</span>)}
                                         </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 flex items-center gap-1 mb-3">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {hotel.location}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {hotel.amenities.slice(0, 4).map(a => (
                                            <span key={a} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">{a}</span>
                                        ))}
                                        {hotel.amenities.length > 4 && <span className="text-xs text-neutral-400">+{hotel.amenities.length - 4} more</span>}
                                    </div>
                                </div>
                                <div className="text-right">
                                     <div className="bg-corporate-blue-600 text-white font-bold p-2.5 rounded-lg inline-block text-lg">
                                         {hotel.rating}
                                     </div>
                                     <p className="text-xs text-neutral-500 mt-1">Excellent</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mt-4 pt-4 border-t border-neutral-100">
                                <div>
                                     <span className="text-xs text-neutral-400 line-through">₹{Math.round(hotel.price * 1.2).toLocaleString()}</span>
                                     <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-neutral-900">₹{hotel.price.toLocaleString()}</span>
                                        <span className="text-xs text-neutral-500">/ night</span>
                                     </div>
                                     <p className="text-xs text-emerald-600 font-medium my-1">Free Cancellation</p>
                                </div>
                                <button className="px-6 py-2.5 rounded-lg font-semibold transition-colors bg-white border-2 border-corporate-blue-600 text-corporate-blue-600 hover:bg-corporate-blue-50">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                  );
              })}
              
              {filteredHotels.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-xl border border-neutral-200">
                      <h3 className="text-lg font-bold text-neutral-900">No hotels found</h3>
                      <p className="text-neutral-500">Try adjusting your filters or search query.</p>
                      <button onClick={() => { setFilters({ priceRange: [0, 20000], stars: [], amenities: [], type: [] }); setSearchQuery(''); }} className="mt-4 text-blue-600 font-medium hover:underline">Clear Filters</button>
                  </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
