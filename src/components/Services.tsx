import { Bot, Code2, Database, Workflow, Lightbulb, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: 'Agents IA & LLM',
    description: 'Conception et développement d\'agents intelligents basés sur les LLM (GPT, Claude). Automatisation de tâches complexes, assistants conversationnels, RAG.',
  },
  {
    icon: Code2,
    title: 'Développement Python',
    description: 'Applications backend, APIs REST, scripts d\'automatisation, intégration de services. Code propre, testé et documenté.',
  },
  {
    icon: Database,
    title: 'Intégration & APIs',
    description: 'Connexion de vos systèmes existants avec des APIs tierces (OpenAI, Anthropic, etc.). Mise en place de pipelines de données.',
  },
  {
    icon: Workflow,
    title: 'Automatisation',
    description: 'Automatisation des processus métier répétitifs grâce à l\'IA. Réduction des coûts et gain de productivité.',
  },
  {
    icon: Lightbulb,
    title: 'Conseil & Audit IA',
    description: 'Évaluation de vos besoins en IA, recommandations stratégiques, choix des technologies adaptées à votre contexte.',
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    description: 'Formation de vos équipes aux outils IA modernes : prompt engineering, utilisation des LLM, bonnes pratiques.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Services IT
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Expertise en Intelligence Artificielle et développement Python pour transformer vos idées en solutions concrètes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 rounded-xl p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-emerald-500 group"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 lg:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Un projet en tête ?
            </h3>
            <p className="text-emerald-100 text-lg mb-8">
              Discutons de vos besoins en IA et développement. Premier échange gratuit et sans engagement.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-semibold px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all duration-300"
            >
              Prendre contact
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
