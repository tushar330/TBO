'use client';

import { useState } from 'react';
import { RoomAllocation, RoomGroup, SubGuest } from '@/lib/types';

interface RoomBucketListProps {
    allocations: RoomAllocation[];
    groups: RoomGroup[];
    guests: SubGuest[];
    onUpdateGroups: (groups: RoomGroup[]) => void;
}

export default function RoomBucketList({ allocations, groups, guests, onUpdateGroups }: RoomBucketListProps) {
    const [draggedGuest, setDraggedGuest] = useState<SubGuest | null>(null);

    const unassignedGuests = guests.filter(g => !g.roomGroupId);

    const getGuestsInGroup = (groupId: string) => {
        const group = groups.find(g => g.id === groupId);
        if (!group) return [];
        return guests.filter(g => group.guestIds.includes(g.id));
    };

    const getGroupForAllocation = (allocationId: string) => {
        return groups.find(g => g.allocationId === allocationId);
    };

    const handleDragStart = (guest: SubGuest) => {
        setDraggedGuest(guest);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (allocationId: string) => {
        if (!draggedGuest) return;

        const allocation = allocations.find(a => a.id === allocationId);
        if (!allocation) return;

        let existingGroup = getGroupForAllocation(allocationId);

        // Check capacity
        const currentOccupancy = existingGroup ? existingGroup.guestIds.length : 0;
        if (currentOccupancy >= allocation.maxCapacity) {
            alert(`This room is full! Maximum capacity: ${allocation.maxCapacity}`);
            setDraggedGuest(null);
            return;
        }

        const updatedGroups = [...groups];

        // Remove from old group if exists
        if (draggedGuest.roomGroupId) {
            const oldGroup = updatedGroups.find(g => g.id === draggedGuest.roomGroupId);
            if (oldGroup) {
                oldGroup.guestIds = oldGroup.guestIds.filter(id => id !== draggedGuest.id);
            }
        }

        // Add to new group or create new group
        if (existingGroup) {
            existingGroup.guestIds.push(draggedGuest.id);
        } else {
            const newGroup: RoomGroup = {
                id: `rg-${Date.now()}`,
                allocationId,
                guestIds: [draggedGuest.id],
            };
            updatedGroups.push(newGroup);
        }

        onUpdateGroups(updatedGroups);
        setDraggedGuest(null);
    };

    const handleRemoveFromRoom = (guestId: string, groupId: string) => {
        const updatedGroups = groups.map(g => {
            if (g.id === groupId) {
                return {
                    ...g,
                    guestIds: g.guestIds.filter(id => id !== guestId),
                };
            }
            return g;
        });
        onUpdateGroups(updatedGroups);
    };

    return (
        <div className="space-y-6">
            {/* Unassigned Guests */}
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Unassigned Guests ({unassignedGuests.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {unassignedGuests.map(guest => (
                        <div
                            key={guest.id}
                            draggable
                            onDragStart={() => handleDragStart(guest)}
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                        >
                            <p className="font-medium text-gray-900">{guest.name}</p>
                            {guest.email && <p className="text-xs text-gray-500 mt-1">{guest.email}</p>}
                        </div>
                    ))}
                    {unassignedGuests.length === 0 && (
                        <p className="text-sm text-gray-500 col-span-full">All guests have been assigned to rooms!</p>
                    )}
                </div>
            </div>

            {/* Room Allocations */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Room Allocations</h3>
                {allocations.map(allocation => {
                    const group = getGroupForAllocation(allocation.id);
                    const guestsInRoom = group ? getGuestsInGroup(group.id) : [];
                    const occupancy = guestsInRoom.length;

                    return (
                        <div
                            key={allocation.id}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(allocation.id)}
                            className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200 hover:border-blue-400 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900">
                                        {group?.customLabel || `${allocation.roomType} ${allocation.id.split('-')[1]}`}
                                    </h4>
                                    <p className="text-sm text-gray-600">{allocation.hotelName}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-sm font-medium ${occupancy >= allocation.maxCapacity ? 'text-red-600' : 'text-green-600'}`}>
                                        {occupancy}/{allocation.maxCapacity} occupied
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {guestsInRoom.map(guest => (
                                    <div
                                        key={guest.id}
                                        className="flex justify-between items-center bg-blue-50 p-3 rounded-lg"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-900">{guest.name}</p>
                                            {guest.email && <p className="text-xs text-gray-500">{guest.email}</p>}
                                        </div>
                                        <button
                                            onClick={() => handleRemoveFromRoom(guest.id, group!.id)}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                {guestsInRoom.length === 0 && (
                                    <p className="text-sm text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                                        Drag guests here to assign them to this room
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
