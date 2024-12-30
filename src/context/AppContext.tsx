"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // Import useRouter
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

interface Client {
  id: string;
  name: string;
}

interface Payment {
  id: string;
  clientId: string;
  amount: number;
  date: string;
  declared: boolean;
}

interface AppContextType {
  clients: Client[];
  payments: Payment[];
  session: Session | null;
  addClient: (name: string) => Promise<void>;
  updateClient: (clientId: string, name: string) => Promise<void>;
  deleteClient: (clientId: string) => Promise<void>;
  addPayment: (clientId: string, amount: number, date: string) => Promise<void>;
  togglePaymentDeclared: (paymentId: string) => Promise<void>;
  deletePayment: (paymentId: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const initialize = async () => {
      await fetchClients();
      await fetchPayments();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    initialize();
  }, []);

  async function fetchClients() {
    const { data, error } = await supabase.from("clients").select("*");
    if (error) {
      console.error("Error fetching clients:", error);
    } else {
      setClients(data);
    }
  }

  async function fetchPayments() {
    const { data, error } = await supabase.from("payments").select("*");
    if (error) {
      console.error("Error fetching payments:", error);
    } else {
      setPayments(
        data.map((payment) => ({
          ...payment,
          clientId: payment.client_id,
          date: payment.date,
        }))
      );
    }
  }

  const addClient = async (name: string) => {
    const { data, error } = await supabase
      .from("clients")
      .insert({ name })
      .select();
    if (error) {
      console.error("Error adding client:", error);
    } else if (data) {
      setClients((prev) => [...prev, data[0]]);
    }
  };
  const updateClient = async (clientId: string, name: string) => {
    const { data, error } = await supabase
      .from("clients")
      .update({ name })
      .eq("id", clientId)
      .select();
    if (error) {
      console.error("Error updating client:", error);
    } else if (data) {
      setClients((prev) =>
        prev.map((c) => (c.id === clientId ? { ...c, name } : c))
      );
    }
  };

  const deleteClient = async (clientId: string) => {
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", clientId);
    if (error) {
      console.error("Error deleting client:", error);
    } else {
      setClients((prev) => prev.filter((c) => c.id !== clientId));
    }
  };

  const addPayment = async (clientId: string, amount: number, date: string) => {
    const { data, error } = await supabase
      .from("payments")
      .insert({ client_id: clientId, amount, date })
      .select();
    if (error) {
      console.error("Error adding payment:", error);
    } else if (data) {
      setPayments((prev) => [
        ...prev,
        {
          ...data[0],
          clientId: data[0].client_id,
          date: data[0].date,
        },
      ]);
    }
  };

  const togglePaymentDeclared = async (paymentId: string) => {
    const payment = payments.find((p) => p.id === paymentId);
    if (!payment) return;

    const { data, error } = await supabase
      .from("payments")
      .update({ declared: !payment.declared })
      .eq("id", paymentId)
      .select();

    if (error) {
      console.error("Error updating payment:", error);
    } else if (data) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === paymentId ? { ...p, declared: !p.declared } : p
        )
      );
    }
  };

  const deletePayment = async (paymentId: string) => {
    const { error } = await supabase
      .from("payments")
      .delete()
      .eq("id", paymentId);

    if (error) {
      console.error("Error deleting payment:", error);
    } else {
      setPayments((prev) => prev.filter((p) => p.id !== paymentId));
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to home page
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        clients,
        payments,
        session,
        addClient,
        updateClient,
        deleteClient,
        addPayment,
        togglePaymentDeclared,
        deletePayment,
        logout,
        toggleTheme,
        isDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
