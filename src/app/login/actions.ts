'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Provider } from '@supabase/supabase-js'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}


async function signInWithProvider(provider: Provider) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })

    if (error) {
        redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }

    if (data?.url) {
        redirect(data.url)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signInWithGoogle() {
    await signInWithProvider('google')
}

export async function signInWithFacebook() {
    await signInWithProvider('facebook')
}

export async function signInWithApple() {
    await signInWithProvider('apple')
}