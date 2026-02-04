'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const { logout, user } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        // Redirect to appropriate login page
        if (user?.role === 'agent') {
            router.push('/login/agent');
        } else {
            router.push('/login/guest');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
        </button>
    );
}
