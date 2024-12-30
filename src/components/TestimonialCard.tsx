import { motion } from "framer-motion";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  image: string;
  note: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  text,
  image,
  note,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl p-6 shadow-xl border border-gray-200 flex flex-col"
  >
    <div className="flex items-center mb-4">
      <Image
        src={image}
        alt={name}
        width={60}
        height={60}
        className="rounded-full mr-4"
      />
      <div>
        <p className="font-bold text-black">{name}</p>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
    <p className="mb-4 text-gray-700 flex-grow">{text}</p>
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-yellow-400">
          {i < note ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  </motion.div>
);

export default TestimonialCard;
