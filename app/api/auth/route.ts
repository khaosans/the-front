import { NextResponse } from 'next/server';
import { supabase } from '../../../utils/supabaseClient'; // Adjust the import path as necessary

export async function POST(request: Request) {
    const { email, password, callbackUrl } = await request.json();

    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }

    // If a callback URL is provided, you can redirect the user
    if (callbackUrl) {
        return NextResponse.redirect(callbackUrl);
    }

    return NextResponse.json({ user });
}