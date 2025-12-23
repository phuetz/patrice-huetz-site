# Spécifications Techniques et Fonctionnelles
## Page de Commande Automatisée "Site Auteur Pro en 72h"

**Version:** 2.0
**Date:** 2025-12-23
**Auteur:** Patrice Huetz
**Status:** Spécifications améliorées avec recommandations

---

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Objectifs](#objectifs)
3. [Architecture technique](#architecture-technique)
4. [Parcours utilisateur](#parcours-utilisateur)
5. [Spécifications détaillées par étape](#spécifications-détaillées-par-étape)
6. [Validation et sécurité](#validation-et-sécurité)
7. [Design et UX](#design-et-ux)
8. [Backend et traitement des données](#backend-et-traitement-des-données)
9. [Améliorations recommandées](#améliorations-recommandées)
10. [Roadmap phase 2](#roadmap-phase-2)

---

## Vue d'ensemble

### Contexte

Le service "Site Auteur Pro en 72h" permet aux auteurs de commander un site web professionnel pour présenter leur catalogue de livres. La page de commande automatise la collecte de toutes les informations nécessaires à la création du site, réduisant les échanges manuels de 80-90%.

### Utilisateurs cibles

- **Auteurs indépendants** avec 1 à 100+ livres publiés
- **Maisons d'édition** souhaitant créer des sites pour leurs auteurs
- **Auteurs en cours de publication** préparant leur présence en ligne

### Bénéfices

**Pour le client :**
- Process clair et guidé (5 étapes)
- Pas d'aller-retours par email
- Transparence sur les prix et délais
- Confirmation immédiate de la demande

**Pour moi (Patrice) :**
- Collecte structurée et complète dès le départ
- Toutes les données + fichiers dans un seul envoi
- Format prêt à l'import dans le template Next.js
- Scalabilité sans augmentation de charge manuelle

---

## Objectifs

### Objectifs principaux

1. **Automatiser la collecte de contenus** : 80-90% des informations nécessaires en un seul formulaire
2. **Guider le client pas à pas** : UX claire, éviter l'abandon
3. **Valider les données en temps réel** : Front-end et back-end
4. **Gérer les uploads** : Couvertures multiples ou ZIP, validation formats/taille
5. **Générer un récapitulatif clair** : Visualisation avant soumission
6. **Envoyer structuré** : Email + JSON + fichiers organisés
7. **Respecter l'offre actuelle** : Packs, prix, processus de paiement

### Objectifs secondaires

8. **Réduire les abandons** : Sauvegarde automatique, estimations claires
9. **Optimiser la conversion** : Upsells subtils, réassurance
10. **Faciliter le traitement** : Webhook → génération auto du data.json (phase 2)

---

## Architecture technique

### Stack technique

**Front-end :**
- Next.js 14+ (App Router)
- TypeScript
- React Hook Form + Zod (validation)
- Tailwind CSS (design)
- Lucide React (icônes)
- next/image (optimisation images)

**Gestion d'état :**
- useState pour le wizard multi-étapes
- useFieldArray pour la liste dynamique de livres
- localStorage pour sauvegarde brouillon (optionnel)

**Backend / Envoi :**
- **Option 1 (Recommandée MVP)** : Formspree (simple, gère uploads)
- **Option 2** : API Route Next.js + Resend (email) + Vercel Blob (stockage)
- **Option 3** : Webhook Zapier/Make + Google Drive/Dropbox

**Hébergement :**
- Vercel (déploiement automatique)
- Domaine : `/commande-site` ou `/demarrer`

---

## Parcours utilisateur

### Flux principal

```
Homepage → Section Services → CTA "Commander mon site"
    ↓
/commande-site
    ↓
Étape 1 : Choix du pack ✓
    ↓
Étape 2 : Informations personnelles ✓
    ↓
Étape 3 : Livres (formulaire dynamique + uploads) ✓
    ↓
Étape 4 : Options avancées ✓
    ↓
Étape 5 : Récapitulatif + Validation ✓
    ↓
[Soumission formulaire]
    ↓
/commande-confirmee
    ↓
Email de confirmation au client
Email structuré à Patrice (données + fichiers)
```

### Points de sortie

- **Abandon en cours** : Proposition "Sauvegarder et continuer plus tard" (phase 2)
- **Retour en arrière** : Bouton "Précédent" à chaque étape (données conservées)
- **Questions** : Lien vers contact/FAQ dans le wizard

---

## Spécifications détaillées par étape

### Étape 1 : Choix du pack

#### Objectif
Permettre au client de choisir le pack adapté à son catalogue et les options complémentaires.

#### Champs obligatoires

**Pack (radio buttons, obligatoire) :**
- `starter` : Starter – 199 € (1 livre)
  - Label : "Idéal pour débuter"
  - Icon : 📘
- `catalogue` : Catalogue – 399 € (jusqu'à 20 livres) **[POPULAIRE]**
  - Label : "Le plus populaire"
  - Badge visuel "Recommandé"
  - Icon : 📚
- `pro` : Pro – 699 € (100+ livres)
  - Label : "Pour catalogues étendus"
  - Icon : 🏆

#### Options (checkboxes, optionnelles)

- `maintenanceAnnuelle` : Maintenance annuelle au forfait
  - Description : "Mises à jour techniques, corrections de bugs, ajout de nouveaux livres (jusqu'à 5/an), support prioritaire"
  - Prix : Inclus dans les packs pour la 1ère année, puis ~200€/an (à définir)

- `domainePersonnalise` : Nom de domaine personnalisé
  - Description : "Je m'occupe de l'achat et de la configuration (~12€/an, renouvelable)"
  - Prix : +12€/an

#### Validation

- Pack : Obligatoire (message : "Veuillez choisir un pack")
- Options : Optionnelles, cases décochées par défaut

#### Calcul prix total

```
Prix total = Prix pack + (domainePersonnalise ? 12 : 0)
```

Affichage : "Total : XXX€" en temps réel

#### Améliorations

- **Comparatif des packs** : Tableau comparatif détaillé (fonctionnalités incluses)
- **Calculator** : "Combien de livres avez-vous ?" → Suggestion auto du pack optimal
- **FAQ inline** : "Que comprend la maintenance ?" (tooltip/accordéon)

---

### Étape 2 : Informations personnelles

#### Objectif
Collecter les informations de contact et la présence en ligne de l'auteur.

#### Champs identité (obligatoires)

- `prenom` (text, obligatoire)
  - Validation : min 2 caractères
  - Placeholder : "Jean"

- `nom` (text, obligatoire)
  - Validation : min 2 caractères
  - Placeholder : "Dupont"

- `email` (email, obligatoire)
  - Validation : format email valide (RFC 5322)
  - Vérification anti-typo (ex: "gmial.com" → suggestion "gmail.com")
  - Placeholder : "[email protected]"

#### Bio auteur (optionnelle mais recommandée)

- `bioAuteur` (textarea, optionnel)
  - Limite : 500 caractères max
  - Compteur de caractères en temps réel
  - Placeholder : "Quelques mots sur vous, votre parcours, vos inspirations..."
  - Aide : "Cette bio apparaîtra sur la page 'À propos' de votre site"

#### Réseaux sociaux (tous optionnels)

- `twitter` (text)
  - Format accepté : @username OU URL complète
  - Normalisation auto : Convertir @username en https://x.com/username
  - Placeholder : "@jeandupont ou https://x.com/jeandupont"

- `instagram` (text)
  - Format : @username OU URL
  - Placeholder : "@jeandupont ou https://instagram.com/jeandupont"

- `facebook` (text)
  - Format : URL complète
  - Placeholder : "https://facebook.com/jeandupont"

- `siteWeb` (url)
  - Validation : URL valide
  - Placeholder : "https://votresiteactuel.fr"
  - Aide : "Si vous avez déjà un site que vous souhaitez remplacer ou compléter"

- `autreReseau` (text)
  - Libre
  - Placeholder : "LinkedIn, TikTok, Goodreads, etc."

#### Gestion du nom de domaine (obligatoire)

**Question : "Nom de domaine pour votre site ?"**

Radio buttons :
- `existant` : J'ai déjà un nom de domaine
  - Si sélectionné : Afficher champ `domaineExistant` (text)
  - Placeholder : "monsite.fr"
  - Aide : "Vous devrez me donner accès aux DNS pour configuration"

- `acheter` : Je veux acheter un nom de domaine
  - Aide : "Je m'occupe de tout (~12€/an, inclus si option cochée étape 1)"
  - Note : Si option non cochée étape 1, proposer de revenir en arrière

- `vercel` : Utiliser un sous-domaine Vercel gratuit
  - Exemple : "Votre site sera accessible sur monsite.vercel.app"
  - Aide : "Gratuit, mais moins professionnel. Vous pourrez ajouter un domaine plus tard"

#### Validation

- Prénom, nom, email : Obligatoires
- Email : Vérification de format + suggestion anti-typo
- Réseaux sociaux : Optionnels, validation d'URL si remplis
- Domaine : Un choix obligatoire parmi les 3 options

#### Améliorations

- **Détection de doublon email** : Vérifier si email déjà utilisé pour une commande (phase 2)
- **Import bio depuis réseaux** : "Importer ma bio depuis mon profil Twitter/LinkedIn" (phase 2)
- **Prévisualisation** : Aperçu de la carte auteur avec les infos saisies

---

### Étape 3 : Vos livres

#### Objectif
Collecter les informations de chaque livre et les couvertures associées.

#### Comportement général

- Liste dynamique de livres (minimum 1)
- Bouton "Ajouter un livre" (respecte la limite du pack)
- Bouton "Supprimer" sur chaque livre (si > 1 livre)
- Limite selon pack :
  - Starter : 1 livre max
  - Catalogue : 20 livres max
  - Pro : Illimité (ou limite technique à 100 pour le formulaire)

#### Champs par livre

**Informations de base (obligatoires) :**

- `titre` (text, obligatoire)
  - Validation : min 1 caractère
  - Placeholder : "Le titre complet de votre livre"

- `genres` (text ou multi-select, obligatoire)
  - Format : Texte libre avec virgules OU chips cliquables
  - Validation : min 1 genre
  - Placeholder : "Ex: Science-Fiction, Thriller, Cyberpunk"
  - **Suggestions cliquables** (boutons qui ajoutent au champ) :
    - Thriller Techno
    - Science-Fiction
    - Cyberpunk
    - Érotique
    - Fantasy
    - Romance
    - Polar
    - Guide Pratique
    - Développement Personnel
    - Essai
    - Young Adult
    - Dystopie
    - Horreur
    - Historique
    - Biographie
    - Poésie

- `description` (textarea, obligatoire)
  - Validation : min 10 caractères
  - Limite : 1000 caractères (avec compteur)
  - Placeholder : "Une courte description du livre, son pitch, les mots-clés importants..."
  - Aide : "Cette description apparaîtra sur la page du livre. Soyez accrocheur !"

**Statistiques (optionnelles mais recommandées) :**

- `nombreMots` (text)
  - Placeholder : "~107 000 mots"
  - Format libre (accepte "107k", "107000", "~107 000", etc.)

- `nombreChapitres` (text ou number)
  - Placeholder : "24"

- `nombrePages` (text)
  - Placeholder : "~320 pages"
  - Format libre

**Liens externes (optionnels) :**

- `lienAchat` (url)
  - Validation : URL valide si rempli
  - Placeholder : "https://amazon.fr/dp/XXXXX"
  - Aide : "Lien vers Amazon, Kobo, votre boutique, etc."
  - **Amélioration** : Détection auto de la plateforme (Amazon, Kobo, Fnac) → affichage d'icône

- `lienExtrait` (url, optionnel - amélioration)
  - Placeholder : "https://lien-vers-pdf-extrait.pdf"
  - Aide : "Lien vers un extrait gratuit (PDF, Google Drive, etc.)"

**Couverture (obligatoire - un des deux) :**

Option A : Upload fichier
- `couvertureFile` (file input)
  - Formats acceptés : JPG, PNG, WebP
  - Taille max : 10 MB par fichier
  - **Validation recommandée** :
    - Dimensions minimales : 800x1200px (ratio portrait typique)
    - Ratio aspect : Entre 1:1.4 et 1:1.6 (tolérance pour différents formats)
  - **Preview** : Affichage immédiat de l'image après upload
  - Nom du fichier affiché : "couverture_livre1.jpg"

Option B : URL externe
- `couvertureUrl` (url)
  - Validation : URL valide pointant vers une image
  - Placeholder : "https://exemple.com/couverture.jpg"
  - **Vérification** : Tester que l'URL retourne bien une image (phase 2)
  - **Preview** : Affichage de l'image depuis l'URL

**Validation** : Au moins une des deux options (fichier OU URL) est obligatoire

#### Upload groupé (alternative)

**Pour faciliter l'envoi de nombreuses couvertures :**

- `couverturesZip` (file input)
  - Format : .zip uniquement
  - Taille max : 100 MB
  - Contenu : Images nommées de manière cohérente (ex: "livre1.jpg", "livre2.jpg")
  - Aide : "Si vous avez toutes vos couvertures, vous pouvez les uploader en un seul fichier ZIP. Nommez-les clairement (ex: titre-du-livre.jpg)"

**Note** : Si ZIP fourni, il complète ou remplace les uploads individuels (à préciser dans les instructions)

#### Validation globale

- Au moins 1 livre obligatoire
- Nombre de livres ≤ limite du pack
- Chaque livre doit avoir : titre, genre(s), description, couverture (fichier OU URL)

#### Améliorations

**Import depuis API (phase 2) :**
- "Importer depuis Amazon" : Entrer ISBN ou URL Amazon → auto-remplissage des métadonnées
- "Importer depuis Goodreads"
- "Importer depuis Google Books"

**Import CSV/Excel (pour gros catalogues - pack Pro) :**
- Template CSV fourni
- Colonnes : titre, genres, description, nombreMots, nombreChapitres, nombrePages, lienAchat, couvertureUrl
- Upload du CSV → pré-remplissage du formulaire
- Validation et correction assistée

**Preview carte livre** :
- Aperçu en temps réel de la carte du livre telle qu'elle apparaîtra sur le site

**Gestion avancée des couvertures** :
- Crop/resize dans le formulaire (phase 2)
- Détection automatique si l'image est trop petite/pixelisée

**Drag & Drop** :
- Réorganiser l'ordre des livres par drag & drop
- Ordre affiché = ordre sur le site

---

### Étape 4 : Options avancées

#### Objectif
Configurer les fonctionnalités optionnelles du site.

#### Newsletter

**Question : "Souhaitez-vous intégrer une newsletter ?"**

Radio buttons :
- `non` : Pas de newsletter (par défaut)
- `mailerlite` : Intégration MailerLite
- `substack` : Intégration Substack
- `autre` : Autre service (préciser)

**Si newsletter ≠ "non" :**
- `newsletterDetails` (textarea)
  - Placeholder : "Fournissez les informations nécessaires : API key, URL d'intégration, compte utilisateur, etc."
  - Aide : "Je vous recontacterai si besoin de précisions"

#### Style et design

- `styleDesign` (textarea, optionnel)
  - Limite : 500 caractères
  - Placeholder : "Décrivez l'ambiance souhaitée : couleurs principales, références de sites que vous aimez, style (cyberpunk néon, minimaliste, élégant, classique, sombre, lumineux, etc.)"
  - **Amélioration** : Upload de moodboard (images de référence)

**Amélioration phase 2 : Sélection de templates**
- Galerie de 3-5 templates pré-conçus
- Aperçu visuel cliquable
- Option "Sur-mesure" pour description libre

#### Analytics (Pack Pro uniquement)

**Question : "Quels outils d'analytics souhaitez-vous ?"**

Checkboxes (multi-sélection) :
- `google` : Google Analytics
  - Aide : "Détaillé mais invasif pour la vie privée"
- `umami` : Umami (privacy-friendly)
  - Aide : "Respectueux de la vie privée, conforme RGPD sans banner cookies"
- `plausible` : Plausible (amélioration)
- Aucun : Pas d'analytics

**Si pack ≠ Pro** : Section masquée ou grisée avec message "Disponible uniquement pour le pack Pro"

#### Message libre

- `messageLibre` (textarea, optionnel)
  - Limite : 1000 caractères
  - Placeholder : "Toute information complémentaire que vous souhaitez partager : demandes spéciales, contraintes, inspirations, questions..."

#### Fonctionnalités supplémentaires (amélioration phase 2)

**Section "Fonctionnalités optionnelles" (checkboxes) :**
- Blog intégré (pour articles, actualités)
- Boutique en ligne (si vente directe)
- Formulaire de contact personnalisé
- Galerie photos/vidéos (interviews, événements)
- Page événements (salons, dédicaces)
- Multilingue (français + anglais, etc.)

**Note** : Ces options peuvent affecter le prix → Affichage "Sur devis" ou tarif additionnel

#### Validation

- Tous les champs optionnels
- Si newsletter sélectionnée, encourager à fournir les détails

---

### Étape 5 : Récapitulatif et validation

#### Objectif
Afficher un résumé complet de la commande avant soumission finale.

#### Contenu du récapitulatif

**Section 1 : Pack et prix**
- Nom du pack choisi (Starter/Catalogue/Pro)
- Prix du pack
- Options sélectionnées :
  - Maintenance annuelle (si cochée)
  - Nom de domaine personnalisé (si cochée) : +12€
- **Prix total TTC** (en gros, mis en valeur)

**Section 2 : Vos informations**
- Nom complet (prénom + nom)
- Email
- Bio (extrait ou "Bio fournie" si > 100 caractères)
- Réseaux sociaux listés
- Domaine : Option choisie (existant : monsite.fr / à acheter / Vercel gratuit)

**Section 3 : Vos livres**
- Nombre total de livres
- Liste des livres (numérotée) :
  - Titre
  - Genre(s)
  - Description (extrait si trop long)
  - Couverture : "✓ Fournie" (icône de validation)
- Note : "X couvertures uploadées" ou "ZIP fourni avec Y fichiers"

**Section 4 : Options avancées**
- Newsletter : Service choisi (ou "Non")
- Style/Design : "Préférences fournies" ou "Aucune préférence"
- Analytics (si pack Pro) : Outils sélectionnés
- Message libre : "Fourni" ou "Aucun"

**Section 5 : Modalités de paiement**
Encadré mis en évidence :
```
💰 Paiement en 2 fois :
• 50% à la commande : XXX€
  → Lien de paiement envoyé après validation manuelle (dans les 24h)
• 50% à la livraison : XXX€
  → À régler avant mise en ligne du site

Délai : Site livré sous 72h après réception du 1er paiement
```

#### Conditions générales et validation finale

**Checkboxes obligatoires :**

- `accepteCGV` (checkbox, obligatoire)
  - Label : "J'accepte les [conditions générales de vente](#) (lien vers page CGV)"
  - Validation : Doit être cochée pour soumettre

- `contenusPrets` (checkbox, obligatoire)
  - Label : "Je confirme que mes contenus sont prêts ou le seront sous 72h"
  - Aide : "Assurez-vous d'avoir toutes les informations et fichiers nécessaires"
  - Validation : Doit être cochée

**Amélioration** :
- `autoriseContact` (checkbox, optionnelle)
  - "J'accepte d'être recontacté pour des offres et actualités liées à mes besoins d'auteur"
  - Usage : Ajout à la newsletter/mailing list

#### Bouton de soumission

```
[🚀 Envoyer ma demande et réserver mon slot]
```

- État normal : Bouton vert vibrant
- État disabled : Si CGV ou contenus non cochés
- État loading : "Envoi en cours..." (désactivé, spinner)
- Texte alternatif (après soumission réussie) : "Demande envoyée ✓"

#### Validation avant soumission

Vérifications côté client :
- Tous les champs obligatoires remplis (étapes 1-4)
- Checkboxes CGV et contenus cochées
- Au moins une couverture par livre (fichier ou URL)

Si erreur détectée :
- Message d'erreur global : "Certaines informations sont manquantes. Veuillez vérifier le formulaire."
- Retour automatique à l'étape concernée
- Highlight des champs en erreur

#### Amélioration : Estimation de délai

Affichage dynamique :
```
📅 Si vous validez aujourd'hui (23/12/2025) :
• Validation et paiement 50% : d'ici le 24/12/2025
• Développement : 24-27/12/2025
• Livraison prévue : 27/12/2025

⚠️ Attention : Les délais peuvent être rallongés pendant les périodes de forte demande ou les jours fériés.
```

---

## Validation et sécurité

### Validation côté client (Front-end)

**Framework : Zod**

Schéma de validation complet pour chaque étape :
- Types corrects (string, email, url, number, etc.)
- Longueurs min/max
- Formats spécifiques (email RFC 5322, URL valide)
- Conditional validation (ex: domaineExistant obligatoire si domaineOption === "existant")

**Validation en temps réel :**
- Validation onChange pour feedback immédiat
- Messages d'erreur contextuels sous chaque champ
- Highlight visuel des champs en erreur (bordure rouge)

**Validation par étape :**
- Impossible de passer à l'étape suivante sans valider l'étape courante
- Bouton "Suivant" disabled si erreurs

### Validation côté serveur (Back-end)

**Vérifications supplémentaires :**
- Re-validation de tous les champs (ne jamais faire confiance au client)
- Validation des fichiers uploadés :
  - Type MIME réel (pas juste l'extension)
  - Taille maximale
  - Dimensions minimales (pour les couvertures)
  - Scan antivirus (optionnel mais recommandé en production)

**Protection contre les abus :**
- Rate limiting : Max 3 soumissions par IP par heure
- Honeypot field (champ caché anti-spam bot)
- CAPTCHA (si spam détecté) : hCaptcha ou Cloudflare Turnstile (RGPD-friendly)

### Sécurité

**Upload de fichiers :**
- Stockage temporaire sécurisé (Vercel Blob ou S3)
- Isolation des fichiers (pas d'exécution côté serveur)
- Nettoyage automatique (suppression après traitement ou 30 jours)

**Protection des données personnelles (RGPD) :**
- Mention RGPD claire : "Vos données sont utilisées uniquement pour traiter votre commande"
- Lien vers politique de confidentialité
- Consentement explicite (checkboxes CGV)
- Données stockées : Email uniquement (pour envoi), pas de tracking tiers

**HTTPS obligatoire :**
- Certificat SSL actif (Vercel le fournit automatiquement)

---

## Design et UX

### Principes de design

**Cohérence visuelle :**
- Palette de couleurs alignée avec le site principal
- Indigo/Violet pour le service Auteur (comme le CTA dans Services)
- Typographie identique (probablement Inter ou système)
- Spacing et composants Tailwind CSS

**Mobile-first :**
- Design pensé d'abord pour mobile
- Progressive enhancement pour desktop
- Breakpoints Tailwind : sm (640px), md (768px), lg (1024px), xl (1280px)

**Accessibilité (WCAG 2.1 AA) :**
- Contraste suffisant (4.5:1 minimum pour le texte)
- Labels clairs pour tous les inputs
- Navigation au clavier complète
- Messages d'erreur associés aux champs (aria-describedby)
- Focus visible sur tous les éléments interactifs

### Composants clés

**Barre de progression (Stepper) :**
- 5 étapes numérotées
- Indicateur visuel de l'étape actuelle
- Étapes complétées : checkmark vert
- Étapes futures : grisées
- Labels courts sous chaque étape : "Pack", "Infos", "Livres", "Options", "Validation"

**Formulaire :**
- Inputs spacieux (min 44x44px pour mobile)
- Labels au-dessus des champs (plus lisible sur mobile)
- Placeholders informatifs mais non essentiels
- Messages d'aide (texte gris clair sous les champs)
- Validation inline (bordure verte si valide, rouge si erreur)

**Boutons de navigation :**
- "Précédent" : Secondaire (gris), toujours à gauche
- "Suivant" / "Envoyer" : Primaire (vert/indigo), toujours à droite
- Taille suffisante (min 48px hauteur)
- États : Normal, Hover, Disabled, Loading

**Cards pour les packs (étape 1) :**
- Grille responsive (1 col mobile, 3 cols desktop)
- Bordure épaisse quand sélectionné
- Badge "Populaire" sur le pack Catalogue
- Icône distinctive pour chaque pack
- Prix en gros et mis en valeur

**Livre (étape 3) :**
- Carte avec bordure pour chaque livre
- Header : "Livre #X" + bouton supprimer (si > 1)
- Formulaire à l'intérieur de la carte
- Preview de la couverture uploadée
- Collapsible optionnel (si beaucoup de livres)

### Feedback utilisateur

**Messages de succès :**
- Toast notification vert : "Étape validée ✓"
- Animation smooth lors du passage à l'étape suivante

**Messages d'erreur :**
- Inline sous chaque champ concerné
- Couleur rouge, icône d'alerte
- Texte clair et actionnable : "L'email est invalide" (pas "Erreur")

**Loading states :**
- Spinner sur bouton "Suivant" si validation asynchrone
- Skeleton screens pour le récapitulatif (si calcul long)

**Empty states :**
- "Aucun livre ajouté pour le moment" avec illustration + bouton "Ajouter votre premier livre"

### Responsive

**Mobile (< 768px) :**
- Formulaire pleine largeur avec padding latéral
- Stepper horizontal scrollable ou vertical
- Champs empilés (1 col)
- Boutons pleine largeur

**Tablet (768px - 1024px) :**
- Formulaire centré, max-width 700px
- Certains champs côte à côte (ex: prénom/nom)
- Stepper horizontal fixe

**Desktop (> 1024px) :**
- Formulaire max-width 900px centré
- Colonnes pour certaines sections (ex: 3 packs côte à côte)
- Sidebar optionnelle avec récap permanent (phase 2)

---

## Backend et traitement des données

### Option 1 : Formspree (Recommandée pour MVP)

**Avantages :**
- Simple à configurer (endpoint unique)
- Gère les uploads de fichiers
- Email automatique structuré
- Pas de backend à maintenir

**Configuration :**
1. Créer compte Formspree
2. Créer formulaire "Commande Site Auteur Pro"
3. Configurer :
   - Email de notification : [email protected]
   - Uploads activés : Oui
   - Taille max : 100 MB
   - Template email : Personnalisé (voir ci-dessous)

**Limites :**
- Plan gratuit : 50 soumissions/mois (suffisant pour MVP)
- Pas de webhook avancé (sauf plans payants)

### Option 2 : API Route Next.js + Resend + Vercel Blob

**Architecture :**
```
POST /api/order-form
    ↓
1. Validation serveur (Zod)
2. Upload fichiers → Vercel Blob
3. Génération email HTML (React Email)
4. Envoi email via Resend
5. Log commande → Base de données (optionnel)
6. Retour success/error au client
```

**Avantages :**
- Contrôle total du traitement
- Possibilité de générer le data.json directement
- Webhooks personnalisés
- Statistiques et dashboard

**Inconvénients :**
- Plus complexe à développer et maintenir
- Coûts (Vercel Blob, Resend au-delà du plan gratuit)

### Option 3 : Webhook Zapier/Make

**Architecture :**
```
POST /webhook-zapier
    ↓
Zapier/Make workflow :
    1. Recevoir données JSON
    2. Télécharger fichiers uploadés
    3. Stocker fichiers → Google Drive/Dropbox
    4. Générer email structuré
    5. Envoyer email via Gmail/Sendgrid
    6. (Optionnel) Ajouter ligne → Google Sheets
    7. (Optionnel) Créer tâche → Trello/Notion
```

**Avantages :**
- No-code/Low-code
- Flexibilité (connexion à plein d'outils)
- Automatisations avancées possibles

**Inconvénients :**
- Coût (plans payants Zapier/Make)
- Complexité si beaucoup de fichiers

### Structure de l'email reçu

**Sujet :**
```
🚀 Nouvelle commande Site Auteur Pro – [Prénom Nom] – Pack [Catalogue]
```

**Corps (format Markdown ou HTML) :**

```markdown
# Nouvelle commande Site Auteur Pro

---

## RÉSUMÉ

**Pack :** Catalogue (399€)
**Options :**
- ✓ Nom de domaine personnalisé (+12€)
- ✗ Maintenance annuelle

**PRIX TOTAL :** 411€ TTC
- Acompte 50% : 206€
- Solde 50% : 205€

---

## CLIENT

**Nom :** Jean Dupont
**Email :** [email protected]

**Bio :**
Auteur de science-fiction passionné par l'intelligence artificielle et les dystopies technologiques. Ancien développeur reconverti dans l'écriture.

**Réseaux sociaux :**
- Twitter : https://x.com/jeandupont
- Instagram : https://instagram.com/jeandupont
- Facebook : https://facebook.com/jeandupont
- Site web actuel : https://ancien-site.fr

---

## DOMAINE

**Option choisie :** Acheter un nom de domaine
(Le client souhaite que tu t'en occupes)

---

## LIVRES (3)

### 1. Les Échos de Kepler-442
**Genres :** Science-Fiction, Cyberpunk, Thriller Techno
**Description :**
Dans un futur proche, l'humanité a colonisé Kepler-442b. Mais une IA rebelle menace la survie de la colonie. Un hacker solitaire doit infiltrer le réseau pour sauver des millions de vies.

**Statistiques :**
- Mots : ~107 000
- Chapitres : 24
- Pages : ~320

**Lien d'achat :** https://amazon.fr/dp/XXXXX
**Couverture :** ✓ Fichier uploadé (voir pièce jointe : couverture_0.jpg)

---

### 2. Synchronisation Charnelle
**Genres :** Cyberpunk, Érotique, Science-Fiction
**Description :**
Dans un monde où les émotions peuvent être partagées via implants neuronaux, deux inconnus vivent une passion interdite qui menace l'ordre établi.

**Statistiques :**
- Mots : ~95 000
- Chapitres : 18
- Pages : ~280

**Lien d'achat :** https://amazon.fr/dp/YYYYY
**Couverture :** ✓ Fichier uploadé (voir pièce jointe : couverture_1.jpg)

---

### 3. Agent LLM : Guide Pratique
**Genres :** Guide Pratique, Développement Personnel, IA
**Description :**
Un guide complet pour développer des agents IA intelligents avec Claude et GPT-4. Exemples concrets, code commenté, et stratégies d'implémentation.

**Statistiques :**
- Mots : ~45 000
- Chapitres : 12
- Pages : ~150

**Lien d'achat :** https://gumroad.com/xxxxx
**Couverture :** ✓ URL fournie (https://exemple.com/cover.jpg)

---

## OPTIONS AVANCÉES

**Newsletter :** MailerLite
**Détails :** API key : ml_abc123xyz (à confirmer avec le client)

**Style/Design préféré :**
Cyberpunk néon avec dominante violette et turquoise. Inspiré de Blade Runner et Ghost in the Shell. Typographie futuriste mais lisible. Dark mode par défaut avec option light mode.

**Analytics (Pack Pro)** : N/A (Pack Catalogue)

**Message libre :**
Je souhaite également une section "Événements" pour annoncer mes salons et dédicaces. Est-ce possible en option ?

---

## PIÈCES JOINTES

- couverture_0.jpg (Livre 1 : Les Échos de Kepler-442)
- couverture_1.jpg (Livre 2 : Synchronisation Charnelle)
(Note : Livre 3 utilise une URL externe)

**OU**
- couvertures.zip (contient toutes les couvertures)

---

## DONNÉES BRUTES (JSON)

```json
{
  "pack": "catalogue",
  "maintenanceAnnuelle": false,
  "domainePersonnalise": true,
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "[email protected]",
  "bioAuteur": "Auteur de science-fiction passionné...",
  "twitter": "https://x.com/jeandupont",
  "instagram": "https://instagram.com/jeandupont",
  "facebook": "https://facebook.com/jeandupont",
  "siteWeb": "https://ancien-site.fr",
  "autreReseau": "",
  "domaineOption": "acheter",
  "domaineExistant": null,
  "livres": [
    {
      "titre": "Les Échos de Kepler-442",
      "genres": "Science-Fiction, Cyberpunk, Thriller Techno",
      "description": "Dans un futur proche...",
      "nombreMots": "~107 000",
      "nombreChapitres": "24",
      "nombrePages": "~320",
      "lienAchat": "https://amazon.fr/dp/XXXXX",
      "couvertureFile": "couverture_0.jpg"
    },
    // ... autres livres
  ],
  "newsletter": "mailerlite",
  "newsletterDetails": "API key : ml_abc123xyz",
  "styleDesign": "Cyberpunk néon avec dominante violette...",
  "analytics": [],
  "messageLibre": "Je souhaite également une section Événements...",
  "prixTotal": 411,
  "dateCommande": "2025-12-23T14:35:22Z"
}
```

---

## PROCHAINES ÉTAPES

1. ✉️ Répondre au client sous 24h pour confirmer la commande
2. 💰 Envoyer le lien de paiement Stripe/PayPal (50% = 206€)
3. 🛠️ Dès paiement reçu : Démarrer le développement
4. 📅 Livraison prévue : J+3 après paiement
5. ✅ Validation client → Paiement solde (50% = 205€) → Mise en ligne

---

Commande reçue le 23/12/2025 à 14:35
```

### Confirmation client

**Email automatique au client :**

**Sujet :**
```
✅ Votre commande de Site Auteur Pro est bien reçue !
```

**Corps :**
```
Bonjour Jean,

Votre demande de Site Auteur Pro (Pack Catalogue) a bien été enregistrée !

Je vais étudier votre projet et revenir vers vous dans les 24h avec :
- Une confirmation détaillée
- Le lien de paiement sécurisé (50% d'acompte : 206€)
- Les prochaines étapes

Récapitulatif de votre commande :
• Pack : Catalogue (399€) + Domaine personnalisé (+12€)
• Total : 411€ (paiement en 2x : 206€ + 205€)
• 3 livres fournis
• Délai : 72h après paiement de l'acompte

Si vous avez la moindre question, n'hésitez pas à me contacter directement.

À très vite,
Patrice Huetz

---
Site : https://patrice-huetz.fr
Email : [email protected]
Twitter : @patricehuetz
```

---

## Améliorations recommandées

### Phase 1.5 (Quick wins)

**1. Sauvegarde automatique (localStorage)**
- Sauvegarde auto toutes les 30 secondes
- Restauration au retour sur la page
- Message : "Brouillon sauvegardé ✓" (discret)

**2. Validation des uploads côté client**
- Vérifier dimensions et ratio des images avant upload
- Feedback immédiat : "⚠️ Cette image est trop petite (800x1200px minimum)"
- Suggestion : "Utilisez une image de meilleure qualité"

**3. Preview immédiate des couvertures**
- Afficher l'image uploadée dans le formulaire
- Bouton "Changer" pour remplacer

**4. Suggestions anti-typo email**
- Détecter "gmial.com", "hotmial.com", etc.
- Proposer correction : "Vouliez-vous dire gmail.com ?"

**5. Progress saving**
- Indicateur "%  complété" global
- Ex: "Votre formulaire est complété à 75%"

**6. Estimation temps restant**
- "Il vous reste environ 5 minutes" (basé sur la moyenne)

### Phase 2 (Fonctionnalités avancées)

**7. Lien de reprise**
- Générer un lien unique pour reprendre plus tard
- Envoi par email : "Reprendre ma commande"
- Expiration : 7 jours

**8. Import automatique depuis APIs**
- Amazon API : ISBN → métadonnées + couverture
- Google Books API : Idem
- Goodreads : Import avis/ratings

**9. Templates de design**
- Galerie de 5 templates visuels
- Preview interactif
- Option "Sur-mesure" reste disponible

**10. Upsell intelligent**
- Si client ajoute 2+ livres en pack Starter :
  - Popup : "💡 Le pack Catalogue (399€) serait plus avantageux pour 20 livres"
  - Calcul économie affiché

**11. Dashboard client (post-commande)**
- Suivi de l'avancement (Paiement reçu → En développement → En révision → Livré)
- Messagerie intégrée
- Possibilité de demander des modifications mineures

**12. Génération automatique du site**
- Webhook → Script qui :
  - Génère le fichier `data.json` pour le template Next.js
  - Clone le repo template
  - Push les données et images
  - Déploie sur Vercel (branche preview)
  - Envoie le lien preview au client

**13. Mode "Catalogue massif" (Pack Pro)**
- Si > 20 livres : Proposer import CSV/Excel
- Template fourni avec instructions
- Validation assistée après import

**14. Intégration paiement**
- Stripe Checkout intégré
- Paiement 50% directement dans le formulaire (étape 5)
- Webhook Stripe → Démarre automatiquement le dev

**15. A/B testing**
- Tester différents wordings
- Optimiser le taux de conversion
- Analytics : Temps par étape, taux d'abandon

---

## Roadmap phase 2

### Objectifs

1. **Automatiser 100% du process** (de la commande au déploiement)
2. **Réduire la charge manuelle** à quasi-zéro
3. **Offrir une expérience premium** (dashboard, preview, etc.)

### Fonctionnalités prioritaires

**Q1 2026 :**
- ✅ Sauvegarde automatique (localStorage)
- ✅ Preview couvertures
- ✅ Validation avancée uploads
- ✅ Templates de design (galerie)
- ✅ Paiement Stripe intégré

**Q2 2026 :**
- ✅ Dashboard client
- ✅ Webhook → Génération auto data.json
- ✅ Import CSV pour gros catalogues
- ✅ APIs Amazon/Google Books

**Q3 2026 :**
- ✅ Déploiement automatique (preview Vercel)
- ✅ Mode "Catalogue massif" avec AI assistance
- ✅ Multilingue (EN/FR)

**Q4 2026 :**
- ✅ Self-service complet (client peut tout gérer seul)
- ✅ Marketplace de templates premium
- ✅ White-label (revendre le service)

---

## Métriques de succès

### KPIs à tracker

**Conversion :**
- Taux de complétion du formulaire (% qui vont jusqu'à l'étape 5)
- Taux de soumission (% qui cliquent "Envoyer")
- Taux de paiement (% qui payent après soumission)

**Engagement :**
- Temps moyen par étape
- Taux d'abandon par étape (identifier les points de friction)
- Taux de retour (bouton "Précédent")

**Qualité :**
- % de commandes avec toutes les couvertures fournies
- % de commandes nécessitant des clarifications
- Score de satisfaction client (NPS post-livraison)

**Objectifs phase 1 (MVP) :**
- ≥ 60% de taux de complétion
- ≥ 80% de taux de soumission (parmi ceux qui atteignent étape 5)
- ≤ 10% de clarifications nécessaires

---

## Contraintes et limitations

### Techniques

- **Upload total** : Max 100 MB par soumission (limite Formspree/Vercel)
- **Nombre de livres** : Limite technique à 100 livres par formulaire (pour éviter timeouts)
- **Formats images** : JPG, PNG, WebP uniquement (pas de GIF, BMP, TIFF)
- **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (2 dernières versions)

### Légales

- **RGPD** : Conformité obligatoire (consentement, droit à l'oubli)
- **CGV** : À rédiger et lier dans le formulaire
- **Politique de confidentialité** : À rédiger
- **Mentions légales** : À rédiger

### Business

- **Capacité de traitement** : Max 10 sites/mois en solo (à ajuster selon charge)
- **Délai 72h** : Garantie uniquement si contenus complets fournis
- **Support** : Email uniquement (pas de téléphone pour MVP)
- **Modifications** : Incluses dans le prix (à préciser : combien de révisions ?)

---

## Documentation à créer

### Pour les clients

1. **FAQ "Site Auteur Pro"**
   - Qu'est-ce qui est inclus dans chaque pack ?
   - Puis-je changer de pack après commande ?
   - Que se passe-t-il si je n'ai pas toutes mes couvertures ?
   - Puis-je ajouter des livres plus tard ?
   - Combien de modifications sont incluses ?

2. **Guide de préparation**
   - Checklist des contenus à préparer avant de commander
   - Conseils pour les couvertures (qualité, format)
   - Comment rédiger une bonne description de livre

3. **Tutoriel upload**
   - Comment uploader plusieurs couvertures
   - Comment créer un fichier ZIP correctement

### Pour toi (process interne)

1. **Workflow de traitement**
   - Checklist : Réception commande → Validation → Paiement → Dev → Livraison
   - Template de réponse email client
   - Process de gestion des paiements

2. **Guide technique**
   - Comment extraire le JSON de l'email
   - Comment l'importer dans le template Next.js
   - Process de déploiement

3. **Template data.json**
   - Structure exacte attendue par le template
   - Mapping champs formulaire → champs data.json

---

## Annexes

### Champs du formulaire (récapitulatif complet)

| Champ | Type | Étape | Obligatoire | Validation |
|-------|------|-------|-------------|------------|
| pack | radio | 1 | ✅ | enum: starter/catalogue/pro |
| maintenanceAnnuelle | checkbox | 1 | ❌ | boolean |
| domainePersonnalise | checkbox | 1 | ❌ | boolean |
| prenom | text | 2 | ✅ | min 2 chars |
| nom | text | 2 | ✅ | min 2 chars |
| email | email | 2 | ✅ | format email RFC 5322 |
| bioAuteur | textarea | 2 | ❌ | max 500 chars |
| twitter | text | 2 | ❌ | - |
| instagram | text | 2 | ❌ | - |
| facebook | text | 2 | ❌ | URL si rempli |
| siteWeb | url | 2 | ❌ | URL valide si rempli |
| autreReseau | text | 2 | ❌ | - |
| domaineOption | radio | 2 | ✅ | enum: existant/acheter/vercel |
| domaineExistant | text | 2 | Conditionnel | si domaineOption=existant |
| livres | array | 3 | ✅ | min 1 livre |
| livres[].titre | text | 3 | ✅ | min 1 char |
| livres[].genres | text | 3 | ✅ | min 1 genre |
| livres[].description | textarea | 3 | ✅ | min 10 chars, max 1000 |
| livres[].nombreMots | text | 3 | ❌ | - |
| livres[].nombreChapitres | text | 3 | ❌ | - |
| livres[].nombrePages | text | 3 | ❌ | - |
| livres[].lienAchat | url | 3 | ❌ | URL valide si rempli |
| livres[].couvertureFile | file | 3 | Conditionnel | JPG/PNG/WebP, max 10MB |
| livres[].couvertureUrl | url | 3 | Conditionnel | URL valide |
| couverturesZip | file | 3 | ❌ | ZIP, max 100MB |
| newsletter | radio | 4 | ✅ | enum: non/mailerlite/substack/autre |
| newsletterDetails | textarea | 4 | Conditionnel | si newsletter ≠ non |
| styleDesign | textarea | 4 | ❌ | max 500 chars |
| analytics | checkbox[] | 4 | ❌ | si pack=pro |
| messageLibre | textarea | 4 | ❌ | max 1000 chars |
| accepteCGV | checkbox | 5 | ✅ | must be true |
| contenusPrets | checkbox | 5 | ✅ | must be true |

**Total :** 30 champs (11 obligatoires + 19 optionnels/conditionnels)

### Tailles estimées

**Temps de remplissage :**
- Étape 1 : 1-2 min
- Étape 2 : 3-5 min
- Étape 3 : 5-15 min (selon nombre de livres)
- Étape 4 : 2-3 min
- Étape 5 : 1-2 min
- **Total : 12-27 min** (selon complexité)

**Poids des données :**
- Texte seul : ~10 KB
- 3 couvertures (JPG ~3MB chacune) : ~9 MB
- ZIP (10 couvertures) : ~30 MB
- **Total moyen : 10-40 MB par soumission**

---

## Contact et support

**Questions sur les spécifications :**
- Email : [email protected]
- Twitter : @patricehuetz

**Repo GitHub :**
- Version React+Vite : `phuetz/patrice-huetz-site` (ancienne)
- Version Next.js : À définir

**Déploiement :**
- Production : https://patrice-huetz-site-next.vercel.app
- Staging : TBD

---

**FIN DES SPÉCIFICATIONS**

*Ce document est évolutif. Toute modification doit être versionnée et datée.*
