'use client';

import { useState } from 'react';
import { useEvents } from '@/lib/EventContext';

interface Hotel {
  name: string;
  rooms: number;
  rate: number;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ isOpen, onClose }: EventModalProps) {
  const { addEvent } = useEvents();
  const [step, setStep] = useState(1);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    organizer: '',
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentHotel, setCurrentHotel] = useState({
    name: '',
    rooms: '',
    rate: '',
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddHotel = () => {
    if (currentHotel.name && currentHotel.rooms && currentHotel.rate) {
      setHotels([
        ...hotels,
        {
          name: currentHotel.name,
          rooms: parseInt(currentHotel.rooms),
          rate: parseInt(currentHotel.rate),
        },
      ]);
      setCurrentHotel({ name: '', rooms: '', rate: '' });
      setShowHotelForm(false);
    }
  };

  const handleRemoveHotel = (index: number) => {
    setHotels(hotels.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Create new event
    const newEvent = {
      id: `event-${Date.now()}`,
      name: formData.name,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      organizer: formData.organizer,
      status: 'upcoming' as const,
      guestCount: 0,
      hotelCount: hotels.length,
      inventoryConsumed: 0,
      hotels: hotels.map((h) => ({
        id: `hotel-${Date.now()}-${Math.random()}`,
        name: h.name,
        location: formData.location,
        totalRooms: h.rooms,
        bookedRooms: 0,
        rate: h.rate,
      })),
    };

    addEvent(newEvent);

    // Show success state
    setStep(3);
    setTimeout(() => {
      onClose();
      // Reset form
      setStep(1);
      setFormData({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
        organizer: '',
      });
      setHotels([]);
    }, 2000);
  };

  const resetAndClose = () => {
    onClose();
    setStep(1);
    setFormData({
      name: '',
      location: '',
      startDate: '',
      endDate: '',
      organizer: '',
    });
    setHotels([]);
    setShowHotelForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Create New Event</h2>
            <p className="text-sm text-neutral-600 mt-1">
              {step === 1 && 'Step 1 of 2: Event Details'}
              {step === 2 && 'Step 2 of 2: Hotel Negotiation Mapping'}
              {step === 3 && 'Success!'}
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Indicator */}
        {step < 3 && (
          <div className="px-6 py-3 bg-neutral-50 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-corporate-blue-100' : 'bg-neutral-200'}`} />
              <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-corporate-blue-100' : 'bg-neutral-200'}`} />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                  placeholder="e.g., Ananya & Rahul Wedding"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                  placeholder="e.g., Jaipur"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Organizer *
                </label>
                <input
                  type="text"
                  value={formData.organizer}
                  onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                  placeholder="e.g., Ananya Sharma"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-neutral-700">
                  Add hotels with negotiated rates and allotments for this event.
                </p>
              </div>

              {/* Added Hotels List */}
              {hotels.length > 0 && (
                <div className="space-y-3 mb-4">
                  {hotels.map((hotel, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg bg-white">
                      <div className="flex-1">
                        <h3 className="font-medium text-neutral-900">{hotel.name}</h3>
                        <p className="text-sm text-neutral-600 mt-1">
                          {hotel.rooms} rooms • ₹{hotel.rate.toLocaleString()} per night
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveHotel(index)}
                        className="text-error hover:text-error/80 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Hotel Form */}
              {showHotelForm ? (
                <div className="border-2 border-corporate-blue-100 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Hotel Name *
                    </label>
                    <input
                      type="text"
                      value={currentHotel.name}
                      onChange={(e) => setCurrentHotel({ ...currentHotel, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                      placeholder="e.g., The Grand Palace"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Room Allotment *
                      </label>
                      <input
                        type="number"
                        value={currentHotel.rooms}
                        onChange={(e) => setCurrentHotel({ ...currentHotel, rooms: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                        placeholder="50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Rate per Night (₹) *
                      </label>
                      <input
                        type="number"
                        value={currentHotel.rate}
                        onChange={(e) => setCurrentHotel({ ...currentHotel, rate: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-corporate-blue-100"
                        placeholder="5500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleAddHotel}
                      className="flex-1 py-2 bg-corporate-blue-100 hover:bg-corporate-blue-200 text-white font-medium rounded-lg transition-colors"
                    >
                      Add Hotel
                    </button>
                    <button
                      onClick={() => {
                        setShowHotelForm(false);
                        setCurrentHotel({ name: '', rooms: '', rate: '' });
                      }}
                      className="px-4 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowHotelForm(true)}
                  className="w-full py-3 border-2 border-dashed border-neutral-300 rounded-lg text-neutral-600 hover:border-corporate-blue-100 hover:text-corporate-blue-100 transition-colors font-medium"
                >
                  + Add Hotel
                </button>
              )}

              <div className="text-xs text-neutral-500 mt-2">
                You can add multiple hotels with specific room allotments, negotiated rates, and inclusions.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Inventory Locked to This Event
              </h3>
              <p className="text-neutral-600">
                Your dedicated inventory vault has been created successfully.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {step < 3 && (
          <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={step === 1 ? resetAndClose : handleBack}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>
            <button
              onClick={step === 2 ? handleSubmit : handleNext}
              disabled={
                step === 1
                  ? !formData.name || !formData.location || !formData.startDate || !formData.endDate || !formData.organizer
                  : false
              }
              className="px-6 py-2 bg-corporate-blue-100 hover:bg-corporate-blue-200 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 2 ? 'Create Event' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
