import VenueShowcaseCard from '@/components/portal/VenueShowcaseCard';
import { mockCuratedVenues } from '@/lib/mockData';

export default async function VenuePage({ params }: { params: Promise<{ eventId: string; guestId: string }> }) {
    const { eventId } = await params;
    const venues = mockCuratedVenues.filter(v => v.eventId === eventId);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Curated Venues</h1>
                <p className="text-gray-600 mt-2">
                    Explore the handpicked hotels for your event - carefully selected by our team
                </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <h3 className="font-semibold text-purple-900">Agent-Curated Selection</h3>
                        <p className="text-sm text-purple-800 mt-1">
                            These venues have been specially selected and negotiated by our event agents to ensure the best experience for your group.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map(venue => (
                    <VenueShowcaseCard key={venue.id} venue={venue} />
                ))}
            </div>

            {venues.length === 0 && (
                <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-600">No venues available yet</p>
                </div>
            )}
        </div>
    );
}
