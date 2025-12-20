# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Site personnel de Patrice Huetz - Auteur de science-fiction et développeur IA.

## Development Commands

```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production build to dist/
npm run preview  # Preview production build locally
```

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Forms:** Formspree (à configurer)

## Architecture

Single-page application avec sections verticales :

```
src/
├── App.tsx              # Root component
├── main.tsx             # React DOM entry point
├── index.css            # Tailwind directives
└── components/
    ├── Navigation.tsx   # Navbar sticky avec menu mobile
    ├── Hero.tsx         # Banner principal (Auteur + Développeur)
    ├── Books.tsx        # Showcase des livres
    ├── Services.tsx     # Services IT (IA, Python, etc.)
    ├── About.tsx        # Biographie et compétences
    ├── Contact.tsx      # Formulaire de contact
    └── Footer.tsx       # Footer
```

## Design

- **Couleur primaire:** Indigo-500 (livres, auteur)
- **Couleur secondaire:** Emerald-500 (services IT)
- **Fond:** Slate-900 (header/footer), White/Slate-50 (sections)

## Deployment

Le site est prévu pour être déployé sur Vercel.

## TODO

- [ ] Configurer l'endpoint Formspree dans Contact.tsx
- [ ] Ajouter les vraies images de couvertures de livres
- [ ] Acheter le domaine patrice-huetz.fr
