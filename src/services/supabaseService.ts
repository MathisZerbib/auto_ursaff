// filepath: /Users/zer/Documents/lab/perso/auto_ursaff/src/services/supabaseService.ts
import { supabase } from "../utils/supabase/client";

export const fetchClients = async () => {
  const { data, error } = await supabase.from("clients").select("*");
  if (error) {
    throw new Error(`Error fetching clients: ${error.message}`);
  }
  return data;
};

export const fetchPayments = async () => {
  const { data, error } = await supabase.from("payments").select("*");
  if (error) {
    throw new Error(`Error fetching payments: ${error.message}`);
  }
  return data;
};

export const addClient = async (name: string) => {
  const { data, error } = await supabase
    .from("clients")
    .insert({ name })
    .select();
  if (error) {
    throw new Error(`Error adding client: ${error.message}`);
  }
  return data[0];
};

export const addPayment = async (clientId: string, amount: number, date: string) => {
  const { data, error } = await supabase
    .from("payments")
    .insert({ client_id: clientId, amount, date })
    .select();
  if (error) {
    throw new Error(`Error adding payment: ${error.message}`);
  }
  return data[0];
};

export const togglePaymentDeclared = async (paymentId: string, declared: boolean) => {
  const { data, error } = await supabase
    .from("payments")
    .update({ declared })
    .eq("id", paymentId)
    .select();
  if (error) {
    throw new Error(`Error updating payment: ${error.message}`);
  }
  return data[0];
};

export const deletePayment = async (paymentId: string) => {
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", paymentId);
  if (error) {
    throw new Error(`Error deleting payment: ${error.message}`);
  }
};