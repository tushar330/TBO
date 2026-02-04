"use client";

import { use, useEffect, useState } from "react";
import { HOTELS, RoomType as HotelRoomType } from "../hotels/data";
import RoomAssignmentManager from "@/components/RoomAssignmentManager";
import { RoomAllocation, RoomGroup, SubGuest } from "@/lib/types";

export default function RoomMappingPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);

  const [guests, setGuests] = useState<SubGuest[]>([
    {
      id: "1",
      name: "Rajesh Kumar",
      guestCount: 2,
      headGuestId: "hg-1",
      email: "rajesh@example.com",
    },
    {
      id: "2",
      name: "Priya Sharma",
      guestCount: 1,
      headGuestId: "hg-1",
      email: "priya@example.com",
    },
    {
      id: "3",
      name: "Amit Patel",
      guestCount: 3,
      headGuestId: "hg-2",
      email: "amit@example.com",
    },
    {
      id: "4",
      name: "Sneha Reddy",
      guestCount: 2,
      headGuestId: "hg-2",
      email: "sneha@example.com",
    },
  ]);

  const [allocations, setAllocations] = useState<RoomAllocation[]>([]);
  const [groups, setGroups] = useState<RoomGroup[]>([]);

  useEffect(() => {
    const savedMapping = localStorage.getItem(`mapping_${eventId}`);

    if (savedMapping) {
      const { hotelId, selectedRooms } = JSON.parse(savedMapping);
      const hotel = HOTELS.find((h) => h.id === hotelId);

      if (hotel && selectedRooms) {
        const generatedAllocations: RoomAllocation[] = [];

        Object.entries(selectedRooms).forEach(([roomId, count]) => {
          const qty = count as number;
          if (qty > 0) {
            let roomDetails: HotelRoomType | undefined;
            Object.values(hotel.rooms).forEach((category: any) => {
              const found = category.find(
                (r: HotelRoomType) => r.id === Number(roomId),
              );
              if (found) roomDetails = found;
            });

            if (roomDetails) {
              for (let i = 0; i < qty; i++) {
                generatedAllocations.push({
                  id: `${roomDetails.id}-${i}`,
                  eventId,
                  headGuestId: "hg-1", // Default or mapped
                  roomType: roomDetails.name,
                  maxCapacity: roomDetails.capacity,
                  hotelName: hotel.name,
                });
              }
            }
          }
        });
        setAllocations(generatedAllocations);
      }
    } else {
      setAllocations([
        {
          id: "ra-1",
          eventId,
          headGuestId: "hg-1",
          roomType: "Deluxe Room",
          maxCapacity: 2,
          hotelName: "The Grand Palace",
        },
        {
          id: "ra-2",
          eventId,
          headGuestId: "hg-1",
          roomType: "Premium Suite",
          maxCapacity: 3,
          hotelName: "The Grand Palace",
        },
      ]);
    }
  }, [eventId]);

  const handleUpdateGroups = (newGroups: RoomGroup[]) => {
    setGroups(newGroups);
    console.log("Updated mapping:", newGroups);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight">
            Room Mapping
          </h1>
          <p className="text-neutral-500 mt-1 font-medium italic">
            Simplified guest assignment with real-time capacity optimization
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="mb-8 p-6 bg-corporate-blue-100/5 border-l-4 border-corporate-blue-100 rounded-r-xl">
          <h3 className="font-bold text-corporate-blue-100 flex items-center gap-2 mb-2">
            <span>ℹ️</span> How to use
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed font-medium">
            Select a room from the dropdown for each guest. You can also use
            <strong> Auto-Fill</strong> to automatically pair guests with
            available rooms based on capacity. Click <strong>Done</strong> to
            save your changes.
          </p>
        </div>

        <RoomAssignmentManager
          allocations={allocations}
          initialGroups={groups}
          guests={guests}
          onUpdateGroups={handleUpdateGroups}
          onDone={() => alert("Mappings saved successfully!")}
        />
      </div>
    </div>
  );
}
