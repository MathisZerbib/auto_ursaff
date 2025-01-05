"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./DatePicker";
import { useAppContext } from "@/context/AppContext";
import { PlusCircle, X } from "lucide-react";
// import { hasMoreThan10Records } from "@/services/supabaseService"; // Import as named export
import { ClientChip } from "./ClientChip";

export function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [date, setDate] = useState<Date>();
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [error, setError] = useState<string | null>(null); // For displaying errors
  const router = useRouter();
  const { clients, addClient, addPayment, user } = useAppContext(); // Assume `user` contains the plan info

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // // Check if the user is on the free plan and has 10 or more payments
    // if (user?.plan === "free") {
    //   const hasExceededLimit = await hasMoreThan10Records("payments", user.id);
    //   if (hasExceededLimit) {
    //     setError(
    //       "You have exceeded the maximum number of payments on the free plan. Upgrade to add more."
    //     );
    //     return;
    //   }
    // }

    // Proceed to add the payment
    if (selectedClientId && amount && date) {
      try {
        await addPayment(
          selectedClientId,
          parseFloat(amount),
          date.toISOString()
        );
        router.push("/dashboard");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while adding the payment."
        );
      }
    }
  };

  const handleAddNewClient = async () => {
    if (newClientName) {
      try {
        await addClient(newClientName);
        setNewClientName("");
        setIsAddingNewClient(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while adding the client."
        );
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300"
    >
      {/* Display error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="client" className="text-black">
          Client
        </Label>
        <div className="flex flex-wrap">
          {clients.map((client) => (
            <ClientChip
              key={client.id}
              client={client}
              isSelected={client.id === selectedClientId}
              onClick={() => setSelectedClientId(client.id)}
            />
          ))}
        </div>
        <AnimatePresence>
          {isAddingNewClient ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-2 mt-2"
            >
              <Input
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                placeholder="Nom du nouveau client"
                className="bg-gray-200 text-black placeholder-gray-500"
              />
              <Button
                type="button"
                onClick={handleAddNewClient}
                className="bg-black hover:bg-gray-800 text-white"
              >
                Ajouter
              </Button>
              <Button
                type="button"
                onClick={() => setIsAddingNewClient(false)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingNewClient(true)}
                className="w-full mt-2 bg-gray-200 text-black hover:bg-gray-300"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Nouveau client
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-black">
          Montant
        </Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Entrez le montant"
          required
          className="bg-gray-200 text-black placeholder-gray-500"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-black">Date de paiement</Label>
        <DatePicker date={date} setDate={setDate} />
      </div>
      <Button
        type="submit"
        className="w-full bg-black hover:bg-gray-800 text-white"
        disabled={user?.plan === "free" && error !== null} // Disable button if on free plan and limit exceeded
      >
        Enregistrer
      </Button>
    </motion.form>
  );
}
