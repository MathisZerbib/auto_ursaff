import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the dashboard or any other page after successful login
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Redirect to the error page if something went wrong
  return NextResponse.redirect(new URL('/error', request.url));
}