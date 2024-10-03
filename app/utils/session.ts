import { cookies } from 'next/headers';

export const getSession = () => {
    const sessionCookie = cookies().get('supabaseSession');
    return sessionCookie ? JSON.parse(sessionCookie) : null;
};