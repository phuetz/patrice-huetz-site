import { Calendar, Clock, ArrowRight, Bot, BookOpen, Lightbulb } from 'lucide-react';

const articles = [
  {
    icon: Bot,
    title: 'Comment j\'ai écrit un roman avec Claude',
    excerpt: 'Retour d\'expérience sur l\'utilisation de l\'IA comme assistant d\'écriture. Méthodologie, prompts, et leçons apprises après 80 000 mots.',
    category: 'IA & Écriture',
    date: '2024-12-20',
    readTime: '8 min',
    color: 'indigo',
    slug: 'ecrire-roman-avec-claude',
  },
  {
    icon: Lightbulb,
    title: 'Agents LLM : Au-delà du chatbot',
    excerpt: 'Les agents autonomes représentent la prochaine évolution de l\'IA. Comprendre leurs architectures et leurs cas d\'usage concrets.',
    category: 'Tech',
    date: '2024-12-15',
    readTime: '6 min',
    color: 'emerald',
    slug: 'agents-llm-au-dela-chatbot',
  },
  {
    icon: BookOpen,
    title: 'Construire un univers de SF cohérent',
    excerpt: 'Les techniques de worldbuilding pour créer un univers de science-fiction crédible et immersif. Exemples tirés de Kepler-442.',
    category: 'Écriture',
    date: '2024-12-10',
    readTime: '10 min',
    color: 'violet',
    slug: 'construire-univers-sf-coherent',
  },
];

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500',
    text: 'text-indigo-500',
    hover: 'group-hover:text-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-500',
    hover: 'group-hover:text-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  violet: {
    bg: 'bg-violet-500',
    text: 'text-violet-500',
    hover: 'group-hover:text-violet-500',
    badge: 'bg-violet-100 text-violet-700',
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Blog
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Articles sur l'écriture, l'IA, et les coulisses de mes projets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            const colors = colorClasses[article.color as keyof typeof colorClasses];
            return (
              <article
                key={index}
                className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-slate-300"
              >
                {/* Header with icon */}
                <div className={`h-32 ${colors.bg} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <Icon className="w-16 h-16 text-white/90 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
                      {article.category}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg font-bold text-slate-900 mb-2 ${colors.hover} transition-colors`}>
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {article.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.date)}
                    </span>
                    <button
                      className={`flex items-center gap-1 text-sm font-medium ${colors.text} hover:underline`}
                      onClick={() => alert('Blog à venir !')}
                    >
                      Lire
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
            Blog en cours de développement
          </div>
        </div>
      </div>
    </section>
  );
}
