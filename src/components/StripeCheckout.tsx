"use client";

import { useState } from "react";
import getStripe from "@/utils/get-stripe";
import { useAuth } from "@/hooks/auth"; // Import the useAuth hook
import { useRouter } from "next/navigation"; // Import useRouter
import { SolidButton } from "@/components/SolidButton";

interface StripeCheckoutProps {
  priceId: string;
  isFreeTier?: boolean;
}

export default function StripeCheckout({
  priceId,
  isFreeTier,
}: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the user from the useAuth hook
  const router = useRouter(); // Initialize useRouter

  const handleCheckout = async () => {
    setLoading(true);

    try {
      if (!user) {
        // If the user is not logged in, redirect to signup/login
        router.push("/signup");
        return;
      }

      if (isFreeTier) {
        // If it's the free tier, redirect to the dashboard
        router.push("/dashboard");
        return;
      }

      // Call the backend to create a checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const session = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe.js failed to load.");
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        throw result.error;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SolidButton onClick={handleCheckout} disabled={loading} className="w-full">
      {loading ? "Processing..." : "Choisir ce plan"}
    </SolidButton>
  );
}
