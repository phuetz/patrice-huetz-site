import { useNavigate } from 'react-router-dom';
import { Check, Mail, Calendar, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
            {/* Icon de succès */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-emerald-600" />
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Votre demande est bien reçue !
            </h1>

            <p className="text-lg text-slate-600 mb-8">
              Merci pour votre confiance. Je vais étudier votre projet et revenir vers vous rapidement.
            </p>

            {/* Prochaines étapes */}
            <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Prochaines étapes</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Validation sous 24h</h3>
                    <p className="text-sm text-slate-600">
                      Je vérifie votre demande et m'assure que tout est clair. Je vous contacte pour toute précision si nécessaire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Envoi du devis et lien de paiement (50%)</h3>
                    <p className="text-sm text-slate-600">
                      Vous recevez par email le devis détaillé et le lien de paiement sécurisé pour les 50% d'acompte.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Développement (72h chrono)</h3>
                    <p className="text-sm text-slate-600">
                      Dès réception du paiement, je démarre le développement de votre site. Livraison sous 72h maximum.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Livraison et paiement final (50%)</h3>
                    <p className="text-sm text-slate-600">
                      Vous validez le site, réglez les 50% restants, et je déploie en production. Votre site est en ligne !
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Infos de contact */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-5 h-5" />
                <span className="text-sm">Vérifiez vos emails (et vos spams !)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Réponse sous 24h max</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
                Retour à l'accueil
              </button>
            </div>

            {/* Message additionnel */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-sm text-slate-500">
                Une question urgente ? Contactez-moi directement sur{' '}
                <a href="https://x.com/patricehuetz" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                  X/Twitter
                </a>{' '}
                ou par{' '}
                <a href="mailto:[email protected]" className="text-emerald-600 hover:underline">
                  email
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
