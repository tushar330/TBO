"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// MOCK DATA
const AIRPORTS = [
  { code: "DEL", city: "New Delhi", name: "Indira Gandhi International Airport" },
  { code: "BOM", city: "Mumbai", name: "Chhatrapati Shivaji Maharaj International Airport" },
  { code: "BLR", city: "Bengaluru", name: "Kempegowda International Airport" },
  { code: "MAA", city: "Chennai", name: "Chennai International Airport" },
  { code: "DXB", city: "Dubai", name: "Dubai International Airport" },
];

interface Flight {
  id: string;
  airline: string;
  airlineLogo: string; // Placeholder for now or use a text indicator
  flightNumber: string;
  departureTime: string; // HH:mm
  arrivalTime: string; // HH:mm
  duration: string;
  price: number;
  stops: number; // 0 for non-stop
  source: string;
  destination: string;
}

const MOCK_FLIGHTS: Flight[] = [
  {
    id: "f1",
    airline: "IndiGo",
    airlineLogo: "6E",
    flightNumber: "6E-5034",
    departureTime: "06:00",
    arrivalTime: "08:15",
    duration: "2h 15m",
    price: 4500,
    stops: 0,
    source: "DEL",
    destination: "BOM",
  },
  {
    id: "f2",
    airline: "Air India",
    airlineLogo: "AI",
    flightNumber: "AI-887",
    departureTime: "07:00",
    arrivalTime: "09:10",
    duration: "2h 10m",
    price: 5200,
    stops: 0,
    source: "DEL",
    destination: "BOM",
  },
  {
    id: "f3",
    airline: "Vistara",
    airlineLogo: "UK",
    flightNumber: "UK-992",
    departureTime: "09:30",
    arrivalTime: "11:45",
    duration: "2h 15m",
    price: 6100,
    stops: 0,
    source: "DEL",
    destination: "BOM",
  },
  {
    id: "f4",
    airline: "Akasa Air",
    airlineLogo: "QP",
    flightNumber: "QP-1122",
    departureTime: "14:00",
    arrivalTime: "16:20",
    duration: "2h 20m",
    price: 4300,
    stops: 1,
    source: "DEL",
    destination: "BOM",
  },
    {
    id: "f5",
    airline: "IndiGo",
    airlineLogo: "6E",
    flightNumber: "6E-2045",
    departureTime: "18:45",
    arrivalTime: "21:00",
    duration: "2h 15m",
    price: 4800,
    stops: 0,
    source: "DEL",
    destination: "BOM",
  },
];

