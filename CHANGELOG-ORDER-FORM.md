# Changelog - Page de Commande Site Auteur Pro

## [1.0.0] - 2025-12-23

### Ajouté

#### Routing
- Installation de React Router DOM pour navigation multi-pages
- Configuration du `BrowserRouter` dans `main.tsx`
- Création du système de routes dans `App.tsx`
- Mise à jour de la Navigation avec `Link` pour le logo

#### Pages
- **Page d'accueil** (`/`) : Contenu original du site déplacé dans `pages/HomePage.tsx`
- **Page de commande** (`/commande-site`) : Formulaire multi-étapes complet
- **Page de confirmation** (`/commande-confirmee`) : Confirmation post-soumission avec next steps

#### Formulaire de commande (`OrderFormPage.tsx`)
- Wizard multi-étapes avec 5 étapes :
  1. **Choix du pack** : Starter (199€), Catalogue (399€), Pro (699€) + options
  2. **Infos personnelles** : Nom, email, bio, réseaux sociaux, gestion domaine
  3. **Livres** : Formulaire dynamique répétable avec uploads de couvertures
  4. **Options avancées** : Newsletter, style/design, analytics
  5. **Récapitulatif** : Vue complète avant soumission + CGV

- **Validation** : Schéma Zod complet avec messages d'erreur
- **React Hook Form** : Gestion d'état du formulaire
- **useFieldArray** : Gestion dynamique de la liste des livres
- **Upload de fichiers** :
  - Couvertures individuelles par livre (JPG, PNG, WebP)
  - Option ZIP pour upload groupé
  - Limite de taille configurée
- **Barre de progression** : Indicateur visuel des étapes
- **Navigation** : Boutons Précédent/Suivant avec validation
- **Calcul automatique** : Prix total incluant options
- **Suggestions de genres** : Chips cliquables pour faciliter la saisie

#### UI/UX
- Design cohérent avec le reste du site (Tailwind CSS)
- Mobile-first et responsive
- Icônes Lucide React
- Messages d'aide contextuels
- États de validation visuels
- Protection contre la soumission multiple

#### Section Services
- Nouveau CTA proéminent "Site Auteur Pro en 72h"
- Design avec gradient indigo/violet pour se différencier
- Badge "AUTEURS" et détails du service
- Bouton d'action "Commander mon site" vers `/commande-site`
- Affichage des 3 packs disponibles

#### Documentation
- **README-ORDER-FORM.md** : Guide complet d'utilisation et configuration
- **CHANGELOG-ORDER-FORM.md** : Ce fichier
- **.env.example** : Template de configuration Formspree

### Technique

#### Dépendances ajoutées
```json
{
  "react-router-dom": "^6.x",
  "react-hook-form": "^7.x",
  "zod": "^3.x",
  "@hookform/resolvers": "^3.x"
}
```

#### Fichiers créés
- `src/pages/HomePage.tsx` (page d'accueil)
- `src/pages/OrderFormPage.tsx` (formulaire de commande)
- `src/pages/ConfirmationPage.tsx` (page de confirmation)
- `README-ORDER-FORM.md` (documentation)
- `CHANGELOG-ORDER-FORM.md` (ce fichier)
- `.env.example` (template configuration)

#### Fichiers modifiés
- `src/main.tsx` : Ajout BrowserRouter
- `src/App.tsx` : Configuration des routes
- `src/components/Navigation.tsx` : Utilisation de Link pour le logo
- `src/components/Services.tsx` : Ajout CTA Site Auteur Pro
- `package.json` : Nouvelles dépendances

### Configuration requise

1. **Formspree** (recommandé) :
   - Créer un compte sur formspree.io
   - Créer un formulaire
   - Remplacer `YOUR_FORM_ID` dans `OrderFormPage.tsx` ligne ~324

2. **Alternative** : Webhook custom, Basin.io, Tally.so, ou API route personnalisée

### Prochaines étapes

- [ ] Configurer l'endpoint Formspree avec le vrai ID
- [ ] Créer la page CGV (`/cgv`)
- [ ] Tester end-to-end le formulaire complet
- [ ] Optionnel : Intégration Stripe pour paiement automatique 50%
- [ ] Optionnel : Webhook pour génération auto du data.json

### Notes

- Le formulaire est entièrement fonctionnel côté front-end
- La validation Zod assure l'intégrité des données
- Les uploads de fichiers sont supportés via FormData
- Le design est cohérent avec le site existant
- Mobile-friendly et accessible
