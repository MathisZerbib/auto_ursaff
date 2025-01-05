import { motion } from "framer-motion";
import { SolidButton } from "@/components/SolidButton";
import StripeCheckout from "@/components/StripeCheckout";
import { useAuth } from "@/hooks/auth"; // Import the useAuth hook
import { useRouter } from "next/navigation"; // Import useRouter

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  priceId?: string;
  isFreeTier?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Gratuit",
    price: "0€",
    features: [
      "Jusqu'à 10 déclarations/an",
      "Calcul des cotisations",
      "Rappels basiques",
    ],
    isFreeTier: true,
  },
  {
    name: "Pro",
    price: "9,99€/mois",
    features: [
      "Déclarations illimitées",
      "Tableaux de bord avancés",
      "Support prioritaire",
    ],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
  },
];

export default function PricingSection() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <section className="container py-20 bg-gray-100 mx-auto px-4 mb-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-black">
        Tarifs simples et transparents
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl p-8 shadow-xl w-full md:w-80 border border-gray-300"
          >
            <h3 className="text-2xl font-bold mb-4 text-black">{plan.name}</h3>
            <p className="text-4xl font-bold mb-6 text-black">{plan.price}</p>
            <ul className="mb-6 text-gray-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  ✓ {feature}
                </li>
              ))}
            </ul>
            {plan.priceId ? (
              <StripeCheckout
                priceId={plan.priceId}
                isFreeTier={plan.isFreeTier}
              />
            ) : (
              <SolidButton
                className="w-full"
                onClick={() => router.push("/signup")}
              >
                {user ? "Plan gratuit" : "Inscription gratuite"}
              </SolidButton>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
