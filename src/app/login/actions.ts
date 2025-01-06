"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Provider } from '@supabase/supabase-js';

export async function signInWithProvider(provider: Provider): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();

  const redirectUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}/dashboard`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
    },
  });

  if (error) {
    console.error(`Error signing in with ${provider}:`, error.message);
    return { error: error.message };
  }

  if (data?.url) {
    return { url: data.url };
  }

  revalidatePath('/', 'layout');
  return { url: redirectUrl };
}

export async function handleGoogleSignIn(): Promise<{ url?: string; error?: string }> {
  return await signInWithProvider('google');
}

export async function handleFacebookSignIn(): Promise<{ url?: string; error?: string }> {
  return await signInWithProvider('facebook');
}

export async function handleAppleSignIn(): Promise<{ url?: string; error?: string }> {
  return await signInWithProvider('apple');
}

export async function signInWithPassword(data: { email: string; password: string }): Promise<{ url?: string; error?: string }> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Error signing in with password:', error.message);
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  return { url: '/dashboard' };
}
