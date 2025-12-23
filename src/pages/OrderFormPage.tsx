import { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Plus,
  BookOpen,
  User,
  Settings,
  FileText,
  Package
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Schéma de validation Zod
const orderSchema = z.object({
  // Étape 1: Pack
  pack: z.enum(['starter', 'catalogue', 'pro'], {
    required_error: 'Veuillez choisir un pack',
  }),
  maintenanceAnnuelle: z.boolean().default(false),
  domainePersonnalise: z.boolean().default(false),

  // Étape 2: Informations personnelles
  prenom: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  siteWeb: z.string().url('URL invalide').optional().or(z.literal('')),
  autreReseau: z.string().optional(),
  bioAuteur: z.string().max(500, 'Maximum 500 caractères').optional(),
  domaineOption: z.enum(['existant', 'acheter', 'vercel']),
  domaineExistant: z.string().optional(),

  // Étape 3: Livres
  nombreLivres: z.number().min(1, 'Au moins un livre requis'),
  livres: z.array(
    z.object({
      titre: z.string().min(1, 'Titre requis'),
      genres: z.string().min(1, 'Au moins un genre requis'),
      description: z.string().min(10, 'Description trop courte (min 10 caractères)'),
      nombreMots: z.string().optional(),
      nombreChapitres: z.string().optional(),
      nombrePages: z.string().optional(),
      lienAchat: z.string().url('URL invalide').optional().or(z.literal('')),
      couvertureFile: z.any().optional(),
      couvertureUrl: z.string().url('URL invalide').optional().or(z.literal('')),
    })
  ).min(1, 'Au moins un livre requis'),
  couverturesZip: z.any().optional(),

  // Étape 4: Options avancées
  newsletter: z.enum(['non', 'mailerlite', 'substack', 'autre']),
  newsletterDetails: z.string().optional(),
  styleDesign: z.string().optional(),
  analytics: z.array(z.string()).optional(),
  messageLibre: z.string().optional(),

  // Étape 5: Validation
  accepteCGV: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les CGV',
  }),
  contenusPrets: z.boolean().refine((val) => val === true, {
    message: 'Vous devez confirmer que vos contenus sont prêts',
  }),
});

type OrderFormData = z.infer<typeof orderSchema>;

const PACK_CONFIGS = {
  starter: { name: 'Starter', price: 199, maxBooks: 1, label: 'Idéal pour débuter' },
  catalogue: { name: 'Catalogue', price: 399, maxBooks: 20, label: 'Le plus populaire', popular: true },
  pro: { name: 'Pro', price: 699, maxBooks: Infinity, label: 'Pour catalogues étendus' },
};

const GENRES_SUGGESTIONS = [
  'Thriller Techno',
  'Science-Fiction',
  'Cyberpunk',
  'Érotique',
  'Fantasy',
  'Romance',
  'Polar',
  'Guide Pratique',
  'Développement Personnel',
  'Essai',
  'Young Adult',
  'Dystopie',
];

