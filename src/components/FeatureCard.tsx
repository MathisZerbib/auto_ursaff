import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-gray-200 rounded-xl p-6 shadow-xl border border-gray-500 cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex justify-center items-center mb-4"
      >
        <div className="w-16 h-16 rounded-full bg-white flex justify-center items-center">
          <Icon className="w-12 h-12 text-gray-900" />
        </div>
      </motion.div>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}
