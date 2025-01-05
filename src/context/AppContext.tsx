"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // Import useRouter
import { createClient } from "@/utils/supabase/client";
import {
  fetchClients as fetchClientsService,
  fetchPayments as fetchPaymentsService,
  addClient as addClientService,
  addPayment as addPaymentService,
  togglePaymentDeclared as togglePaymentDeclaredService,
  deletePayment as deletePaymentService,
} from "@/services/supabaseService";

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
  user: User | null; // Add user property
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
  const [user, setUser] = useState<User | null>(null); // Add user state
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null); // Set user state

      if (session) {
        await fetchClients(session.user.id);
        await fetchPayments(session.user.id);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user ?? null); // Set user state
          if (session) {
            fetchClients(session.user.id);
            fetchPayments(session.user.id);
          }
        }
      );

      return () => {
        authListener?.subscription.unsubscribe();
      };
    };

    initialize();
  }, []);

  async function fetchClients(userId: string) {
    try {
      const data = await fetchClientsService(userId);
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  async function fetchPayments(userId: string) {
    try {
      const data = await fetchPaymentsService(userId);
      setPayments(
        data.map((payment) => ({
          ...payment,
          clientId: payment.client_id,
          date: payment.date,
        }))
      );
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  }

  const addClient = async (name: string) => {
    if (session) {
      try {
        const client = await addClientService(session.user.id, name);
        setClients((prev) => [...prev, client]);
      } catch (error) {
        console.error("Error adding client:", error);
      }
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
    if (session) {
      try {
        const payment = await addPaymentService(
          session.user.id,
          clientId,
          amount,
          date
        );
        setPayments((prev) => [
          ...prev,
          {
            ...payment,
            clientId: payment.client_id,
            date: payment.date,
          },
        ]);
      } catch (error) {
        console.error("Error adding payment:", error);
      }
    }
  };

  const togglePaymentDeclared = async (paymentId: string) => {
    if (session) {
      try {
        await togglePaymentDeclaredService(
          session.user.id,
          paymentId,
          !payments.find((p) => p.id === paymentId)?.declared
        );
        setPayments((prev) =>
          prev.map((p) =>
            p.id === paymentId ? { ...p, declared: !p.declared } : p
          )
        );
      } catch (error) {
        console.error("Error updating payment:", error);
      }
    }
  };

  const deletePayment = async (paymentId: string) => {
    if (session) {
      try {
        await deletePaymentService(session.user.id, paymentId);
        setPayments((prev) => prev.filter((p) => p.id !== paymentId));
      } catch (error) {
        console.error("Error deleting payment:", error);
      }
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null); // Clear user state
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
        user, // Provide user in context
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
