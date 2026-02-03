'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import RoomBucketList from '@/components/portal/RoomBucketList';
import { mockRoomAllocations, mockRoomGroups, mockSubGuests } from '@/lib/mockData';
import { RoomGroup } from '@/lib/types';

export default function RoomsPage() {
    const params = useParams();
    const guestId = params.guestId as string;

    const allocations = mockRoomAllocations.filter(ra => ra.headGuestId === guestId);
    const guests = mockSubGuests.filter(sg => sg.headGuestId === guestId);

    // State to manage room groups (in a real app, this would be persisted)
    const [groups, setGroups] = useState<RoomGroup[]>(mockRoomGroups);

    // Update guests based on current groups
    const updatedGuests = guests.map(guest => ({
        ...guest,
        roomGroupId: groups.find(g => g.guestIds.includes(guest.id))?.id,
    }));

    const handleUpdateGroups = (newGroups: RoomGroup[]) => {
        setGroups(newGroups);
        // In a real app, you would persist this to a backend
        console.log('Updated groups:', newGroups);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Room Assignments</h1>
                <p className="text-gray-600 mt-2">
                    Drag and drop guests from the unassigned list to assign them to rooms
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-blue-900">How it works</h3>
                        <ul className="text-sm text-blue-800 mt-1 space-y-1">
                            <li>• Drag guests from the "Unassigned" section to any room below</li>
                            <li>• Each room has a maximum capacity - you cannot exceed it</li>
                            <li>• Click "Remove" to move a guest back to unassigned</li>
                        </ul>
                    </div>
                </div>
            </div>

            <RoomBucketList
                allocations={allocations}
                groups={groups}
                guests={updatedGuests}
                onUpdateGroups={handleUpdateGroups}
            />
        </div>
    );
}
