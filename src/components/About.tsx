import { Sparkles, Quote, Github, Linkedin, Mail } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-medium text-sm uppercase tracking-wider">Qui suis-je ?</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
            La version courte
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main content - 3 columns */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quote */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-indigo-200" />
              <blockquote className="text-2xl font-medium text-slate-700 leading-relaxed pl-8 italic">
                "Je crois que les meilleures histoires et les meilleurs outils
                naissent de la même curiosité : comprendre ce qui fait de nous des humains."
              </blockquote>
            </div>

            {/* Story */}
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed">
                J'ai passé des années à écrire du code dans l'ombre des grandes entreprises.
                Aujourd'hui, je construis mes propres projets — des romans qui questionnent
                notre relation aux machines, et des outils IA qui libèrent du temps pour ce qui compte vraiment.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed">
                Ce qui me fascine ? <strong className="text-slate-900">L'émergence.</strong> Ce moment où un système
                devient plus que la somme de ses parties. Que ce soit une IA qui surprend
                par sa réponse, ou un personnage qui prend vie sur la page.
              </p>

              <p className="text-lg text-slate-600 leading-relaxed">
                Je suis en transition vers l'indépendance. Mon pari : utiliser l'IA non pas
                pour remplacer la créativité humaine, mais pour l'amplifier. Écrire plus.
                Créer plus. Aider d'autres à faire de même.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <h4 className="font-bold text-slate-900">Curiosité</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Chaque projet commence par une question. "Et si...?"
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <h4 className="font-bold text-slate-900">Pragmatisme</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Les solutions élégantes sont celles qui fonctionnent.
                </p>
              </div>

              <div className="bg-violet-50 rounded-xl p-5 border border-violet-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-violet-500" />
                  <h4 className="font-bold text-slate-900">Transmission</h4>
                </div>
                <p className="text-sm text-slate-600">
                  Ce qu'on apprend n'a de valeur que si on le partage.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills card */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Ce que je maîtrise</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Écriture</p>
                  <div className="flex flex-wrap gap-2">
                    {['Science-Fiction', 'Cyberpunk', 'Worldbuilding', 'Scénarios'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Développement</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'TypeScript', 'React', 'FastAPI', 'SQL'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Intelligence Artificielle</p>
                  <div className="flex flex-wrap gap-2">
                    {['LangChain', 'Claude API', 'OpenAI', 'RAG', 'Agents LLM'].map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Current status */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-xl p-6 text-white">
              <h3 className="font-bold mb-3">Statut actuel</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-slate-300 text-sm">Ouvert aux projets</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Je prends des missions de développement IA et d'automatisation.
                Si vous avez un projet intéressant, parlons-en.
              </p>
            </div>

            {/* Social links */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Me retrouver</h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/phuetz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>github.com/phuetz</span>
                </a>
                <a
                  href="mailto:contact@patrice-huetz.fr"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>contact@patrice-huetz.fr</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
