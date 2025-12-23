# Page de Commande "Site Auteur Pro"

Ce document explique comment configurer et utiliser la nouvelle page de commande automatisée pour le service "Site Auteur Pro en 72h".

## Fonctionnalités

La page de commande (`/commande-site`) est un formulaire multi-étapes complet qui collecte :

### Étape 1 : Choix du pack
- **Starter** (199€) : 1 livre
- **Catalogue** (399€) : Jusqu'à 20 livres (marqué comme "Populaire")
- **Pro** (699€) : 100+ livres
- Options : Maintenance annuelle, Nom de domaine personnalisé (+12€/an)

### Étape 2 : Informations personnelles
- Nom, prénom, email (obligatoires)
- Bio de l'auteur (max 500 caractères)
- Réseaux sociaux : Twitter/X, Instagram, Facebook, site web, autre
- Gestion du nom de domaine : existant / à acheter / sous-domaine Vercel gratuit

### Étape 3 : Livres
- Formulaire dynamique répétable (nombre de livres limité selon le pack)
- Pour chaque livre :
  - Titre, genre(s), description (obligatoires)
  - Nombre de mots, chapitres, pages (optionnels)
  - Lien d'achat (Amazon, etc.)
  - Couverture : upload de fichier OU URL externe
- Suggestions de genres cliquables (Science-Fiction, Thriller, Cyberpunk, etc.)
- Option alternative : upload d'un fichier ZIP contenant toutes les couvertures

### Étape 4 : Options avancées
- Intégration newsletter : MailerLite, Substack, ou autre service
- Style et design préféré (description libre)
- Analytics (Google Analytics, Umami) pour le pack Pro
- Message libre / demandes spéciales

### Étape 5 : Récapitulatif et validation
- Affichage du récap complet (pack, prix, infos, livres)
- Modalités de paiement : 50% à la commande, 50% à la livraison
- Checkboxes obligatoires :
  - Acceptation des CGV
  - Confirmation que les contenus sont prêts

## Configuration requise

### 1. Configurer Formspree (Recommandé - Solution simple)

