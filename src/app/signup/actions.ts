'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AuthError } from '@supabase/supabase-js'
import { Provider } from '@supabase/supabase-js'


function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

function validatePassword(password: string): boolean {
    // Add your password validation logic here
    // For example, check for minimum length
    return password.length >= 6
}

async function handleAuthError(error: AuthError | null) {
    if (error) {
        redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }
}

async function handleAuthSuccess(data: { provider: Provider; url: string | null } | null) {
    if (data?.url) {
        redirect(data.url)
    } else {
        revalidatePath('/', 'layout')
        redirect('/')
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!validateEmail(email)) {
        redirect('/error?message=Invalid email format')
    }

    if (!validatePassword(password)) {
        redirect('/error?message=Password must be at least 6 characters long')
    }

    const { error } = await supabase.auth.signUp({ email, password })
    await handleAuthError(error)
    await handleAuthSuccess(null)
}

async function signInWithProvider(provider: Provider) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    await handleAuthError(error)
    await handleAuthSuccess(data)
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