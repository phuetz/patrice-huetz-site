import { BookOpen, Code2, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99 102 241 / 0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-300 text-sm">L'IA comme outil de création</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            J'écris des histoires.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
              Je code des intelligences.
            </span>
          </h1>

          <p className="text-xl text-slate-300 mb-4">
            Je suis <strong className="text-white">Patrice Huetz</strong>.
          </p>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Le jour, je construis des agents IA qui automatisent l'impossible.
            La nuit, j'écris des romans où les machines rêvent et les humains doutent.
            Entre les deux ? Je cherche ce qui nous rend vraiment uniques.
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30">
              Science-Fiction
            </span>
            <span className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-sm border border-rose-500/30">
              Cyberpunk
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500/30">
              Agents LLM
            </span>
            <span className="px-3 py-1 bg-violet-500/20 text-violet-300 rounded-full text-sm border border-violet-500/30">
              Python
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="#livres"
              className="group bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Lire mes histoires
            </a>
            <a
              href="#services"
              className="group bg-slate-800 hover:bg-slate-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-slate-700 flex items-center gap-2"
            >
              <Code2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Créer avec moi
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
