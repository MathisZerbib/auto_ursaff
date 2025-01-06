"use server";

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Provider } from '@supabase/supabase-js';

export async function signInWithProvider(provider: Provider) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`, // Redirect to your callback route
    },
  });

  if (error) {
    return redirect(`/error?message=${encodeURIComponent(error.message)}`);
  }

  if (data?.url) {
    return redirect(data.url);
  }

  revalidatePath('/', 'layout');
  return redirect('/');
}

export async function signInWithGoogle() {
  await signInWithProvider('google');
}

export async function signInWithFacebook() {
  await signInWithProvider('facebook');
}

export async function signInWithApple() {
  await signInWithProvider('apple');
}

export async function signInWithPassword(data: { email: string; password: string }) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error('Error signing in with password:', error.message);
  }

  revalidatePath('/', 'layout');
  return redirect('/dashboard');
}