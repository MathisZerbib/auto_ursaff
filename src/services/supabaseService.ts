import { supabase } from "../utils/supabase/client";

export const fetchClients = async (userId: string) => {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(`Error fetching clients: ${error.message}`);
  }
  return data;
};

export const fetchPayments = async (userId: string) => {
  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    throw new Error(`Error fetching payments: ${error.message}`);
  }
  return data;
};

export const addClient = async (userId: string, name: string) => {
  const { data, error } = await supabase
    .from("clients")
    .insert({ user_id: userId, name })
    .select();
  if (error) {
    throw new Error(`Error adding client: ${error.message}`);
  }
  return data[0];
};

export const addPayment = async (userId: string, clientId: string, amount: number, date: string) => {
  const { data, error } = await supabase
    .from("payments")
    .insert({ user_id: userId, client_id: clientId, amount, date })
    .select();
  if (error) {
    throw new Error(`Error adding payment: ${error.message}`);
  }
  return data[0];
};

export const togglePaymentDeclared = async (userId: string, paymentId: string, declared: boolean) => {
  const { data, error } = await supabase
    .from("payments")
    .update({ declared })
    .eq("id", paymentId)
    .eq("user_id", userId)
    .select();
  if (error) {
    throw new Error(`Error updating payment: ${error.message}`);
  }
  return data[0];
};

export const deletePayment = async (userId: string, paymentId: string) => {
  const { error } = await supabase
    .from("payments")
    .delete()
    .eq("id", paymentId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(`Error deleting payment: ${error.message}`);
  }
};