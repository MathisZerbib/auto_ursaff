import { supabase } from "../utils/supabase/client";

// Utility function to count records for a specific user in a table
export const countUserRecords = async (tableName: string, userId: string): Promise<number> => {
  const { count, error } = await supabase
    .from(tableName)
    .select("*", { count: "exact", head: true }) // Use 'exact' count and 'head' to only return the count
    .eq("user_id", userId);

  if (error) {
    throw new Error(`Error counting records in ${tableName}: ${error.message}`);
  }

  return count || 0; // Return 0 if count is null
};

// Check if a user has more than 10 records in a table
export const hasMoreThan10Records = async (tableName: string, userId: string): Promise<boolean> => {
  const recordCount = await countUserRecords(tableName, userId);
  return recordCount > 10;
};

// Fetch all clients for a user
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

// Fetch all payments for a user
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

// Add a new client for a user (with record limit check)
export const addClient = async (userId: string, name: string) => {
  // Check if the user has more than 10 clients
  if (await hasMoreThan10Records("clients", userId)) {
    throw new Error("User has exceeded the maximum number of clients (10).");
  }

  // Proceed to add the client
  const { data, error } = await supabase
    .from("clients")
    .insert({ user_id: userId, name })
    .select();

  if (error) {
    throw new Error(`Error adding client: ${error.message}`);
  }

  return data[0];
};

// Add a new payment for a user (with record limit check)
export const addPayment = async (userId: string, clientId: string, amount: number, date: string) => {
  // Check if the user has more than 10 payments
  if (await hasMoreThan10Records("payments", userId)) {
    throw new Error("User has exceeded the maximum number of payments (10).");
  }

  // Proceed to add the payment
  const { data, error } = await supabase
    .from("payments")
    .insert({ user_id: userId, client_id: clientId, amount, date })
    .select();

  if (error) {
    throw new Error(`Error adding payment: ${error.message}`);
  }

  return data[0];
};

// Toggle the 'declared' status of a payment
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

// Delete a payment for a user
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