'use client';

import { use, useEffect, useState } from 'react';
import { HOTELS, RoomType } from '../hotels/data';

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

  // State for guests and rooms
  const [unassignedGuests, setUnassignedGuests] = useState<Guest[]>([
    { id: '1', name: 'Rajesh Kumar', occupancy: 2 },
    { id: '2', name: 'Priya Sharma', occupancy: 1 },
    { id: '3', name: 'Amit Patel', occupancy: 3 },
    { id: '4', name: 'Sneha Reddy', occupancy: 2 },
  ]);

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
      const savedMapping = localStorage.getItem(`mapping_${eventId}`);
      
      if (savedMapping) {
          const { hotelId, selectedRooms } = JSON.parse(savedMapping);
          const hotel = HOTELS.find(h => h.id === hotelId);

          if (hotel && selectedRooms) {
              const generatedRooms: Room[] = [];
              
              // Iterate over purchased room types
              Object.entries(selectedRooms).forEach(([roomId, count]) => {
                  const qty = count as number;
                  if (qty > 0) {
                      // Find details for this room ID
                      let roomDetails: RoomType | undefined;
                      Object.values(hotel.rooms).forEach((category: any) => {
                          const found = category.find((r: RoomType) => r.id === Number(roomId));
                          if (found) roomDetails = found;
                      });

                      if (roomDetails) {
                          // Generate N instances
                          for (let i = 0; i < qty; i++) {
                              generatedRooms.push({
                                  id: `${roomDetails.id}-${i}`, // Unique ID for this instance
                                  hotel: hotel.name,
                                  type: roomDetails.name,
                                  capacity: roomDetails.capacity,
                                  assigned: []
                              });
                          }
                      }
                  }
              });
              setRooms(generatedRooms);
          }
      } else {
          // Fallback / Demo Data if nothing saved
          setRooms([
            { id: 'r1', hotel: 'The Grand Palace', type: 'Deluxe Room', capacity: 2, assigned: [] },
            { id: 'r2', hotel: 'The Grand Palace', type: 'Premium Suite', capacity: 3, assigned: [] },
          ]);
      }
  }, [eventId]);

  const [draggedGuest, setDraggedGuest] = useState<{ guest: Guest, source: 'unassigned' | string } | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const handleDragStart = (guest: Guest, source: 'unassigned' | string) => {
    setDraggedGuest({ guest, source });
    setWarning(null);
  };

  const handleDropToRoom = (targetRoomId: string) => {
    if (!draggedGuest) return;

    const { guest, source } = draggedGuest;
    const targetRoomIndex = rooms.findIndex(r => r.id === targetRoomId);
    const targetRoom = rooms[targetRoomIndex];

    // Calculate current occupancy of the target room
    const currentOccupancy = targetRoom.assigned.reduce((sum, g) => sum + g.occupancy, 0);

    // Check capacity constraints
    if (currentOccupancy + guest.occupancy > targetRoom.capacity) {
      setWarning(`⚠️ Cannot assign ${guest.name} to ${targetRoom.type}. Room capacity (${targetRoom.capacity}) would be exceeded.`);
      setDraggedGuest(null);
      return;
    }

    // Prepare new state updates
    const newRooms = [...rooms];
    
    // Remove from source if it was in another room
    if (source !== 'unassigned') {
      const sourceRoomIndex = newRooms.findIndex(r => r.id === source);
      if (sourceRoomIndex !== -1) {
        newRooms[sourceRoomIndex] = {
          ...newRooms[sourceRoomIndex],
          assigned: newRooms[sourceRoomIndex].assigned.filter(g => g.id !== guest.id)
        };
      }
    } else {
      // Remove from unassigned list
      setUnassignedGuests(prev => prev.filter(g => g.id !== guest.id));
    }

    // Add to target room
    newRooms[targetRoomIndex] = {
      ...targetRoom,
      assigned: [...targetRoom.assigned, guest]
    };

    setRooms(newRooms);
    setDraggedGuest(null);
    setWarning(null);
  };

  const handleDropToUnassigned = () => {
    if (!draggedGuest) return;
    
    const { guest, source } = draggedGuest;
    
    // If already unassigned, do nothing
    if (source === 'unassigned') {
      setDraggedGuest(null);
      return;
    }

    // Remove from source room
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === source) {
        return {
          ...room,
          assigned: room.assigned.filter(g => g.id !== guest.id)
        };
      }
      return room;
    }));

    // Add back to unassigned
    setUnassignedGuests(prev => [...prev, guest]);
    setDraggedGuest(null);
    setWarning(null);
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
        <div className="mx-8 mt-6 p-4 bg-error/10 border border-error/20 rounded-lg flex justify-between items-center">
          <p className="text-sm text-error font-medium">{warning}</p>
          <button onClick={() => setWarning(null)} className="text-error hover:text-error/80">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      <div className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT: Unassigned Guests */}
          <div 
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={handleDropToUnassigned}
            className={`transition-colors rounded-lg p-2 -m-2 ${draggedGuest?.source !== 'unassigned' && draggedGuest ? 'bg-neutral-100/50 border-2 border-dashed border-neutral-200' : ''}`}
          >
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-neutral-900">Unassigned Guests</h2>
              <p className="text-sm text-neutral-600">Drag guests to assign them to rooms</p>
            </div>

            <div className="space-y-3 min-h-[100px]">
              {unassignedGuests.length === 0 && (
                 <p className="text-sm text-neutral-400 italic text-center py-8">All guests assigned</p>
              )}
              {unassignedGuests.map((guest) => (
                <div
                  key={guest.id}
                  draggable
                  onDragStart={() => handleDragStart(guest, 'unassigned')}
                  className="card p-4 cursor-move hover:shadow-md transition-shadow bg-white"
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
              {rooms.map((room) => {
                const currentOccupancy = room.assigned.reduce((sum, g) => sum + g.occupancy, 0);
                const isFull = currentOccupancy >= room.capacity;
                const availableSpace = room.capacity - currentOccupancy;
                
                return (
                  <div
                    key={room.id}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                    }}
                    onDrop={() => handleDropToRoom(room.id)}
                    className={`card p-4 border-2 border-dashed transition-colors ${
                      isFull 
                        ? 'border-neutral-200 bg-neutral-50' 
                        : 'border-neutral-300 hover:border-corporate-blue-300 hover:bg-corporate-blue-50/10'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-neutral-900">{room.type}</h3>
                        <p className="text-sm text-neutral-600">{room.hotel}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          isFull 
                            ? 'bg-error/10 text-error' 
                            : currentOccupancy > 0 
                              ? 'bg-warning/10 text-warning-700' 
                              : 'bg-success/10 text-success'
                        }`}>
                          {currentOccupancy}/{room.capacity} Capacity
                        </span>
                      </div>
                    </div>

                    {room.assigned.length === 0 ? (
                      <div className="text-center py-4 text-sm text-neutral-400">
                        Drop guest here
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {room.assigned.map((guest) => (
                          <div 
                            key={guest.id} 
                            draggable
                            onDragStart={(e) => {
                              // e.stopPropagation(); // Optional: prevent bubbling if needed
                              handleDragStart(guest, room.id);
                            }}
                            className="p-3 bg-white border border-neutral-200 rounded shadow-sm cursor-move hover:border-neutral-300 flex justify-between items-center group"
                          >
                            <div>
                                <span className="text-sm font-medium text-neutral-900">{guest.name}</span>
                                <span className="text-xs text-neutral-500 ml-2">({guest.occupancy})</span>
                            </div>
                            <svg className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
