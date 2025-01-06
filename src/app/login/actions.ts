"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Provider } from '@supabase/supabase-js';

// Sign in with OAuth provider (Google, Facebook, Apple)
export async function signInWithProvider(provider: Provider) {
  const supabase = await createClient();

  // Initiate OAuth sign-in
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`, // Redirect to callback route
    },
  });

  // Handle errors
  if (error) {
    console.error(`Error signing in with ${provider}:`, error.message);
    return { error: error.message }; // Return error message instead of redirecting
  }

  // Redirect to the provider's OAuth URL
  if (data?.url) {
    return redirect(data.url); // Redirect to the provider's OAuth page
  }

  // Fallback redirect if something goes wrong
  revalidatePath('/', 'layout');
  return redirect('/');
}

// Wrapper functions to match the expected signature
export async function handleGoogleSignIn() {
  return await signInWithProvider('google');
}

export async function handleFacebookSignIn() {
  return await signInWithProvider('facebook');
}

export async function handleAppleSignIn() {
  return await signInWithProvider('apple');
}

// Sign in with email and password
export async function signInWithPassword(data: { email: string; password: string }) {
  const supabase = await createClient();

  // Attempt to sign in with email and password
  const { error } = await supabase.auth.signInWithPassword(data);

  // Handle errors
  if (error) {
    console.error('Error signing in with password:', error.message);
    return { error: error.message }; // Return error message instead of redirecting
  }

  // Revalidate cache and redirect to dashboard
  revalidatePath('/', 'layout');
  return redirect('/dashboard');
}