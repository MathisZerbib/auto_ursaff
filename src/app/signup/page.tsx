"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  signup,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
} from "@/app/signup/actions";
import Image from "next/image";
import { SocialLoginButton } from "@/components/social-login-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Define the schema using zod
const schema = z
  .object({
    email: z.string().email("Adresse email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /[A-Z]/,
        "Le mot de passe doit contenir au moins une lettre majuscule"
      )
      .regex(
        /[a-z]/,
        "Le mot de passe doit contenir au moins une lettre minuscule"
      )
      .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre")
      .regex(
        /[^A-Za-z0-9]/,
        "Le mot de passe doit contenir au moins un caractère spécial"
      ),
    retypePassword: z.string(),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["retypePassword"],
  });

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Record<string, string>) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await signup(formData);
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1:
        return "Très faible - Comme un spaghetti cuit";
      case 2:
        return "Faible - Comme un chaton";
      case 3:
        return "Moyen - Peut mieux faire";
      case 4:
        return "Fort - Comme un ours";
      case 5:
        return "Très fort - Hulk serait jaloux";
      default:
        return "";
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <motion.div
        className="w-full md:w-1/2 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/signup-illustration.jpg"
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-900">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className="w-full text-gray-900"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-gray-900">
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password")}
                  className="w-full text-gray-900 pr-10"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className={`h-2.5 rounded-full ${
                    passwordStrength >= 4
                      ? "bg-green-500"
                      : passwordStrength >= 2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {getPasswordStrengthText(passwordStrength)}
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="retype-password" className="text-gray-900">
                Retapez le mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="retype-password"
                  type={showRetypePassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("retypePassword")}
                  className="w-full text-gray-900 pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                >
                  {showRetypePassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              {errors.retypePassword && (
                <p className="text-red-500 text-sm">
                  {String(errors.retypePassword.message)}
                </p>
              )}
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
              className="font-medium text-blue-500 hover:underline"
            >
              Connectez-vous
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
