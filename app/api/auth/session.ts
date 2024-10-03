import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase/client';

export async function GET() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!data.session) {
        return NextResponse.json({ error: 'No active session' }, { status: 401 });
    }

    return NextResponse.json({ user: data.session.user });
}

export async function handleLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    if (data.session) {
        const response = NextResponse.json({ user: data.session.user });
        response.cookies.set('supabaseSession', JSON.stringify(data.session), { httpOnly: true });
        return response;
    }
    
    return NextResponse.json({ error: 'Login failed' }, { status: 401 });
}

export async function handleOAuthLogin() {
    const provider = 'google';
    console.log(`Attempting to log in with OAuth provider: ${provider}`);
    const { data, error } = await supabase.auth.signInWithOAuth({ provider });

    if (error) {
        console.error('OAuth login error:', error);
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    console.log('Session:', data);
    if (data.session) {
        console.log('Authenticated User:', data.session.user);
        // Store session in local storage
        localStorage.setItem('supabaseSession', JSON.stringify(data.session));
        console.log('Session stored in local storage');
        return NextResponse.json({ user: data.session.user });
    }

    return NextResponse.json({ error: 'OAuth login failed' }, { status: 401 });
}