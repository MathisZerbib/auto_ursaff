import { motion } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";

export function SolidButton({ children, className, ...props }: ButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        {...props}
        className={`bg-purple-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-purple-700 transition-all duration-300 ${className}`}
      >
        {children}
      </Button>
    </motion.div>
  );
}
