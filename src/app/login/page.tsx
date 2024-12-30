"use client";

import {
  login,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
} from "@/app/login/actions";
import Image from "next/image";
import { SocialLoginButton } from "@/components/social-login-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/login-illustration.jpg"
          alt="Login Illustration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4">
            <Image
              src="/URSSAF_Logo.svg"
              alt="URSAFF Logo"
              width={500}
              height={500}
              className="filter drop-shadow-lg"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-16"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to your account to continue
            </p>
          </div>
          <div className="space-y-4">
            <SocialLoginButton provider="google" action={signInWithGoogle} />
            <SocialLoginButton
              provider="facebook"
              action={signInWithFacebook}
            />
            <SocialLoginButton provider="apple" action={signInWithApple} />
          </div>
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              Or continue with
            </span>
          </div>
          <form action={login} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-gray-900"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Sign in
            </Button>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign up now
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
