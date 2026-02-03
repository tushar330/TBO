'use client';

import { use } from 'react';
import { useState } from 'react';

interface Guest {
  id: string;
  name: string;
  occupancy: number;
}

interface Room {
  id: string;
  hotel: string;
  type: string;
  capacity: number;
  assigned: Guest[];
}

export default function RoomMappingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const [draggedGuest, setDraggedGuest] = useState<Guest | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const unassignedGuests: Guest[] = [
    { id: '1', name: 'Rajesh Kumar', occupancy: 2 },
    { id: '2', name: 'Priya Sharma', occupancy: 1 },
    { id: '3', name: 'Amit Patel', occupancy: 3 },
    { id: '4', name: 'Sneha Reddy', occupancy: 2 },
  ];

  const rooms: Room[] = [
    { id: 'r1', hotel: 'The Grand Palace', type: 'Deluxe Room', capacity: 2, assigned: [] },
    { id: 'r2', hotel: 'The Grand Palace', type: 'Premium Suite', capacity: 3, assigned: [] },
    { id: 'r3', hotel: 'Royal Retreat', type: 'Executive Suite', capacity: 2, assigned: [] },
  ];

  const handleDragStart = (guest: Guest) => {
    setDraggedGuest(guest);
    setWarning(null);
  };

  const handleDrop = (room: Room) => {
    if (draggedGuest) {
      if (draggedGuest.occupancy > room.capacity) {
        setWarning(`⚠️ Exceeds hotel occupancy rules. ${draggedGuest.name} requires ${draggedGuest.occupancy} capacity, but ${room.type} only has ${room.capacity}.`);
      } else {
        setWarning(null);
        // Assignment logic would go here
      }
    }
    setDraggedGuest(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">Room Mapping</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Drag-and-drop assignment with real-time constraint validation
        </p>
      </div>

      {warning && (
        <div className="mx-8 mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error font-medium">{warning}</p>
        </div>
      )}

      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Unassigned Guests */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Unassigned Guests</h2>
              <p className="text-sm text-neutral-600">Drag guests to assign them to rooms</p>
            </div>

            <div className="space-y-3">
              {unassignedGuests.map((guest) => (
                <div
                  key={guest.id}
                  draggable
                  onDragStart={() => handleDragStart(guest)}
                  className="card p-4 cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">{guest.name}</h3>
                      <p className="text-sm text-neutral-600 mt-1">
                        Occupancy: {guest.occupancy} {guest.occupancy === 1 ? 'person' : 'people'}
                      </p>
                    </div>
                    <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Assigned Rooms */}
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Available Rooms</h2>
              <p className="text-sm text-neutral-600">Drop zones with capacity indicators</p>
            </div>

            <div className="space-y-3">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(room)}
                  className="card p-4 border-2 border-dashed border-neutral-300 hover:border-corporate-blue-100 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-neutral-900">{room.type}</h3>
                      <p className="text-sm text-neutral-600">{room.hotel}</p>
                    </div>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs font-medium rounded">
                      Capacity: {room.capacity}
                    </span>
                  </div>

                  {room.assigned.length === 0 ? (
                    <div className="text-center py-4 text-sm text-neutral-400">
                      Drop guest here
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {room.assigned.map((guest) => (
                        <div key={guest.id} className="p-2 bg-success/10 rounded text-sm">
                          {guest.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
