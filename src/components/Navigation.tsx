import { useState } from 'react';
import { Feather, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Feather className="w-8 h-8 text-indigo-400" />
            <span className="text-xl font-bold">Patrice Huetz</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a
                href="#accueil"
                className="hover:text-indigo-400 transition-colors duration-300 font-medium"
              >
                Accueil
              </a>
              <a
                href="#livres"
                className="hover:text-indigo-400 transition-colors duration-300 font-medium"
              >
                Livres
              </a>
              <a
                href="#services"
                className="hover:text-indigo-400 transition-colors duration-300 font-medium"
              >
                Services IT
              </a>
              <a
                href="#apropos"
                className="hover:text-indigo-400 transition-colors duration-300 font-medium"
              >
                À propos
              </a>
              <a
                href="#contact"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-indigo-400 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-800">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href="#accueil"
              className="block hover:text-indigo-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </a>
            <a
              href="#livres"
              className="block hover:text-indigo-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Livres
            </a>
            <a
              href="#services"
              className="block hover:text-indigo-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              Services IT
            </a>
            <a
              href="#apropos"
              className="block hover:text-indigo-400 transition-colors duration-300 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              À propos
            </a>
            <a
              href="#contact"
              className="block bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
