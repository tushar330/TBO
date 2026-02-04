'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/lib/AuthContext';

export default function AgentLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { login, isAuthenticated, user } = useAuth();

    // Redirect if already logged in as agent
    useEffect(() => {
        if (isAuthenticated && user && user.role === 'agent') {
            router.push('/dashboard');
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const success = await login(email, password, 'agent');

            if (success) {
                router.push('/dashboard');
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

    return <LoginForm onSubmit={handleSubmit} userType="agent" isLoading={isLoading} error={error} />;
}
