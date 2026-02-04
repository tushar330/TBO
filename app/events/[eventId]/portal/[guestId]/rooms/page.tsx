"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RoomAssignmentManager from "@/components/RoomAssignmentManager";
import {
  mockRoomAllocations,
  mockRoomGroups,
  mockSubGuests,
} from "@/lib/mockData";
import { RoomGroup } from "@/lib/types";

export default function RoomsPage() {
  const params = useParams();
  const guestId = params.guestId as string;

  const allocations = mockRoomAllocations.filter(
    (ra) => ra.headGuestId === guestId,
  );
  const guests = mockSubGuests.filter((sg) => sg.headGuestId === guestId);

  // State to manage room groups (in a real app, this would be persisted)
  const [groups, setGroups] = useState<RoomGroup[]>(
    mockRoomGroups.filter((rg) =>
      allocations.some((a) => a.id === rg.allocationId),
    ),
  );

  const handleUpdateGroups = (newGroups: RoomGroup[]) => {
    setGroups(newGroups);
    // In a real app, you would persist this to a backend
    console.log("Updated groups:", newGroups);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
          Room Assignments
        </h1>
        <p className="text-neutral-600 mt-2 font-medium italic">
          Simplified room planning for your family and sub-guests
        </p>
      </div>

      <div className="bg-corporate-blue-100/5 border border-corporate-blue-100/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-corporate-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
            ?
          </div>
          <div>
            <h3 className="font-bold text-neutral-900">How to assign rooms</h3>
            <ul className="text-sm text-neutral-600 mt-2 space-y-2 list-disc list-inside font-medium">
              <li>Select a room from the dropdown for each guest member</li>
              <li>
                Use <strong>Auto-Fill</strong> to automatically pair people
                based on room capacity
              </li>
              <li>
                Click <strong>Done</strong> once you are satisfied with the
                arrangements
              </li>
            </ul>
          </div>
        </div>
      </div>

      <RoomAssignmentManager
        allocations={allocations}
        initialGroups={groups}
        guests={guests}
        onUpdateGroups={handleUpdateGroups}
        onDone={() => alert("Room assignments confirmed!")}
      />
    </div>
  );
}
