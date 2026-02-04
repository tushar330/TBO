'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { UserRole } from '@/lib/types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: UserRole;
    guestId?: string; // For guest routes, verify they can only access their own portal
}

export default function ProtectedRoute({ children, requiredRole, guestId }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Not authenticated - redirect to appropriate login
        if (!isAuthenticated || !user) {
            if (requiredRole === 'agent') {
                router.push('/login/agent');
            } else if (requiredRole === 'guest') {
                router.push('/login/guest');
            } else {
                // Default to agent login if no role specified
                router.push('/login/agent');
            }
            return;
        }

        // Check role matches
        if (requiredRole && user.role !== requiredRole) {
            // Wrong role - redirect to appropriate login
            if (requiredRole === 'agent') {
                router.push('/login/agent');
            } else {
                router.push('/login/guest');
            }
            return;
        }

        // For guest routes, verify they can only access their own portal
        if (requiredRole === 'guest' && guestId && user.id !== guestId) {
            // Guest trying to access another guest's portal
            router.push(`/events/${user.eventId}/portal/${user.id}`);
            return;
        }
    }, [isAuthenticated, user, requiredRole, guestId, router]);

    // Show nothing while checking authentication
    if (!isAuthenticated || !user) {
        return null;
    }

    // Role mismatch
    if (requiredRole && user.role !== requiredRole) {
        return null;
    }

    // Guest accessing wrong portal
    if (requiredRole === 'guest' && guestId && user.id !== guestId) {
        return null;
    }

    return <>{children}</>;
}
