import { Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "URSSAF Tracker - Simplifiez vos déclarations d'auto-entrepreneur",
  description:
    "Gérez facilement vos déclarations URSSAF en tant qu'auto-entrepreneur avec notre plateforme intuitive et puissante.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-white text-white`}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow relative overflow-hidden">
              <div className="relative z-10">{children}</div>
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
