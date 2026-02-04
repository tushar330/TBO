'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/lib/AuthContext';

export default function GuestLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login, isAuthenticated, user } = useAuth();

    // Redirect if already logged in as guest
    useEffect(() => {
        if (isAuthenticated && user && user.role === 'guest' && user.eventId) {
            router.push(`/events/${user.eventId}/portal/${user.id}`);
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const success = await login(email, password, 'guest');

            if (success) {
                // The useEffect will handle the redirect after user state updates
                // No need to manually redirect here
            } else {
                setError('Invalid email or password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return <LoginForm onSubmit={handleSubmit} userType="guest" isLoading={isLoading} error={error} />;
}
