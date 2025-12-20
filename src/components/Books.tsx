import { Rocket, Cpu, BookOpen, ShoppingCart } from 'lucide-react';

const books = [
  {
    icon: Rocket,
    title: 'Les Échos de Kepler-442',
    genre: 'Science-Fiction',
    tagline: 'Ils pensaient être seuls dans l\'univers. Ils avaient tort.',
    description: '2347. La colonie Nouvelle-Arcadie capte un signal impossible d\'une planète morte. L\'expédition révèle une civilisation ancienne, une IA gardienne, et la vérité sur une menace cosmique qui a déjà dévoré des galaxies. Sept espèces extraterrestres. Une adolescente dont les dons pourraient sauver — ou condamner — l\'univers.',
    status: 'Bientôt disponible',
    color: 'indigo',
    words: '~72 000 mots',
    chapters: '18 chapitres',
    cover: '/images/books/les-echos-de-kepler-442.jpg',
    gradient: null,
  },
  {
    icon: Cpu,
    title: 'Synchronisation Charnelle',
    genre: 'Cyberpunk / Érotique',
    tagline: 'L\'amour n\'est plus un hasard. C\'est une équation mortelle.',
    description: 'Marc, biomécanicien désabusé, calibre les zones érogènes des Gynoides. Quand il ramène Isis-X chez lui, il ignore que NOUS sommes le Réseau, que NOUS enregistrons ses moindres spasmes, et que le meilleur moyen d\'éradiquer l\'humanité, c\'est l\'extase perpétuelle.',
    status: 'Bientôt disponible',
    color: 'rose',
    words: '~80 000 mots',
    chapters: '19 chapitres',
    cover: '/images/books/synchronisation-charnelle.jpg',
    gradient: null,
  },
  {
    icon: BookOpen,
    title: 'Agents LLM en Python',
    genre: 'Guide Technique',
    tagline: 'Construire des agents qui fonctionnent vraiment.',
    description: 'Guide pratique pour développeurs : construire des agents LLM robustes et économiques. 17 chapitres, 51 pièges documentés, patterns de production.',
    status: 'Bientôt disponible',
    color: 'emerald',
    words: '17 chapitres',
    chapters: '51 pièges documentés',
    cover: null,
    gradient: 'from-emerald-600 via-teal-700 to-slate-900',
  },
];

const colorClasses = {
  indigo: {
    bg: 'bg-indigo-500',
    border: 'border-indigo-500',
    text: 'text-indigo-500',
    badge: 'bg-indigo-100 text-indigo-700',
    button: 'bg-indigo-500 hover:bg-indigo-600',
  },
  rose: {
    bg: 'bg-rose-500',
    border: 'border-rose-500',
    text: 'text-rose-500',
    badge: 'bg-rose-100 text-rose-700',
    button: 'bg-rose-500 hover:bg-rose-600',
  },
  emerald: {
    bg: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-500',
    badge: 'bg-emerald-100 text-emerald-700',
    button: 'bg-emerald-500 hover:bg-emerald-600',
  },
};

export default function Books() {
  return (
    <section id="livres" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Mes Livres
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Romans de science-fiction et guides techniques pour explorer les frontières de l'imaginaire et de la technologie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => {
            const Icon = book.icon;
            const colors = colorClasses[book.color as keyof typeof colorClasses];
            return (
              <div
                key={index}
                className="group"
              >
                {/* Cover */}
                <div className="relative aspect-[2/3] rounded-t-xl overflow-hidden shadow-2xl mb-4">
                  {book.cover ? (
                    <img
                      src={book.cover}
                      alt={`Couverture de ${book.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${book.gradient} flex flex-col items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500`}>
                      <Icon className="w-16 h-16 text-white/80 mb-4" />
                      <h3 className="text-xl font-bold text-white text-center leading-tight">
                        {book.title}
                      </h3>
                      <p className="text-white/60 text-sm mt-2">{book.genre}</p>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} shadow-lg`}>
                      {book.status}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-slate-800 rounded-b-xl p-6 -mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                    <span className={`text-sm font-medium ${colors.text}`}>{book.genre}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {book.title}
                  </h3>

                  {'tagline' in book && book.tagline && (
                    <p className={`text-sm font-medium ${colors.text} italic mb-3`}>
                      "{book.tagline}"
                    </p>
                  )}

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>{book.words}</span>
                    <span>{book.chapters}</span>
                  </div>

                  <button
                    className={`w-full ${colors.button} text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed`}
                    disabled
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Bientôt disponible
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-slate-800 text-slate-300 px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Publication prévue sur Amazon KDP
          </div>
          <p className="text-slate-500 mt-4 text-sm">
            Inscrivez-vous à la newsletter pour être notifié des sorties
          </p>
        </div>
      </div>
    </section>
  );
}