export default function FlightListingPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  // Search State
  const [source, setSource] = useState("DEL");
  const [destination, setDestination] = useState("BOM");
  const [date, setDate] = useState("2024-10-15");
  const [travellers, setTravellers] = useState(1);
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");

  // Filter State (Basic)
  const [sortBy, setSortBy] = useState<"price" | "duration" | "departure">("price");
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  // Derived State
  const sortedFlights = [...MOCK_FLIGHTS].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      // Simple mock sort for others
      return 0;
  });

  const toggleDetails = (flightId: string) => {
      setExpandedFlightId(expandedFlightId === flightId ? null : flightId);
  };

  return (
    <div className="space-y-6">
      {/* Header / Back Link */}
      <div className="flex items-center gap-4">
        <Link 
            href={`/events/${eventId}`}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>
        <h1 className="text-2xl font-bold text-neutral-900">Flight Bookings</h1>
      </div>

      {/* Search Widget */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        {/* Trip Type Tabs */}
        <div className="flex gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    name="tripType" 
                    checked={tripType === "one-way"} 
                    onChange={() => setTripType("one-way")}
                    className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-neutral-700">One Way</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
                <input 
                    type="radio" 
                    name="tripType" 
                    checked={tripType === "round-trip"} 
                    onChange={() => setTripType("round-trip")}
                    className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-neutral-700">Round Trip</span>
            </label>
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">From</label>
                <div className="relative">
                    <select 
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-lg font-semibold text-neutral-900 focus:ring-2 focus:ring-sky-500 outline-none appearance-none"
                    >
                        {AIRPORTS.map(apt => (
                            <option key={apt.code} value={apt.code}>{apt.city} ({apt.code})</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-center -my-2 lg:my-0">
                <button 
                  onClick={() => {
                        const temp = source;
                        setSource(destination);
                        setDestination(temp);
                  }}
                  className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-sky-600 transition-transform hover:rotate-180"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                </button>
            </div>

            <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">To</label>
                <div className="relative">
                     <select 
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-lg font-semibold text-neutral-900 focus:ring-2 focus:ring-sky-500 outline-none appearance-none"
                    >
                        {AIRPORTS.map(apt => (
                            <option key={apt.code} value={apt.code}>{apt.city} ({apt.code})</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Departure</label>
                <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                />
            </div>

             <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-neutral-500 uppercase mb-1">Travellers & Class</label>
                <div className="relative">
                    <button className="w-full p-3 text-left bg-neutral-50 border border-neutral-200 rounded-lg font-medium text-neutral-900 focus:ring-2 focus:ring-sky-500">
                        {travellers} Traveller(s), Economy
                    </button>
                </div>
            </div>
        </div>

        <div className="mt-6 flex justify-center">
            <button className="px-8 py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-full text-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                Search Flights
            </button>
        </div>
      </div>

      {/* Results Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar (Hidden on mobile for MVP simplicity) */}
        <div className="hidden lg:block space-y-4">
            <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-4">Filters</h3>
                
                <div className="space-y-3 mb-6">
                    <p className="text-sm font-medium text-neutral-700">Stops</p>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked />
                        <span className="text-sm text-neutral-600">Non Stop</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" />
                        <span className="text-sm text-neutral-600">1 Stop</span>
                    </label>
                </div>

                 <div className="space-y-3">
                    <p className="text-sm font-medium text-neutral-700">Airlines</p>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked />
                        <span className="text-sm text-neutral-600">IndiGo</span>
                    </label>
                     <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked />
                        <span className="text-sm text-neutral-600">Air India</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-sky-600 focus:ring-sky-500" defaultChecked />
                        <span className="text-sm text-neutral-600">Vistara</span>
                    </label>
                </div>
            </div>
        </div>

        {/* Flight Cards List */}
        <div className="lg:col-span-3 space-y-4">
            {/* Sort Bar */}
            <div className="flex justify-between items-center pb-2">
                <h2 className="text-lg font-bold text-neutral-900">Flights from New Delhi to Mumbai</h2>
                <select 
                    value={sortBy} 
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="text-sm border-none bg-transparent font-medium text-sky-600 focus:ring-0 cursor-pointer"
                >
                    <option value="price">Cheapest First</option>
                    <option value="duration">Fastest First</option>
                    <option value="departure">Departure Time</option>
                </select>
            </div>

            {sortedFlights.map((flight) => {
                const isExpanded = expandedFlightId === flight.id;
                
                return (
                <div key={flight.id} className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Airline Info */}
                        <div className="flex items-center gap-4 min-w-[140px]">
                            <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-xs font-bold text-red-600">
                                {flight.airlineLogo}
                            </div>
                            <div>
                                <p className="font-semibold text-neutral-900">{flight.airline}</p>
                                <p className="text-xs text-neutral-500">{flight.flightNumber}</p>
                            </div>
                        </div>

                        {/* Timing Info */}
                        <div className="flex-1 flex items-center justify-between gap-4 w-full md:w-auto">
                            <div className="text-center">
                                <p className="text-xl font-bold text-neutral-900">{flight.departureTime}</p>
                                <p className="text-xs text-neutral-500">{flight.source}</p>
                            </div>

                            <div className="flex-1 flex flex-col items-center px-4">
                                <div className="text-xs text-neutral-400 mb-1">{flight.duration}</div>
                                <div className="w-full h-[1px] bg-neutral-300 relative">
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-neutral-300 bg-white"></div>
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">{flight.stops === 0 ? "Non stop" : `${flight.stops} Stop`}</div>
                            </div>

                            <div className="text-center">
                                <p className="text-xl font-bold text-neutral-900">{flight.arrivalTime}</p>
                                <p className="text-xs text-neutral-500">{flight.destination}</p>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-1 mt-4 md:mt-0 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-neutral-900">₹{flight.price.toLocaleString()}</p>
                                <p className="text-xs text-neutral-500">per traveller</p>
                            </div>
                            <button className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors">
                                Book
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 animate-in fade-in duration-200">
                        <button 
                            onClick={() => toggleDetails(flight.id)}
                            className="text-xs text-sky-600 cursor-pointer font-medium hover:underline flex items-center gap-1"
                        >
                            {isExpanded ? "Hide Flight Details" : "View Flight Details"}
                            <svg className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {isExpanded && (
                            <div className="mt-4 p-4 bg-neutral-50 rounded-lg animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-900 mb-2">Baggage</h4>
                                        <p className="text-xs text-neutral-600">Check-in: 15 Kgs (1 piece only)</p>
                                        <p className="text-xs text-neutral-600">Cabin: 7 Kgs (1 piece only)</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-900 mb-2">Policy</h4>
                                        <p className="text-xs text-neutral-600">Cancellation: Refundable (Penalty applies)</p>
                                        <p className="text-xs text-neutral-600">Reissue: Applicable (Fees apply)</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-900 mb-2">Amenities</h4>
                                        <p className="text-xs text-neutral-600">Meal: Chargeable</p>
                                        <p className="text-xs text-neutral-600">Seat: Chargeable</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )})}
        </div>
      </div>
    </div>
  );
}
