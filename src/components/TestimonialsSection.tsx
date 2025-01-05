import TestimonialCard from "@/components/TestimonialCard";
import { SolidButton } from "@/components/SolidButton";
import Link from "next/link";

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

export default function TestimonialsSection() {
  return (
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
  );
}
