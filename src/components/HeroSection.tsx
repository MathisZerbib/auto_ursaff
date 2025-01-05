import { motion } from "framer-motion";
import { SolidButton } from "@/components/SolidButton";
import Link from "next/link";

export default function HeroSection() {
  return (
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
  );
}
