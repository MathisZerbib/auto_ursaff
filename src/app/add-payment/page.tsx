import { PaymentForm } from "@/components/PaymentForm";
import Navigation from "@/components/Navigation";

export default function AddPayment() {
  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <Navigation />
      {/* // space  */}
      <div className="h-24" />
      <h1 className="text-3xl font-bold mb-6">Ajouter un paiement</h1>
      <PaymentForm />
    </div>
  );
}
