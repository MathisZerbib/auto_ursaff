"use client";

import {
  signup,
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

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/signup-illustration.jpg" // Remplacez par le chemin de votre image
          alt="Illustration d'inscription"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 flex items-center justify-center">
          <div className="bg-white rounded-md p-4">
            <Image
              src="/URSSAF_Logo.svg"
              alt="Logo URSSAF"
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
            <h2 className="text-3xl font-bold text-gray-900">Rejoignez-nous</h2>
            <p className="mt-2 text-sm text-gray-400">
              Créez un compte pour commencer
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
          <div className="relative my-8">
            <Separator className="border-t border-gray-400" />
          </div>
          <form action={signup} className="space-y-6">
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
                className="w-full text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-900">
                Mot de passe
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full text-gray-900"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-900"
            >
              S&apos;inscrire
            </Button>
          </form>
          <p className="mt-2 text-center text-sm text-gray-400">
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
              className="font-medium text-blue-500 hover:underline" // Remplacez par la couleur de votre choix
            >
              Connectez-vous
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
