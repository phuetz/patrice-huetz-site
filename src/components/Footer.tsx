import { Feather, Mail, Github, BookOpen, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Feather className="w-8 h-8 text-indigo-400" />
              <span className="text-xl font-bold text-white">Patrice Huetz</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Auteur de science-fiction et développeur spécialisé en Intelligence Artificielle.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Activités</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Romans SF & Cyberpunk
              </li>
              <li className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Développement IA & Python
              </li>
              <li>Agents LLM & Automatisation</li>
              <li>Formation & Consulting</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contact@patrice-huetz.fr
              </li>
              <li>
                <a
                  href="https://github.com/phuetz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  github.com/phuetz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Patrice Huetz. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
