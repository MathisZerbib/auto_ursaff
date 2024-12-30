import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ClientChipProps {
  client: { id: string; name: string };
  isSelected: boolean;
  onClick: () => void;
}

export function ClientChip({ client, isSelected, onClick }: ClientChipProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 cursor-pointer transition-colors duration-200 ${
        isSelected
          ? 'bg-purple-600 text-white'
          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
      }`}
    >
      {client.name}
      {isSelected && (
        <Check className="ml-1 h-4 w-4" />
      )}
    </motion.div>
  );
}

