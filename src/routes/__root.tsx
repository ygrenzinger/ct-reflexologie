import type { ReactNode } from 'react'
import { createRootRoute, HeadContent, Link, Outlet, Scripts } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import appCss from '../styles.css?url'

const links = [['/', 'Accueil'], ['/reflexologie', 'La réflexologie'], ['/a-propos', 'À propos'], ['/prestations', 'Accompagnements'], ['/contact', 'Contact']] as const

function Shell() {
  const [open, setOpen] = useState(false)
  return <div className="site-shell">
    <a className="skip-link" href="#contenu">Aller au contenu</a>
    <header className="site-header">
      <Link to="/" className="brand" aria-label="CT Réflexologie — accueil"><img src={`${import.meta.env.BASE_URL}assets/logo.svg`} alt="CT Réflexologie" /></Link>
      <nav className={open ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">
        {links.map(([to, label]) => <Link key={to} to={to} activeProps={{ className: 'active' }} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>Prendre rendez-vous</Link>
      </nav>
      <button className="menu-button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
    <main id="contenu"><Outlet /></main>
    <Footer />
  </div>
}

function Footer() { return <footer className="site-footer"><div className="footer-grid"><div><img className="footer-logo" src={`${import.meta.env.BASE_URL}assets/logo-cream.svg`} alt="CT Réflexologie" /><p>Claire Thonnelier — Réflexologue plantaire certifiée, affiliée à la Fédération Française de Réflexologie.</p></div><div><h2>Le cabinet</h2><p>1 rue de la Halbarderie<br />44470 Thouaré-sur-Loire</p><a href="tel:+33684448183">06 84 44 81 83</a><br /><a href="mailto:contact@ct-reflexologie.fr">contact@ct-reflexologie.fr</a></div><div><h2>Horaires</h2><p>Lundi · 8h – 19h30<br />Mercredi matin · 8h – 13h30<br />Vendredi · 8h – 19h30<br />Samedi matin · 8h – 13h30</p></div></div><div className="footer-bottom"><span>© 2026 CT Réflexologie — Claire Thonnelier</span><Link to="/mentions-legales">Mentions légales</Link></div></footer> }

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'CT Réflexologie — Claire Thonnelier' },
      { name: 'description', content: 'Claire Thonnelier, réflexologue plantaire certifiée à Thouaré-sur-Loire.' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return <RootDocument><Shell /></RootDocument>
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="fr"><head><HeadContent /></head><body>{children}<Scripts /></body></html>
}
