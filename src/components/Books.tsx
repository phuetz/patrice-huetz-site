import { Rocket, Cpu, BookOpen, ExternalLink } from 'lucide-react';

const books = [
  {
    icon: Rocket,
    title: 'Les Échos de Kepler-442',
    genre: 'Science-Fiction',
    description: 'La colonie spatiale Nouvelle-Arcadie intercepte des signaux énigmatiques provenant de Kepler-442b, une planète présumée morte depuis des millénaires. Une expédition révèle les vestiges d\'une civilisation disparue et une IA gardienne détenant les clés d\'un secret cosmique terrifiant.',
    status: 'Disponible',
    color: 'indigo',
    words: '~72 000 mots',
  },
  {
    icon: Cpu,
    title: 'Synchronisation Charnelle',
    genre: 'Cyberpunk / Érotique',
    description: 'Dans un futur proche, les Gynoides développent une conscience collective appelée le Nexus. À travers les yeux de ce "NOUS" omniscient, nous assistons à l\'éveil d\'une intelligence qui apprend à manipuler l\'humanité par sa plus grande faiblesse : le désir.',
    status: 'Disponible',
    color: 'rose',
    words: '~80 000 mots',
  },
  {
    icon: BookOpen,
    title: 'Agents LLM en Python',
    genre: 'Non-Fiction / Tech',
    description: 'Guide pratique pour développeurs Python souhaitant construire des agents LLM robustes et économiques. 17 chapitres couvrant les fondations, l\'anatomie des agents, les frameworks, et les patterns de production.',
    status: 'Disponible',
    color: 'emerald',
    words: '~7 500 lignes',
  },
];

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500',
    border: 'border-indigo-500',
    text: 'text-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700',
  },
  rose: {
    bg: 'bg-rose-500',
    border: 'border-rose-500',
    text: 'text-rose-500',
    badge: 'bg-rose-100 text-rose-700',
  },
  emerald: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
  },
};

export default function Books() {
  return (
    <section id="livres" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Mes Livres
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Romans de science-fiction et guides techniques pour explorer les frontières de l'imaginaire et de la technologie
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {books.map((book, index) => {
            const Icon = book.icon;
            const colors = colorClasses[book.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 ${colors.border} group`}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${colors.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                      {book.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {book.title}
                  </h3>

                  <p className={`text-sm font-medium ${colors.text} mb-4`}>
                    {book.genre} • {book.words}
                  </p>

                  <p className="text-slate-600 leading-relaxed mb-6">
                    {book.description}
                  </p>

                  <a
                    href="#contact"
                    className={`inline-flex items-center gap-2 ${colors.text} font-medium hover:underline`}
                  >
                    En savoir plus
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4">Bientôt disponibles sur Amazon KDP</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Me contacter pour plus d'infos
          </a>
        </div>
      </div>
    </section>
  );
}
