import { Bot, Zap, Puzzle, Brain, MessageSquare, Rocket, BookOpen, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Bot,
    title: 'Agents IA sur mesure',
    description: 'Des assistants qui pensent, décident et agissent. Pas des chatbots qui récitent — des agents qui résolvent.',
    example: 'Analyste financier automatisé, assistant de recherche, agent de support intelligent',
  },
  {
    icon: Zap,
    title: 'Automatisation intelligente',
    description: 'Vos processus répétitifs méritent mieux que votre temps. Laissez l\'IA s\'en occuper pendant que vous créez.',
    example: 'Traitement de documents, extraction de données, workflows automatisés',
  },
  {
    icon: Puzzle,
    title: 'Intégration d\'IA',
    description: 'Connecter Claude ou GPT à vos outils existants. L\'IA ne remplace pas vos systèmes, elle les augmente.',
    example: 'APIs sur mesure, plugins, intégration CRM/ERP',
  },
  {
    icon: Brain,
    title: 'RAG & Mémoire',
    description: 'Vos documents deviennent une base de connaissances interrogeable. L\'IA qui connaît vraiment votre métier.',
    example: 'Documentation interne, FAQ intelligente, assistant expert',
  },
  {
    icon: MessageSquare,
    title: 'Conseil & Stratégie IA',
    description: 'Avant de coder, on réfléchit. Quel problème résout-on vraiment ? Quelle approche a du sens pour vous ?',
    example: 'Audit de faisabilité, choix technologiques, roadmap IA',
  },
  {
    icon: Rocket,
    title: 'Prototypage rapide',
    description: 'Une idée le lundi, un prototype le vendredi. Tester vite, apprendre vite, itérer vite.',
    example: 'POC en une semaine, MVP en un mois',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-medium text-sm uppercase tracking-wider">Ce que je construis</span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">
            L'IA au service de vos idées
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Je ne vends pas de l'IA pour le buzz. Je résous des problèmes concrets
            avec les bons outils — parfois c'est de l'IA, parfois c'est du bon sens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-emerald-400 group relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>

                  <p className="text-xs text-slate-400 italic">
                    Ex: {service.example}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Site Auteur Pro */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl transform -rotate-1"></div>
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-8 h-8" />
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">AUTEURS</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-3">
                    Site Auteur Pro en 72h
                  </h3>
                  <p className="text-indigo-100 text-lg mb-4">
                    Votre vitrine professionnelle pour présenter vos livres. Design moderne,
                    responsive, optimisé SEO. De 1 à 100+ livres.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Livraison 72h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>À partir de 199€</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-3">
                  <Link
                    to="/commande-site"
                    className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg"
                  >
                    Commander mon site
                    <span className="text-xl">→</span>
                  </Link>
                  <p className="text-xs text-indigo-200 text-center">3 packs : Starter, Catalogue, Pro</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section IA */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl transform rotate-1"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                    Vous avez un projet flou ?
                  </h3>
                  <p className="text-emerald-100 text-lg">
                    Parfait. C'est là que je suis le plus utile. On clarifie ensemble,
                    on identifie ce qui a vraiment de la valeur, et on construit.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all duration-300 shadow-lg"
                  >
                    Discutons-en
                    <span className="text-xl">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Technologies que j'utilise au quotidien</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Python', 'LangChain', 'Claude API', 'OpenAI', 'FastAPI', 'React', 'PostgreSQL', 'Docker'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