export default function OrderFormPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      pack: undefined,
      maintenanceAnnuelle: false,
      domainePersonnalise: false,
      domaineOption: 'vercel',
      livres: [{ titre: '', genres: '', description: '', nombreMots: '', nombreChapitres: '', nombrePages: '', lienAchat: '', couvertureUrl: '' }],
      newsletter: 'non',
      analytics: [],
      accepteCGV: false,
      contenusPrets: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'livres',
  });

  const watchPack = watch('pack');
  const watchDomaineOption = watch('domaineOption');
  const watchNewsletter = watch('newsletter');
  const watchLivres = watch('livres');
  const watchMaintenanceAnnuelle = watch('maintenanceAnnuelle');
  const watchDomainePersonnalise = watch('domainePersonnalise');

  const totalSteps = 5;

  // Calcul du prix total
  const calculateTotal = () => {
    if (!watchPack) return 0;
    let total = PACK_CONFIGS[watchPack].price;
    if (watchDomainePersonnalise) total += 12;
    return total;
  };

  // Validation de l'étape courante
  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof OrderFormData)[] = [];

    switch (step) {
      case 1:
        fieldsToValidate = ['pack'];
        break;
      case 2:
        fieldsToValidate = ['prenom', 'nom', 'email', 'domaineOption'];
        break;
      case 3:
        fieldsToValidate = ['livres'];
        break;
      case 4:
        fieldsToValidate = ['newsletter'];
        break;
      case 5:
        fieldsToValidate = ['accepteCGV', 'contenusPrets'];
        break;
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      // Préparer les données pour l'envoi
      const formData = new FormData();

      // Ajouter toutes les données du formulaire
      formData.append('pack', data.pack);
      formData.append('prenom', data.prenom);
      formData.append('nom', data.nom);
      formData.append('email', data.email);
      formData.append('maintenanceAnnuelle', String(data.maintenanceAnnuelle));
      formData.append('domainePersonnalise', String(data.domainePersonnalise));

      // Ajouter les réseaux sociaux
      if (data.twitter) formData.append('twitter', data.twitter);
      if (data.instagram) formData.append('instagram', data.instagram);
      if (data.facebook) formData.append('facebook', data.facebook);
      if (data.siteWeb) formData.append('siteWeb', data.siteWeb);
      if (data.autreReseau) formData.append('autreReseau', data.autreReseau);
      if (data.bioAuteur) formData.append('bioAuteur', data.bioAuteur);

      // Domaine
      formData.append('domaineOption', data.domaineOption);
      if (data.domaineExistant) formData.append('domaineExistant', data.domaineExistant);

      // Livres - sérialiser en JSON
      formData.append('livres', JSON.stringify(data.livres));
      formData.append('nombreLivres', String(data.livres.length));

      // Ajouter les fichiers de couverture
      data.livres.forEach((livre, index) => {
        if (livre.couvertureFile && livre.couvertureFile[0]) {
          formData.append(`couverture_${index}`, livre.couvertureFile[0]);
        }
      });

      // ZIP de couvertures si fourni
      if (data.couverturesZip && data.couverturesZip[0]) {
        formData.append('couverturesZip', data.couverturesZip[0]);
      }

      // Options avancées
      formData.append('newsletter', data.newsletter);
      if (data.newsletterDetails) formData.append('newsletterDetails', data.newsletterDetails);
      if (data.styleDesign) formData.append('styleDesign', data.styleDesign);
      if (data.analytics) formData.append('analytics', JSON.stringify(data.analytics));
      if (data.messageLibre) formData.append('messageLibre', data.messageLibre);

      // Prix total
      formData.append('prixTotal', String(calculateTotal()));

      // TODO: Remplacer par ton endpoint Formspree ou API route
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        // Redirection vers page de confirmation
        navigate('/commande-confirmee');
      } else {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addBook = () => {
    if (watchPack) {
      const maxBooks = PACK_CONFIGS[watchPack].maxBooks;
      if (fields.length < maxBooks) {
        append({
          titre: '',
          genres: '',
          description: '',
          nombreMots: '',
          nombreChapitres: '',
          nombrePages: '',
          lienAchat: '',
          couvertureUrl: ''
        });
      } else {
        alert(`Le pack ${PACK_CONFIGS[watchPack].name} est limité à ${maxBooks} livre(s).`);
      }
    }
  };

  const removeBook = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Commander mon Site Auteur Pro
            </h1>
            <p className="text-lg text-slate-600">
              Votre site professionnel livré en 72h
            </p>
          </div>

          {/* Barre de progression */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      step < currentStep
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : step === currentStep
                        ? 'bg-white border-emerald-500 text-emerald-500'
                        : 'bg-white border-slate-300 text-slate-400'
                    }`}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step < currentStep ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>Pack</span>
              <span>Infos</span>
              <span>Livres</span>
              <span>Options</span>
              <span>Validation</span>
            </div>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8">
            {/* ÉTAPE 1: Choix du pack */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Choisissez votre formule</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(PACK_CONFIGS).map(([key, config]) => (
                    <label
                      key={key}
                      className={`relative border-2 rounded-lg p-6 cursor-pointer transition-all ${
                        watchPack === key
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 hover:border-emerald-300'
                      } ${config.popular ? 'ring-2 ring-emerald-400' : ''}`}
                    >
                      {config.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          POPULAIRE
                        </div>
                      )}
                      <input
                        type="radio"
                        value={key}
                        {...register('pack')}
                        className="sr-only"
                      />
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-900 mb-1">{config.name}</h3>
                        <p className="text-3xl font-bold text-emerald-600 mb-2">{config.price}€</p>
                        <p className="text-sm text-slate-600 mb-3">{config.label}</p>
                        <p className="text-xs text-slate-500">
                          {config.maxBooks === Infinity ? '100+ livres' : `${config.maxBooks} livre${config.maxBooks > 1 ? 's' : ''}`}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.pack && (
                  <p className="text-red-500 text-sm">{errors.pack.message}</p>
                )}

                <div className="space-y-3 mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-3">Options supplémentaires</h3>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('maintenanceAnnuelle')}
                      className="mt-1 w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-medium text-slate-900">Maintenance annuelle au forfait</span>
                      <p className="text-sm text-slate-600">Mises à jour et support technique inclus</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('domainePersonnalise')}
                      className="mt-1 w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-medium text-slate-900">Nom de domaine personnalisé</span>
                      <p className="text-sm text-slate-600">~12€/an, je m'en occupe pour vous</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* ÉTAPE 2: Informations personnelles */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Vos informations</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('prenom')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Jean"
                    />
                    {errors.prenom && (
                      <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('nom')}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Dupont"
                    />
                    {errors.nom && (
                      <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="jean.dupont@exemple.fr"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Bio de l'auteur (max 500 caractères)
                  </label>
                  <textarea
                    {...register('bioAuteur')}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Quelques mots sur vous, votre parcours, vos inspirations..."
                  />
                  {errors.bioAuteur && (
                    <p className="text-red-500 text-sm mt-1">{errors.bioAuteur.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Réseaux sociaux (optionnels)</h3>

                  <input
                    type="text"
                    {...register('twitter')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="X/Twitter (@username ou URL)"
                  />

                  <input
                    type="text"
                    {...register('instagram')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Instagram (@username ou URL)"
                  />

                  <input
                    type="text"
                    {...register('facebook')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Facebook (URL)"
                  />

                  <input
                    type="url"
                    {...register('siteWeb')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Site web actuel (https://...)"
                  />

                  <input
                    type="text"
                    {...register('autreReseau')}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Autre réseau (LinkedIn, TikTok, etc.)"
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-semibold text-slate-900">Nom de domaine</h3>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="existant"
                      {...register('domaineOption')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-slate-900">J'ai déjà un nom de domaine</span>
                      {watchDomaineOption === 'existant' && (
                        <input
                          type="text"
                          {...register('domaineExistant')}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mt-2"
                          placeholder="monsite.fr"
                        />
                      )}
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="acheter"
                      {...register('domaineOption')}
                      className="mt-1"
                    />
                    <span className="font-medium text-slate-900">Je veux acheter un nom de domaine (~12€/an)</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="radio"
                      value="vercel"
                      {...register('domaineOption')}
                      className="mt-1"
                    />
                    <span className="font-medium text-slate-900">Utiliser un sous-domaine Vercel gratuit (ex: monsite.vercel.app)</span>
                  </label>
                </div>
              </div>
            )}

            {/* ÉTAPE 3: Livres */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-6 h-6 text-emerald-500" />
                    <h2 className="text-2xl font-bold text-slate-900">Vos livres</h2>
                  </div>
                  {watchPack && fields.length < PACK_CONFIGS[watchPack].maxBooks && (
                    <button
                      type="button"
                      onClick={addBook}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Ajouter un livre
                    </button>
                  )}
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="border border-slate-200 rounded-lg p-6 relative">
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeBook(index)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}

                    <h3 className="font-bold text-lg text-slate-900 mb-4">Livre #{index + 1}</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Titre <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register(`livres.${index}.titre`)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Le titre de votre livre"
                        />
                        {errors.livres?.[index]?.titre && (
                          <p className="text-red-500 text-sm mt-1">{errors.livres[index]?.titre?.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Genre(s) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          {...register(`livres.${index}.genres`)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Ex: Science-Fiction, Thriller, Cyberpunk..."
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                          {GENRES_SUGGESTIONS.map((genre) => (
                            <button
                              key={genre}
                              type="button"
                              onClick={() => {
                                const current = watchLivres[index]?.genres || '';
                                const newGenres = current ? `${current}, ${genre}` : genre;
                                register(`livres.${index}.genres`).onChange({
                                  target: { value: newGenres, name: `livres.${index}.genres` }
                                });
                              }}
                              className="px-2 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700 rounded text-xs transition-colors"
                            >
                              + {genre}
                            </button>
                          ))}
                        </div>
                        {errors.livres?.[index]?.genres && (
                          <p className="text-red-500 text-sm mt-1">{errors.livres[index]?.genres?.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Description / Mots-clés <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register(`livres.${index}.description`)}
                          rows={3}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Une courte description du livre, son pitch, mots-clés importants..."
                        />
                        {errors.livres?.[index]?.description && (
                          <p className="text-red-500 text-sm mt-1">{errors.livres[index]?.description?.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nombre de mots</label>
                          <input
                            type="text"
                            {...register(`livres.${index}.nombreMots`)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="~107 000"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nb de chapitres</label>
                          <input
                            type="text"
                            {...register(`livres.${index}.nombreChapitres`)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="24"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Nb de pages</label>
                          <input
                            type="text"
                            {...register(`livres.${index}.nombrePages`)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="~320"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Lien d'achat (Amazon, etc.)
                        </label>
                        <input
                          type="url"
                          {...register(`livres.${index}.lienAchat`)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="https://amazon.fr/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Couverture <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <label className="flex-1 flex items-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors">
                              <Upload className="w-5 h-5 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {watchLivres[index]?.couvertureFile?.[0]?.name || 'Uploader un fichier (JPG, PNG, WebP)'}
                              </span>
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                {...register(`livres.${index}.couvertureFile`)}
                                className="sr-only"
                              />
                            </label>
                          </div>
                          <div className="text-center text-sm text-slate-500">ou</div>
                          <input
                            type="url"
                            {...register(`livres.${index}.couvertureUrl`)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="URL de la couverture (https://...)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Alternative : Upload groupé</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Si vous avez toutes vos couvertures, vous pouvez les uploader en un seul fichier ZIP
                  </p>
                  <label className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:border-emerald-500 cursor-pointer transition-colors inline-flex">
                    <Upload className="w-5 h-5 text-slate-400" />
                    <span className="text-sm text-slate-600">
                      {watch('couverturesZip')?.[0]?.name || 'Uploader un fichier ZIP'}
                    </span>
                    <input
                      type="file"
                      accept=".zip"
                      {...register('couverturesZip')}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ÉTAPE 4: Options avancées */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Settings className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Options avancées</h2>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Newsletter</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="non"
                        {...register('newsletter')}
                      />
                      <span>Pas de newsletter</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="mailerlite"
                        {...register('newsletter')}
                      />
                      <span>Intégration MailerLite</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="substack"
                        {...register('newsletter')}
                      />
                      <span>Intégration Substack</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value="autre"
                        {...register('newsletter')}
                      />
                      <span>Autre service</span>
                    </label>
                  </div>

                  {watchNewsletter && watchNewsletter !== 'non' && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Détails (API key, URL d'intégration, etc.)
                      </label>
                      <textarea
                        {...register('newsletterDetails')}
                        rows={2}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Fournissez les informations nécessaires pour l'intégration"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Style et design préféré
                  </label>
                  <textarea
                    {...register('styleDesign')}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Décrivez l'ambiance souhaitée : couleurs principales, références de sites que vous aimez, style (cyberpunk néon, minimaliste, élégant, etc.)..."
                  />
                </div>

                {watchPack === 'pro' && (
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-3">Analytics (Pack Pro)</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Controller
                          name="analytics"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value?.includes('google')}
                              onChange={(e) => {
                                const current = field.value || [];
                                if (e.target.checked) {
                                  field.onChange([...current, 'google']);
                                } else {
                                  field.onChange(current.filter((v) => v !== 'google'));
                                }
                              }}
                              className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                            />
                          )}
                        />
                        <span>Google Analytics</span>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <Controller
                          name="analytics"
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value?.includes('umami')}
                              onChange={(e) => {
                                const current = field.value || [];
                                if (e.target.checked) {
                                  field.onChange([...current, 'umami']);
                                } else {
                                  field.onChange(current.filter((v) => v !== 'umami'));
                                }
                              }}
                              className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                            />
                          )}
                        />
                        <span>Umami (privacy-friendly)</span>
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message libre / Demandes spéciales
                  </label>
                  <textarea
                    {...register('messageLibre')}
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Toute information complémentaire que vous souhaitez partager..."
                  />
                </div>
              </div>
            )}

            {/* ÉTAPE 5: Récapitulatif */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-2xl font-bold text-slate-900">Récapitulatif</h2>
                </div>

                <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Pack sélectionné</h3>
                    {watchPack && (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-lg">{PACK_CONFIGS[watchPack].name}</p>
                          <p className="text-sm text-slate-600">{PACK_CONFIGS[watchPack].label}</p>
                          {watchMaintenanceAnnuelle && (
                            <p className="text-sm text-emerald-600">+ Maintenance annuelle</p>
                          )}
                          {watchDomainePersonnalise && (
                            <p className="text-sm text-emerald-600">+ Nom de domaine personnalisé (12€/an)</p>
                          )}
                        </div>
                        <p className="text-2xl font-bold text-emerald-600">{calculateTotal()}€</p>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Vos informations</h3>
                    <p className="text-sm text-slate-700">{watch('prenom')} {watch('nom')}</p>
                    <p className="text-sm text-slate-600">{watch('email')}</p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="font-semibold text-slate-900 mb-2">Livres ({watchLivres.length})</h3>
                    <ul className="space-y-1">
                      {watchLivres.map((livre, index) => (
                        <li key={index} className="text-sm text-slate-700">
                          {index + 1}. {livre.titre || '(Sans titre)'} - {livre.genres || 'Genre non spécifié'}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-slate-200 pt-4 bg-emerald-50 -m-6 p-6 rounded-b-lg">
                    <p className="text-sm text-slate-700 mb-2">
                      <strong>Modalités de paiement :</strong>
                    </p>
                    <p className="text-sm text-slate-600">
                      50% à la commande ({Math.round(calculateTotal() / 2)}€) - Lien de paiement envoyé après validation manuelle
                      <br />
                      50% à la livraison ({Math.round(calculateTotal() / 2)}€)
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('accepteCGV')}
                      className="mt-1 w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">
                      J'accepte les{' '}
                      <a href="/cgv" target="_blank" className="text-emerald-600 hover:underline">
                        conditions générales de vente
                      </a>{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.accepteCGV && (
                    <p className="text-red-500 text-sm ml-8">{errors.accepteCGV.message}</p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('contenusPrets')}
                      className="mt-1 w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm text-slate-700">
                      Je confirme que mes contenus sont prêts ou le seront sous 72h{' '}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.contenusPrets && (
                    <p className="text-red-500 text-sm ml-8">{errors.contenusPrets.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  currentStep === 1
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Précédent
              </button>

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
                >
                  Suivant
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
