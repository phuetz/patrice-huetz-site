import { BookOpen, Code2 } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%236366f1\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-10 h-10 text-indigo-400" />
              <span className="text-indigo-400 text-lg font-medium">Auteur</span>
            </div>
            <span className="text-slate-500">|</span>
            <div className="flex items-center gap-2">
              <Code2 className="w-10 h-10 text-emerald-400" />
              <span className="text-emerald-400 text-lg font-medium">Développeur</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-4">
            Patrice Huetz
          </h1>

          <p className="text-xl lg:text-2xl text-slate-300 mb-8">
            Auteur de science-fiction & Développeur IA
          </p>

          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            J'écris des romans qui explorent les frontières entre l'humain et la machine.
            En parallèle, je développe des solutions basées sur l'Intelligence Artificielle
            et les agents LLM pour automatiser et innover.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#livres"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Découvrir mes livres
            </a>
            <a
              href="#services"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 border border-slate-600 flex items-center gap-2"
            >
              <Code2 className="w-5 h-5" />
              Services IT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
