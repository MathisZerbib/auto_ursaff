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
import { ClientChip } from "./ClientChip";

export function PaymentForm() {
  const [amount, setAmount] = useState("");
  const [selectedClientId, setSelectedClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [date, setDate] = useState<Date>();
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const router = useRouter();
  const { clients, addClient, addPayment } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClientId && amount && date) {
      await addPayment(
        selectedClientId,
        parseFloat(amount),
        date.toISOString()
      );
      router.push("/dashboard");
    }
  };

  const handleAddNewClient = async () => {
    if (newClientName) {
      await addClient(newClientName);
      setNewClientName("");
      setIsAddingNewClient(false);
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
      >
        Enregistrer
      </Button>
    </motion.form>
  );
}
