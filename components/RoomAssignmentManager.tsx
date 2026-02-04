"use client";

import { useState, useMemo } from "react";
import { RoomAllocation, RoomGroup, SubGuest } from "@/lib/types";

interface RoomAssignmentManagerProps {
  allocations: RoomAllocation[];
  initialGroups: RoomGroup[];
  guests: SubGuest[];
  onUpdateGroups: (groups: RoomGroup[]) => void;
  onDone?: () => void;
}

export default function RoomAssignmentManager({
  allocations,
  initialGroups,
  guests,
  onUpdateGroups,
  onDone,
}: RoomAssignmentManagerProps) {
  const [groups, setGroups] = useState<RoomGroup[]>(initialGroups);

  // --- Helpers ---
  const getOccupancy = (allocationId: string, currentGroups: RoomGroup[]) => {
    const group = currentGroups.find((g) => g.allocationId === allocationId);
    if (!group) return 0;
    const guestsInRoom = guests.filter((g) => group.guestIds.includes(g.id));
    return guestsInRoom.reduce(
      (sum, guest) => sum + (guest.guestCount || 1),
      0,
    );
  };

  const getAssignedRoomId = (guestId: string) => {
    const group = groups.find((g) => g.guestIds.includes(guestId));
    return group ? group.allocationId : "";
  };

  // --- Actions ---
  const handleAssign = (guestId: string, allocationId: string) => {
    let updatedGroups = [...groups];

    // 1. Remove guest from current group
    updatedGroups = updatedGroups
      .map((group) => ({
        ...group,
        guestIds: group.guestIds.filter((id) => id !== guestId),
      }))
      .filter((group) => group.guestIds.length > 0);

    // 2. Add to new group if allocationId is provided
    if (allocationId) {
      const guest = guests.find((g) => g.id === guestId);
      const guestSize = guest?.guestCount || 1;
      const allocation = allocations.find((a) => a.id === allocationId);

      if (allocation) {
        const currentOccupancy = getOccupancy(allocationId, updatedGroups);
        if (currentOccupancy + guestSize > allocation.maxCapacity) {
          alert(
            `Cannot assign guest. Room capacity exceeded (${currentOccupancy + guestSize}/${allocation.maxCapacity})`,
          );
          return;
        }

        const existingGroupIndex = updatedGroups.findIndex(
          (g) => g.allocationId === allocationId,
        );
        if (existingGroupIndex !== -1) {
          updatedGroups[existingGroupIndex].guestIds.push(guestId);
        } else {
          updatedGroups.push({
            id: `rg-${Date.now()}-${guestId}`,
            allocationId,
            guestIds: [guestId],
          });
        }
      }
    }

    setGroups(updatedGroups);
    onUpdateGroups(updatedGroups);
  };

  const handleAutoFill = () => {
    let updatedGroups = [...groups];
    const unassignedGuests = guests.filter(
      (g) => !updatedGroups.some((group) => group.guestIds.includes(g.id)),
    );

    // Sort guests by size descending for better packing
    const sortedGuests = [...unassignedGuests].sort(
      (a, b) => (b.guestCount || 1) - (a.guestCount || 1),
    );

    sortedGuests.forEach((guest) => {
      const guestSize = guest.guestCount || 1;
      // Find first room with enough capacity
      const targetAllocation = allocations.find((a) => {
        const occupancy = getOccupancy(a.id, updatedGroups);
        return occupancy + guestSize <= a.maxCapacity;
      });

      if (targetAllocation) {
        const existingGroupIndex = updatedGroups.findIndex(
          (g) => g.allocationId === targetAllocation.id,
        );
        if (existingGroupIndex !== -1) {
          updatedGroups[existingGroupIndex].guestIds.push(guest.id);
        } else {
          updatedGroups.push({
            id: `rg-auto-${Date.now()}-${guest.id}`,
            allocationId: targetAllocation.id,
            guestIds: [guest.id],
          });
        }
      }
    });

    setGroups(updatedGroups);
    onUpdateGroups(updatedGroups);
  };

  const handleReset = () => {
    setGroups([]);
    onUpdateGroups([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
      {/* Header / Actions */}
      <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={handleAutoFill}
            className="px-4 py-2 bg-corporate-blue-100 text-white font-bold rounded-lg hover:bg-corporate-blue-200 transition-all flex items-center gap-2 text-sm"
          >
            <span>🪄</span> Auto-Fill Rooms
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 font-bold rounded-lg hover:bg-neutral-50 transition-all flex items-center gap-2 text-sm"
          >
            <span>🔄</span> Reset All
          </button>
        </div>
        {onDone && (
          <button
            onClick={onDone}
            className="px-6 py-2 bg-success text-white font-bold rounded-lg hover:bg-success/90 transition-all text-sm"
          >
            ✓ Done
          </button>
        )}
      </div>

      {/* List Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-neutral-100 border-b border-neutral-200 text-xs font-bold text-neutral-500 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Guest Information</div>
        <div className="col-span-2 text-center">Occupancy</div>
        <div className="col-span-5">Room Assignment</div>
      </div>

      {/* Guest List */}
      <div className="divide-y divide-neutral-100 max-h-[600px] overflow-y-auto">
        {guests.map((guest, idx) => {
          const assignedRoomId = getAssignedRoomId(guest.id);
          return (
            <div
              key={guest.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-neutral-50/50 transition-colors items-center"
            >
              <div className="col-span-1 text-sm text-neutral-400 font-medium">
                {idx + 1}
              </div>
              <div className="col-span-4">
                <div className="font-bold text-neutral-900">{guest.name}</div>
                <div className="text-xs text-neutral-500">
                  {guest.email || "No email provided"}
                </div>
              </div>
              <div className="col-span-2 flex justify-center">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    (guest.guestCount || 1) > 1
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {guest.guestCount || 1}{" "}
                  {(guest.guestCount || 1) === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div className="col-span-5">
                <select
                  value={assignedRoomId}
                  onChange={(e) => handleAssign(guest.id, e.target.value)}
                  className={`w-full text-sm border-neutral-200 rounded-lg focus:ring-corporate-blue-100 focus:border-corporate-blue-100 transition-all font-medium ${
                    assignedRoomId
                      ? "bg-corporate-blue-100/5 text-corporate-blue-200 border-corporate-blue-100/20"
                      : "bg-white text-neutral-400"
                  }`}
                >
                  <option value="">Unassigned</option>
                  {allocations.map((room) => {
                    const occupancy = getOccupancy(room.id, groups);
                    const isFull =
                      occupancy >= room.maxCapacity &&
                      assignedRoomId !== room.id;
                    return (
                      <option key={room.id} value={room.id} disabled={isFull}>
                        {room.hotelName} - {room.roomType} ({occupancy}/
                        {room.maxCapacity}) {isFull ? "(FULL)" : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {guests.length === 0 && (
        <div className="p-12 text-center">
          <div className="text-4xl mb-4">👥</div>
          <div className="text-neutral-900 font-bold">No guests found</div>
          <p className="text-neutral-500 text-sm">
            Add guests to start assigning rooms.
          </p>
        </div>
      )}
    </div>
  );
}
