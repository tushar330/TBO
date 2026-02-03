# Head Guest Portal Implementation Plan

## Goal
Create a dedicated portal for Head Guests to manage their sub-group's room assignments, guest details, and view curated venue options. This portal allows "Turn-Based" room mapping and "Agent-Curated" venue discovery.

## User Review Required
> [!IMPORTANT]
> **Data Persistence**: usage of `lib/mockData.ts` for data storage. All changes will be in-memory or static for this version.

## Proposed Changes

### 1. Data Model Extension (`lib/mockData.ts` & `lib/types.ts`)
We will extend the existing mock data to support the Head Guest flow.

#### [MODIFY] [types.ts](file:///d:/Voyage/TBO/lib/types.ts)
*   Add `HeadGuest`, `RoomAllocation`, `RoomGroup`, `SubGuest`, and `CuratedVenue` interfaces.
*   Define the structure for "Turn-Based" mapping (Agents set `allocation`, Head Guests create `groups`).

#### [MODIFY] [mockData.ts](file:///d:/Voyage/TBO/lib/mockData.ts)
*   Populate `mockHeadGuests` with sample data.
*   Populate `mockRoomAllocations` corresponding to the sample head guest.
*   Populate `mockCuratedVenues` with rich media placeholders.

### 2. File Structure & Routes (`app/`)
New route group for the Portal to keep it separate from the Agent Dashboard.

#### [NEW] `app/events/[eventId]/portal/[guestId]/`
*   **`layout.tsx`**: Specialized layout (No Sidebar, different Header).
*   **`page.tsx`**: Dashboard/Hub (Stats: "3/5 Rooms Filled").

#### [NEW] `app/events/[eventId]/portal/[guestId]/rooms/`
*   **`page.tsx`**: The "Smart Rooming List".
    *   Interface to drag guests into "Room Buckets".

#### [NEW] `app/events/[eventId]/portal/[guestId]/venue/`
*   **`page.tsx`**: The "Agent-Curated Showcase".
    *   Grid of `VenueCard`s (No prices).

#### [NEW] `app/events/[eventId]/portal/[guestId]/guests/`
*   **`page.tsx`**: Guest List management + "Share Link" generator.

### 3. UI Components (`components/portal/`)

#### [NEW] `components/portal/PortalHeader.tsx`
*   Simplified top nav with Event Name and "Logout".

#### [NEW] `components/portal/RoomBucketList.tsx`
*   **Key Feature**: Drag-and-drop interface.
*   **Logic**: Validates drag actions against `allocation.maxCapacity`.

#### [NEW] `components/portal/VenueShowcaseCard.tsx`
*   Image-first design.
*   Props: `amenities`, `images`, `description`. Hides specific pricing.

#### [NEW] `components/portal/GuestLinkGenerator.tsx`
*   "Copy Link" button with visual feedback.

## Verification Plan

### Manual Verification
1.  **Access Portal**: Navigate to `/events/1/portal/hg-123` (using mock ID).
    *   *Verify*: Layout is distinct from Agent Dashboard.
2.  **Room Mapping Flow**:
    *   Go to `/rooms`.
    *   *Verify*: See "Allocated Buckets" (e.g., "Deluxe Room 1", "Deluxe Room 2").
    *   *Action*: Drag a guest from "Unassigned" to "Deluxe Room 1".
    *   *Verify*: Guest moves, bucket count updates (e.g., "1/2 occupied").
3.  **Venue Discovery**:
    *   Go to `/venue`.
    *   *Verify*: See list of hotels *without* prices.
4.  **Guest Link**:
    *   Go to `/guests`.
    *   *Action*: Click "Copy Link".
    *   *Verify*: Toast notification appears.

### Automated Tests
*   None planned for this iteration (UI-heavy prototype).
