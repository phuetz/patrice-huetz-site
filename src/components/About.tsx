import { BookOpen, Code2, Cpu, Github } from 'lucide-react';

export default function About() {
  return (
    <section id="apropos" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            À propos
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Passionné par l'écriture et la technologie
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">L'Auteur</h3>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="text-slate-600 leading-relaxed mb-4">
                  J'écris des romans qui explorent les questions fondamentales soulevées par l'émergence
                  de l'intelligence artificielle : Qu'est-ce qui nous rend humains ? Comment coexister
                  avec des intelligences différentes de la nôtre ?
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Mes histoires mêlent science-fiction rigoureuse et exploration émotionnelle des personnages,
                  avec une attention particulière aux implications philosophiques et éthiques de la technologie.
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Le Développeur</h3>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Développeur Python spécialisé dans l'Intelligence Artificielle et les agents LLM.
                  Je conçois des solutions qui automatisent les tâches complexes et augmentent
                  la productivité des équipes.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Mon expertise couvre LangChain, LangGraph, les APIs OpenAI et Anthropic,
                  ainsi que les architectures RAG et les systèmes multi-agents.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-violet-500 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Compétences techniques</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Langages & Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'TypeScript', 'React', 'Node.js', 'SQL'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">IA & Machine Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    {['LangChain', 'LangGraph', 'OpenAI API', 'Claude API', 'RAG', 'Embeddings'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Outils & Plateformes</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'Docker', 'Supabase', 'Vercel', 'VS Code', 'Claude Code'].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Github className="w-6 h-6" />
                <h3 className="text-xl font-bold">Open Source</h3>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                Je partage régulièrement du code et des projets sur GitHub.
                Retrouvez mes contributions et explorez mes dépôts publics.
              </p>
              <a
                href="https://github.com/phuetz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium"
              >
                github.com/phuetz
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
