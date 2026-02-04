'use client';

import { CuratedVenue } from '@/lib/types';
import Image from 'next/image';

interface VenueShowcaseCardProps {
    venue: CuratedVenue;
}

export default function VenueShowcaseCard({ venue }: VenueShowcaseCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full">
                <Image
                    src={venue.images[0]}
                    alt={venue.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {venue.location}
                </p>

                <p className="text-sm text-gray-700 mb-4 line-clamp-3">{venue.description}</p>

                <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                        {venue.amenities.slice(0, 4).map((amenity, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                                {amenity}
                            </span>
                        ))}
                        {venue.amenities.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{venue.amenities.length - 4} more
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
