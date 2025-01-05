import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Paiement Réussi !
        </h1>
        <p className="text-gray-700 mb-6">
          Merci pour votre abonnement. Votre paiement a été effectué avec
          succès.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition">
              Aller au Tableau de Bord
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition">
              Retour
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
