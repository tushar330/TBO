# Product Requirements Document: Head Guest Management Portal

## 1. Overview
The **Head Guest Management Portal** is a dedicated interface for primary contact persons ("Head Guests") who are responsible for managing a group of sub-guests (e.g., family members, corporate teams, wedding parties). This portal allows them to input guest details, manage room assignments within their allocation, and ensure compliance with event requirements without requiring the travel agent to manually enter every detail.

## 2. Target Audience
*   **Head Guest**: The primary booker or group leader responsible for a subset of the total event inventory.
*   **Context**: Families attending weddings, Team leads for corporate offsites.

## 3. Problem Statement
Currently, agents or event planners must chase individual guests for details or rely on the Head Guest to fill out complex spreadsheets. This manual process is error-prone, slow, and lacks visibility for the Head Guest regarding their group's status.

## 4. Goals & Success Metrics
*   **Self-Service**: Head Guests can complete >90% of guest data entry independently.
*   **Accuracy**: Reduce data entry errors (names, dietaries) by allowing direct input.
*   **Efficiency**: Eliminate email/WhatsApp ping-pong for guest lists.

## 5. Functional Requirements

### 5.1 Authentication & Access
*   **Mechanism**: Secure Magic Link sent via Email/WhatsApp (Passwordless).
*   **Route**: `/portal/[token]` or `/events/[eventId]/head-guest/[uniqueId]`
*   **Security**: Token-based access specific to the Head Guest's sub-group.

### 5.2 Dashboard (The "Hub")
*   **Overview Cards**:
    *   Total Guests Allowed vs. Added.
    *   Rooms Allocated vs. Assigned.
    *   Pending Actions (e.g., "3 Guests missing passport details").
*   **Event Context**: Display Event Name, Dates, and Location.

### 5.3 Guest Management
*   **Add/Edit Guest**: Form to add sub-guests.
    *   Fields: Name, Age, Gender, Contact (optional), Dietary Requirements, ID Proof (if needed).
*   **Bulk Actions**: Copy details, remove guest.
*   **Validation**: Enforce limits (blocking adding more guests than allocated).

### 5.4 Room Assignment (Optional/Advanced)
*   **View Allocation**: See list of distinct rooms allocated to this Head Guest (e.g., "2x Deluxe Rooms").
*   **Assign**: Drag-and-drop or dropdown functionality to place added guests into specific rooms.
*   **Occupancy Rules**: Prevent overcrowding rooms (e.g., max 3 adults).

### 5.5 Confirmation & Summary
*   **Submit**: "Lock & Confirm" button to signal completion to the agent.
*   **Download**: Option to download their group's summary.

## 6. User Experience (UX)
*   **Vibe**: Premium, trustworthy, efficient. Matches the "Corporate Blue" and "Premium Gradient" design system.
*   **Mobile-First**: Fully responsive, as many Head Guests will access via phone.

## 7. Technical Specifications

### 7.1 New Routes
*   `/events/[eventId]/portal/[guestId]`: Main dashboard.
*   `/events/[eventId]/portal/[guestId]/manage`: Guest entry form.
*   `/events/[eventId]/portal/[guestId]/rooms`: Room assignment.

### 7.2 Data Model Updates
*   **Guest Entity**: Add `isHeadGuest` boolean flag.
*   **Group/Allocation Entity**: Link guests to a `HeadGuestId` or `GroupId`.

### 7.3 Components
*   `HeadGuestLayout`: Unique layout without full agent sidebar.
*   `GuestEntryForm`: Reusable form component.
*   `RoomAllocationCard`: UI for mapping guests to rooms.

## 8. Finalized Workflows (User Decisions)

### 8.1 Shared "Turn-Based" Room Mapping
*   **Model**: Collaborative responsibility with distinct "turns".
    1.  **Turn 1: Agent (Setup & Constraints)**
        *   Agent allocates specific room *types* and *quantities* to the Head Guest (e.g., "5x Deluxe Rooms, 2x Suites").
        *   Agent sets occupancy rules (e.g., "Max 3 adults per Deluxe").
    2.  **Turn 2: Head Guest (Assignment)**
        *   Head Guest logs in and sees their "Inventory Bucket" (e.g., "You have 5 Deluxe Rooms").
        *   Head Guest drags-and-drops their sub-guests into these abstract room slots (e.g., "Room 1", "Room 2").
        *   *Constraint*: Cannot add more guests than capacity allows. Cannot create new rooms.
    3.  **Turn 3: Agent (Finalization)**
        *   Agent reviews the groupings.
        *   Agent assigns actual Property Management System (PMS) room numbers (e.g., "Room 302") to the groups.

### 8.2 Agent-Curated Venue Showcase
*   **Workflow**: Internal curation process.
    *   **Step 1**: Agent selects a shortlist of relevant hotels for the destination.
    *   **Step 2**: Head Guest views this curated list in the portal.
    *   **Display**:
        *   **Hides Prices**: Focus purely on amenities, visuals, and vibe.
        *   **Rich Media**: High-quality images and descriptions.
    *   **Goal**: Head Guest selects preferences from the approved list, avoiding "budget shock" or unrealistic requests.

### 8.3 Guest Data Link
*   **Feature**: "Shareable Data Link".
*   **Functionality**: Head Guest generates a unique URL to send to their group via WhatsApp/Email.
*   **Flow**:
    *   Sub-guest clicks link -> Fills own details (Name, ID, Diet) -> Data auto-populates in Head Guest's dashboard.
*   **Benefit**: Saves Head Guest from manual data entry.

## 9. Revised Technical Specifications

### 9.1 Data Structure Updates
*   **Allocation Object**:
    ```typescript
    type Allocation = {
      headGuestId: string;
      roomTypeId: string;
      count: number; // e.g., 5 rooms allocated
      groups: RoomGroup[]; // The "buckets" created by Head Guest
    }
    ```
*   **Venue Visibility**:
    *   New table/relation `EventCuratedVenues` linking `Event -> Hotel` to control what Head Guest sees.

### 9.2 New UI Components
*   `RoomBucketList`: Draggable container showing "Slot 1 of 5", "Slot 2 of 5".
*   `VenueShowcaseCard`: Image-first card with hidden pricing.
*   `DataCollectionLink`: Component to generate/copy the guest intake URL.

## 10. Future Considerations (Out of Scope for V1)
*   Payments by Head Guest.
*   Real-time chat between Agent and Head Guest.
