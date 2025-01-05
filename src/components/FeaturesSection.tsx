import { FeatureCard } from "@/components/FeatureCard";
import { Calculator, BarChartIcon as ChartBar, Clock, Shield } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-20 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12 text-black">
        Fonctionnalités innovantes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          icon={Calculator}
          title="Calcul automatique"
          description="Estimez vos cotisations en temps réel"
        />
        <FeatureCard
          icon={ChartBar}
          title="Tableaux de bord"
          description="Visualisez vos revenus et vos déclarations"
        />
        <FeatureCard
          icon={Clock}
          title="Rappels intelligents"
          description="Ne manquez plus jamais une échéance"
        />
        <FeatureCard
          icon={Shield}
          title="Sécurité avancée"
          description="Vos données sont cryptées et protégées"
        />
      </div>
    </section>
  );
}