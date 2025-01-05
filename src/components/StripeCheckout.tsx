// "use client";

// import { useState } from "react";
// import getStripe from "@/utils/get-stripe";

// interface StripeCheckoutProps {
//   priceId: string;
// }

// export default function StripeCheckout({ priceId }: StripeCheckoutProps) {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     setLoading(true);

//     try {
//       // Call the backend to create a checkout session
//       const response = await fetch("/api/checkout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ priceId }),
//       });

//       const session = await response.json();

//       // Redirect to Stripe Checkout
//       const stripe = await getStripe();
//       if (!stripe) {
//         throw new Error("Stripe.js failed to load.");
//       }

//       const result = await stripe.redirectToCheckout({
//         sessionId: session.id,
//       });

//       if (result.error) {
//         throw result.error;
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button
//       onClick={handleCheckout}
//       disabled={loading}
//       className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
//     >
//       {loading ? "Processing..." : "Choisir ce plan"}
//     </button>
//   );
// }

"use client";

import { useState } from "react";
import getStripe from "@/utils/get-stripe";
import { useAuth } from "@/hooks/auth"; // Import the useAuth hook
import { useRouter } from "next/navigation"; // Import useRouter

interface StripeCheckoutProps {
  priceId: string;
}

export default function StripeCheckout({ priceId }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // Get the user from the useAuth hook
  const router = useRouter(); // Initialize useRouter

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Check if the user is logged in
      if (!user) {
        // Redirect to the signup page if the user is not logged in
        router.push("/signup");
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
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
    >
      {loading ? "Processing..." : "Choisir ce plan"}
    </button>
  );
}