**Étape 1 :** Créer un compte sur [formspree.io](https://formspree.io)

**Étape 2 :** Créer un nouveau formulaire et récupérer l'endpoint

**Étape 3 :** Mettre à jour le fichier `/src/pages/OrderFormPage.tsx` ligne ~324 :

```typescript
// Remplacer cette ligne :
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Par votre vrai endpoint Formspree :
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123';
```

**Configuration Formspree recommandée :**
- Activer les uploads de fichiers (couvertures)
- Limite de taille : 20-50MB par fichier
- Email de notification : Ton adresse email
- Template d'email : Tu recevras toutes les données en JSON + les fichiers uploadés en pièces jointes

### 2. Alternative : API Route custom (Avancé)

Si tu préfères gérer l'envoi d'email toi-même, tu peux créer une API route.

**Option A : Serveur Express simple**
```bash
# Créer un dossier server/
npm install express multer nodemailer cors
```

**Option B : Utiliser Basin.io ou Tally.so**
- [Basin](https://usebasin.com/) : Similaire à Formspree, gère les uploads
- [Tally.so](https://tally.so/) : Formulaires avancés gratuits

### 3. Alternative : Webhook Zapier/Make
- Créer un webhook sur Zapier ou Make.com
- Le webhook reçoit les données du formulaire
- Automatiser l'envoi d'email structuré + stockage des fichiers (Google Drive, Dropbox, etc.)

## Structure des données envoyées

Quand le formulaire est soumis, voici les données envoyées :

```json
{
  "pack": "catalogue",
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "[email protected]",
  "maintenanceAnnuelle": false,
  "domainePersonnalise": true,
  "bioAuteur": "Auteur de science-fiction...",
  "twitter": "@jeandupont",
  "instagram": "jeandupont",
  "facebook": "https://facebook.com/jeandupont",
  "siteWeb": "https://ancien-site.fr",
  "autreReseau": "LinkedIn: jean-dupont",
  "domaineOption": "acheter",
  "domaineExistant": null,
  "nombreLivres": 3,
  "livres": [
    {
      "titre": "Les Échos de Kepler-442",
      "genres": "Science-Fiction, Cyberpunk",
      "description": "Un thriller spatial captivant...",
      "nombreMots": "107000",
      "nombreChapitres": "24",
      "nombrePages": "320",
      "lienAchat": "https://amazon.fr/...",
      "couvertureFile": "[FILE]",
      "couvertureUrl": ""
    },
    // ... autres livres
  ],
  "couverturesZip": "[FILE ou null]",
  "newsletter": "mailerlite",
  "newsletterDetails": "API key: abc123xyz",
  "styleDesign": "Cyberpunk néon, couleurs vives...",
  "analytics": ["google", "umami"],
  "messageLibre": "Je voudrais une section blog aussi...",
  "accepteCGV": true,
  "contenusPrets": true,
  "prixTotal": 411
}
```

**Fichiers uploadés :**
- `couverture_0` : Couverture du livre 1
- `couverture_1` : Couverture du livre 2
- `couverture_2` : Couverture du livre 3
- `couverturesZip` : Archive ZIP (si fournie)

## Email reçu

Tu recevras un email avec :

**Sujet :** Nouvelle commande Site Auteur Pro – Jean Dupont – Catalogue

**Corps :**
```
=== NOUVELLE COMMANDE SITE AUTEUR PRO ===

PACK : Catalogue (399€)
Options : Domaine personnalisé (+12€)
PRIX TOTAL : 411€

CLIENT
------
Nom : Jean Dupont
Email : [email protected]
Bio : Auteur de science-fiction...

Réseaux sociaux :
- Twitter : @jeandupont
- Instagram : jeandupont
- Facebook : https://facebook.com/jeandupont

DOMAINE
-------
Option choisie : Acheter un nom de domaine

LIVRES (3)
----------
1. Les Échos de Kepler-442
   Genres : Science-Fiction, Cyberpunk
   Description : Un thriller spatial captivant...
   Stats : ~107000 mots, 24 chapitres, ~320 pages
   Achat : https://amazon.fr/...

2. [Titre livre 2]
   ...

3. [Titre livre 3]
   ...

OPTIONS AVANCÉES
----------------
Newsletter : MailerLite
Détails newsletter : API key: abc123xyz

Style/Design : Cyberpunk néon, couleurs vives...

Analytics : Google Analytics, Umami

Message libre : Je voudrais une section blog aussi...

PAIEMENT
--------
50% à la commande : 206€
50% à la livraison : 205€

=== JSON COMPLET ===
[Toutes les données en JSON pour import facile]
```

**Pièces jointes :**
- `couverture_livre1.jpg`
- `couverture_livre2.png`
- `couverture_livre3.webp`
- `couvertures.zip` (si fourni)

## Validation des données

Le formulaire utilise **Zod** pour la validation côté client :

- **Pack** : Obligatoire
- **Email** : Format email valide
- **Livres** : Au moins 1 livre, titre et genres obligatoires
- **Nombre de livres** : Limité selon le pack (1 pour Starter, 20 pour Catalogue, illimité pour Pro)
- **CGV et confirmation contenus** : Checkboxes obligatoires à l'étape 5

## Parcours utilisateur

1. Utilisateur clique sur "Commander mon site" dans la section Services
2. Il est redirigé vers `/commande-site`
3. Il remplit le formulaire en 5 étapes avec barre de progression
4. À chaque étape, il peut naviguer avec "Précédent" / "Suivant"
5. La validation se fait à chaque changement d'étape
6. À l'étape 5, il voit le récap complet avant soumission
7. Après soumission, il est redirigé vers `/commande-confirmee`
8. Page de confirmation explique les prochaines étapes

## Personnalisation

### Modifier les packs et prix

Éditer `/src/pages/OrderFormPage.tsx` ligne ~56 :

```typescript
const PACK_CONFIGS = {
  starter: { name: 'Starter', price: 199, maxBooks: 1, label: 'Idéal pour débuter' },
  catalogue: { name: 'Catalogue', price: 399, maxBooks: 20, label: 'Le plus populaire', popular: true },
  pro: { name: 'Pro', price: 699, maxBooks: Infinity, label: 'Pour catalogues étendus' },
};
```

### Modifier les genres suggérés

Éditer `/src/pages/OrderFormPage.tsx` ligne ~64 :

```typescript
const GENRES_SUGGESTIONS = [
  'Thriller Techno',
  'Science-Fiction',
  // ... ajouter ou retirer des genres
];
```

### Modifier le CTA dans Services

Éditer `/src/components/Services.tsx` ligne ~91+ pour personnaliser le texte, les couleurs, etc.

## Page de confirmation

La page `/commande-confirmee` affiche :
- Message de succès
- Les 4 prochaines étapes du process
- Délai de réponse (24h)
- Liens de contact (email, Twitter)

## Tests

Pour tester le formulaire :

1. Lancer le serveur de dev :
```bash
npm run dev
```

2. Aller sur `http://localhost:5173/commande-site`

3. Remplir toutes les étapes

4. **Important** : Avant de tester l'envoi réel, configure d'abord Formspree ou utilise un endpoint de test

5. Vérifier que l'email est bien reçu avec toutes les données et fichiers

## TODO

- [ ] Configurer Formspree avec ton vrai endpoint
- [ ] Créer une page CGV (`/cgv`)
- [ ] Tester le formulaire complet end-to-end
- [ ] Vérifier que les uploads de fichiers fonctionnent (limite de taille, formats acceptés)
- [ ] Optionnel : Ajouter un système de paiement Stripe pour automatiser les 50% d'acompte
- [ ] Optionnel : Créer un webhook qui génère automatiquement le fichier `data.json` pour ton template

## Support

Questions ou problèmes ? Vérifier :
1. Les erreurs dans la console du navigateur
2. Que Formspree est bien configuré et l'endpoint est correct
3. Que les fichiers uploadés ne dépassent pas la limite de taille
4. Que tous les champs obligatoires sont remplis
