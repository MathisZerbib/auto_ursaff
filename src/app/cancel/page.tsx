import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Paiement Annulé
        </h1>
        <p className="text-gray-700 mb-6">
          Votre paiement a été annulé. Vous pouvez réessayer à tout moment.
        </p>
        <div className="flex justify-center space-x-4">
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
