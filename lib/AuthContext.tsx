'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from './types';
import { mockAgentCredentials, mockGuestCredentials } from './mockData';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('tbo_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('tbo_user');
            }
        }
    }, []);

    const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
        // Simulate async authentication
        await new Promise(resolve => setTimeout(resolve, 500));

        if (role === 'agent') {
            // Check agent credentials
            if (email === mockAgentCredentials.email && password === mockAgentCredentials.password) {
                const authenticatedUser: User = {
                    id: mockAgentCredentials.id,
                    name: mockAgentCredentials.name,
                    email: mockAgentCredentials.email,
                    role: 'agent',
                };
                setUser(authenticatedUser);
                setIsAuthenticated(true);
                localStorage.setItem('tbo_user', JSON.stringify(authenticatedUser));
                return true;
            }
        } else if (role === 'guest') {
            // Check guest credentials
            const guestCred = mockGuestCredentials.find(g => g.email === email);
            if (guestCred && password === guestCred.password) {
                const authenticatedUser: User = {
                    id: guestCred.id,
                    name: guestCred.name,
                    email: guestCred.email,
                    role: 'guest',
                    eventId: guestCred.eventId,
                };
                setUser(authenticatedUser);
                setIsAuthenticated(true);
                localStorage.setItem('tbo_user', JSON.stringify(authenticatedUser));
                return true;
            }
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('tbo_user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
