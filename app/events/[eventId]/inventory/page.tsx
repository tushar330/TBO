'use client';

import { use } from 'react';
import { useState } from 'react';

interface RoomVariant {
  id: string;
  name: string;
  allotment: number;
  price: number;
  remaining: number;
}

interface RoomType {
  id: string;
  name: string;
  variants: RoomVariant[];
}

export default function InventoryPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    meal: 'all',
    priceRange: 'all',
    bedType: 'all',
  });

  const roomTypes: RoomType[] = [
    {
      id: '1',
      name: 'Deluxe Room',
      variants: [
        { id: '1a', name: 'Room Only', allotment: 50, price: 5500, remaining: 28 },
        { id: '1b', name: 'Breakfast Included', allotment: 40, price: 6200, remaining: 15 },
        { id: '1c', name: 'Half Board', allotment: 30, price: 7500, remaining: 22 },
      ],
    },
    {
      id: '2',
      name: 'Premium Suite',
      variants: [
        { id: '2a', name: 'Room Only', allotment: 25, price: 8500, remaining: 12 },
        { id: '2b', name: 'Breakfast Included', allotment: 20, price: 9200, remaining: 8 },
        { id: '2c', name: 'Full Board', allotment: 15, price: 11500, remaining: 10 },
      ],
    },
    {
      id: '3',
      name: 'Executive Suite',
      variants: [
        { id: '3a', name: 'Room Only', allotment: 15, price: 12000, remaining: 5 },
        { id: '3b', name: 'Breakfast Included', allotment: 10, price: 13000, remaining: 7 },
      ],
    },
  ];

  const toggleRoom = (roomId: string) => {
    setExpandedRoom(expandedRoom === roomId ? null : roomId);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">Hotel Inventory</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Normalized room types with algorithmic organization
        </p>
      </div>

      <div className="px-8 py-8">
        {/* Smart Filters */}
        <div className="card p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Meal Inclusion
              </label>
              <select
                value={filters.meal}
                onChange={(e) => setFilters({ ...filters, meal: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
              >
                <option value="all">All Options</option>
                <option value="room-only">Room Only</option>
                <option value="breakfast">Breakfast Included</option>
                <option value="half-board">Half Board</option>
                <option value="full-board">Full Board</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
              >
                <option value="all">All Prices</option>
                <option value="budget">₹0 - ₹7,000</option>
                <option value="mid">₹7,000 - ₹10,000</option>
                <option value="premium">₹10,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Bed Type
              </label>
              <select
                value={filters.bedType}
                onChange={(e) => setFilters({ ...filters, bedType: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
              >
                <option value="all">All Types</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="twin">Twin</option>
              </select>
            </div>
          </div>
        </div>

        {/* Room Types */}
        <div className="space-y-4">
          {roomTypes.map((roomType) => (
            <div key={roomType.id} className="card overflow-hidden">
              <button
                onClick={() => toggleRoom(roomType.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-corporate-blue-100/10 rounded-lg flex items-center justify-center">
                    <span className="text-corporate-blue-100 text-xl">🏨</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-neutral-900">{roomType.name}</h3>
                    <p className="text-sm text-neutral-600">{roomType.variants.length} variants available</p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-neutral-400 transition-transform ${expandedRoom === roomType.id ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedRoom === roomType.id && (
                <div className="border-t border-neutral-200 bg-neutral-50/50">
                  {roomType.variants.map((variant) => {
                    const availabilityPercent = (variant.remaining / variant.allotment) * 100;
                    const availabilityColor = 
                      availabilityPercent > 50 ? 'text-success' :
                      availabilityPercent > 20 ? 'text-warning' :
                      'text-error';

                    return (
                      <div key={variant.id} className="px-6 py-4 border-b border-neutral-200 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-neutral-900">{variant.name}</h4>
                            <div className="flex items-center gap-4 mt-2 text-sm">
                              <span className="text-neutral-600">
                                Allotment: <span className="font-semibold text-neutral-900">{variant.allotment}</span>
                              </span>
                              <span className={`font-semibold ${availabilityColor}`}>
                                {variant.remaining} remaining
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-neutral-900">₹{variant.price.toLocaleString()}</div>
                            <div className="text-xs text-neutral-500 mt-1">per night</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
