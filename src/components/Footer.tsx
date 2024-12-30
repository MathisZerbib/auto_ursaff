import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-4 text-black">Produit</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Fonctionnalités
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-black">Entreprise</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Carrières
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-black">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Guide de démarrage
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Vidéos tutoriels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  API
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-black">Légal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Conditions d&apos;utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-black">
                  Mentions légales
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-500 mx-auto max-w-xs">
          <p className="text-gray-500 text-center">
            © 2024 Mathis Zerbib. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
