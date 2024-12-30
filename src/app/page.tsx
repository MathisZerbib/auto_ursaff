"use client";

import { motion } from "framer-motion";
import { SolidButton } from "@/components/SolidButton";
import { FeatureCard } from "@/components/FeatureCard";
import {
  Calculator,
  BarChartIcon as ChartBar,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import TestimonialCard from "@/components/TestimonialCard";

// Testimonial data
const testimonials = [
  {
    name: "Sophie L.",
    role: "Graphiste freelance",
    text: "URSSAF Tracker a révolutionné ma gestion administrative ! Je peux maintenant me concentrer sur mon travail créatif sans stress.",
    image: "/images/sophie-l.jpg",
    note: 5,
  },
  {
    name: "Thomas M.",
    role: "Consultant en marketing digital",
    text: "Grâce à cette application, je gagne un temps précieux chaque mois. Les calculs automatiques et les rappels sont d'une aide inestimable.",
    image: "/images/thomas-m.jpg",
    note: 5,
  },
  {
    name: "Julie D.",
    role: "Développeuse web indépendante",
    text: "L'interface intuitive et le support client réactif font toute la différence. Je recommande URSSAF Tracker à tous mes collègues freelances !",
    image: "/images/julie-d.jpg",
    note: 5,
  },
  {
    name: "Alexandre P.",
    role: "Photographe auto-entrepreneur",
    text: "Depuis que j'utilise URSSAF Tracker, mes déclarations sont un jeu d'enfant. C'est un outil indispensable pour tout auto-entrepreneur.",
    image: "/images/alexandre-p.jpg",
    note: 4,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black mt-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 text-black"
        >
          Simplifiez vos déclarations URSSAF
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl mb-8 max-w-2xl text-gray-700"
        >
          Gérez vos revenus d&apos;auto-entrepreneur en toute simplicité avec
          notre plateforme intuitive et puissante.
        </motion.p>
        <SolidButton>
          <Link href="/signup">Commencer gratuitement</Link>
        </SolidButton>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Fonctionnalités innovantes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={Calculator}
            title="Calcul automatique"
            description="Estimez vos cotisations en temps réel"
          />
          <FeatureCard
            icon={ChartBar}
            title="Tableaux de bord"
            description="Visualisez vos revenus et vos déclarations"
          />
          <FeatureCard
            icon={Clock}
            title="Rappels intelligents"
            description="Ne manquez plus jamais une échéance"
          />
          <FeatureCard
            icon={Shield}
            title="Sécurité avancée"
            description="Vos données sont cryptées et protégées"
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Ce que disent nos utilisateurs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
        <div className="text-center mt-12">
          <SolidButton>
            <Link href="/testimonials">Voir plus de témoignages</Link>
          </SolidButton>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container py-20 bg-gray-100 mx-auto px-4 mb-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Tarifs simples et transparents
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Gratuit",
              price: "0€",
              features: [
                "Jusqu'à 10 déclarations/an",
                "Calcul des cotisations",
                "Rappels basiques",
              ],
            },
            {
              name: "Pro",
              price: "9,99€/mois",
              features: [
                "Déclarations illimitées",
                "Tableaux de bord avancés",
                "Support prioritaire",
              ],
            },
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-xl w-full md:w-80 border border-gray-300"
            >
              <h3 className="text-2xl font-bold mb-4 text-black">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold mb-6 text-black">{plan.price}</p>
              <ul className="mb-6 text-gray-700">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <SolidButton className="w-full">Choisir ce plan</SolidButton>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
