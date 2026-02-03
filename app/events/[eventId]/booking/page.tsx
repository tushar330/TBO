'use client';

import { use } from 'react';
import { useState, useEffect } from 'react';

type PipelineStage = 'batch' | 'validate' | 'execute' | 'errors' | 'reconcile';
type StageStatus = 'pending' | 'processing' | 'success' | 'error';

interface Booking {
  id: string;
  guest: string;
  room: string;
  status: 'success' | 'processing' | 'error';
}

export default function BookingPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const [currentStage, setCurrentStage] = useState<PipelineStage>('batch');
  const [stageStatuses, setStageStatuses] = useState<Record<PipelineStage, StageStatus>>({
    batch: 'pending',
    validate: 'pending',
    execute: 'pending',
    errors: 'pending',
    reconcile: 'pending',
  });

  const bookings: Booking[] = [
    { id: '1', guest: 'Rajesh Kumar', room: 'Deluxe Room - Grand Palace', status: 'success' },
    { id: '2', guest: 'Priya Sharma', room: 'Premium Suite - Royal Retreat', status: 'success' },
    { id: '3', guest: 'Amit Patel', room: 'Executive Suite - Grand Palace', status: 'processing' },
    { id: '4', guest: 'Sneha Reddy', room: 'Deluxe Room - Royal Retreat', status: 'error' },
  ];

  const stages: { id: PipelineStage; label: string }[] = [
    { id: 'batch', label: 'Batch' },
    { id: 'validate', label: 'Validate' },
    { id: 'execute', label: 'Execute' },
    { id: 'errors', label: 'Handle Errors' },
    { id: 'reconcile', label: 'Reconcile' },
  ];

  const getStatusColor = (status: StageStatus) => {
    switch (status) {
      case 'success': return 'bg-success text-white';
      case 'processing': return 'bg-warning text-white';
      case 'error': return 'bg-error text-white';
      default: return 'bg-neutral-200 text-neutral-600';
    }
  };

  const getBookingStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'success': return 'bg-success/10 text-success border-success/20';
      case 'processing': return 'bg-warning/10 text-warning border-warning/20';
      case 'error': return 'bg-error/10 text-error border-error/20';
    }
  };

  const getBookingStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'success': return '✓';
      case 'processing': return '⟳';
      case 'error': return '✕';
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200 px-8 py-6">
        <h1 className="text-2xl font-bold text-neutral-900">Booking Execution Engine</h1>
        <p className="text-sm text-neutral-600 mt-1">
          Visual pipeline with intelligent error handling
        </p>
      </div>

      <div className="px-8 py-8">
        {/* Pipeline Visualization */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-6">Execution Pipeline</h2>

          <div className="flex items-center justify-between">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${getStatusColor(stageStatuses[stage.id])}`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-neutral-700 mt-2">{stage.label}</span>
                </div>
                {index < stages.length - 1 && (
                  <div className="flex-1 h-1 bg-neutral-200 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Status Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <span className="text-success text-xl">✓</span>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Success</p>
                <p className="text-2xl font-bold text-neutral-900">142</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <span className="text-warning text-xl">⟳</span>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Processing</p>
                <p className="text-2xl font-bold text-neutral-900">8</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <span className="text-error text-xl">✕</span>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Partial Failure</p>
                <p className="text-2xl font-bold text-neutral-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Booking Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Live Booking Status</h2>

          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-neutral-900">{booking.guest}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{booking.room}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getBookingStatusColor(booking.status)}`}>
                  {getBookingStatusIcon(booking.status)} {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
