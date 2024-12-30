"use client";

import { useAppContext } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { SolidButton } from "@/components/SolidButton";
import { format, parse, startOfYear, endOfYear } from "date-fns";
import { fr } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const { payments, clients, togglePaymentDeclared, deletePayment } =
    useAppContext();
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [filteredPayments, setFilteredPayments] = useState(payments);

  useEffect(() => {
    if (yearFilter === "all") {
      setFilteredPayments(payments);
    } else {
      const filtered = payments.filter((payment) => {
        const paymentDate = new Date(payment.date);
        const filterYear = parseInt(yearFilter);
        return (
          paymentDate >= startOfYear(new Date(filterYear, 0, 1)) &&
          paymentDate <= endOfYear(new Date(filterYear, 0, 1))
        );
      });
      setFilteredPayments(filtered);
    }
  }, [yearFilter, payments]);

  const totalRevenue = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const averagePayment = totalRevenue / filteredPayments.length || 0;
  const declaredRevenue = filteredPayments
    .filter((p) => p.declared)
    .reduce((sum, payment) => sum + payment.amount, 0);

  const paymentsByMonth = filteredPayments.reduce((acc, payment) => {
    const date = new Date(payment.date);
    const monthYear = format(date, "MM/yyyy");
    acc[monthYear] = (acc[monthYear] || 0) + payment.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(paymentsByMonth)
    .sort(
      ([a], [b]) =>
        parse(a, "MM/yyyy", new Date()).getTime() -
        parse(b, "MM/yyyy", new Date()).getTime()
    )
    .map(([month, amount]) => ({ month, amount }));

  const years = Array.from(
    new Set(payments.map((payment) => new Date(payment.date).getFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="container mx-auto px-4 py-8 bg-white text-black">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-black"
      >
        Tableau de bord
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gray-100 border border-gray-300">
            <CardHeader>
              <CardTitle className="text-black">Revenus totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">
                {totalRevenue.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-100 border border-gray-300">
            <CardHeader>
              <CardTitle className="text-black">Paiement moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">
                {averagePayment.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-100 border border-gray-300">
            <CardHeader>
              <CardTitle className="text-black">Revenus déclarés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-black">
                {declaredRevenue.toFixed(2)} €
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300 mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Revenus par mois</h2>
          <Select onValueChange={setYearFilter} value={yearFilter}>
            <SelectTrigger className="w-[180px] bg-gray-200 text-black border-gray-300">
              <SelectValue placeholder="Filtrer par année" />
            </SelectTrigger>
            <SelectContent className="bg-gray-200 text-black border-gray-300">
              <SelectItem value="all">Toutes les années</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#000000" />
            <YAxis stroke="#000000" />
            <Tooltip />
            <Bar dataKey="amount" fill="url(#colorUv)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-100 p-6 rounded-lg shadow-lg border border-gray-300"
      >
        <h2 className="text-2xl font-bold mb-4 text-black">
          Liste des paiements
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 px-4 text-black">Date</th>
                <th className="py-2 px-4 text-black">Client</th>
                <th className="py-2 px-4 text-black">Montant</th>
                <th className="py-2 px-4 text-black">Statut</th>
                <th className="py-2 px-4 text-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => {
                const client = clients.find((c) => c.id === payment.clientId);
                return (
                  <tr key={payment.id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-700">
                      {format(new Date(payment.date), "dd MMMM yyyy", {
                        locale: fr,
                      })}
                    </td>
                    <td className="py-2 px-4 text-gray-700">{client?.name}</td>
                    <td className="py-2 px-4 text-gray-700">
                      {payment.amount.toFixed(2)} €
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          payment.declared
                            ? "bg-green-500 text-white"
                            : "bg-yellow-500 text-gray-900"
                        }`}
                      >
                        {payment.declared ? "Déclaré" : "Non déclaré"}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <SolidButton
                          onClick={() => togglePaymentDeclared(payment.id)}
                          className={`text-xs ${
                            payment.declared
                              ? "bg-yellow-500 hover:bg-yellow-600"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {payment.declared
                            ? "Annuler déclaration"
                            : "Marquer comme déclaré"}
                        </SolidButton>
                        <SolidButton
                          onClick={() => deletePayment(payment.id)}
                          className="text-xs bg-red-500 hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </SolidButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
