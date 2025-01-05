"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after a delay (optional)
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Vérifiez votre email
        </h1>
        <p className="text-gray-700 mb-6">
          Merci pour votre inscription. Un email de confirmation a été envoyé à
          votre adresse. Veuillez vérifier votre boîte de réception et cliquer
          sur le lien de confirmation pour activer votre compte.
        </p>
        <p className="text-gray-500">
          Cliquez sur le lien reçu dans votre boîte de réception pour activer
          votre compte.
        </p>
      </div>
    </div>
  );
}
