'use client';

import { use } from 'react';

export default function MicrositePage({ params }: { params: Promise<{ eventSlug: string }> }) {
  const { eventSlug } = use(params);

  const eventData = {
    name: 'Ananya & Rahul Wedding',
    tagline: 'Join us in celebrating our special day',
    location: 'Jaipur, Rajasthan',
    dates: 'February 12-14, 2026',
  };

  const hotels = [
    {
      id: 1,
      name: 'The Grand Palace',
      image: '🏰',
      rating: 5,
      price: '₹6,500',
      amenities: ['Pool', 'Spa', 'Restaurant'],
    },
    {
      id: 2,
      name: 'Royal Retreat',
      image: '🏨',
      rating: 4,
      price: '₹5,200',
      amenities: ['Pool', 'Gym', 'Breakfast'],
    },
  ];

  const itinerary = [
    { day: 'Day 1', event: 'Welcome Dinner', time: '7:00 PM' },
    { day: 'Day 2', event: 'Wedding Ceremony', time: '6:00 PM' },
    { day: 'Day 3', event: 'Reception', time: '8:00 PM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-premium text-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">{eventData.name}</h1>
          <p className="text-xl text-white/90 mb-2">{eventData.tagline}</p>
          <p className="text-white/75">
            {eventData.location} • {eventData.dates}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Event Itinerary */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Event Itinerary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itinerary.map((item, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="w-16 h-16 bg-corporate-blue-100/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-corporate-blue-100">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.day}</h3>
                <p className="text-lg text-neutral-700 mb-1">{item.event}</p>
                <p className="text-sm text-neutral-500">{item.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hotel Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8 text-center">Accommodation Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {hotels.map((hotel) => (
              <div key={hotel.id} className="card overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-corporate-blue-100 to-corporate-blue-300 flex items-center justify-center">
                  <span className="text-8xl">{hotel.image}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">{hotel.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <span key={i} className="text-warning">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-600">Starting from</p>
                      <p className="text-2xl font-bold text-corporate-blue-100">{hotel.price}</p>
                      <p className="text-xs text-neutral-500">per night</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-corporate-blue-100 hover:bg-corporate-blue-200 text-white font-semibold rounded-lg transition-colors">
                    Select Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Rules */}
        <section className="card p-8 bg-neutral-50">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Booking Information</h2>
          <ul className="space-y-3 text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-corporate-blue-100 mt-1">✓</span>
              <span>Book by January 15, 2026 to secure discounted rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-corporate-blue-100 mt-1">✓</span>
              <span>Free cancellation up to 7 days before check-in</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-corporate-blue-100 mt-1">✓</span>
              <span>Complimentary airport transfers for 3+ night stays</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-corporate-blue-100 mt-1">✓</span>
              <span>Special group rates negotiated exclusively for this event</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
