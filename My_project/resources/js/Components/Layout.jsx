import React, { useState, Fragment } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { X, Menu as MenuIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';

// Styles d'animation pour le fond
const styles = `
  @keyframes gradientMove {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }
  
  .bg-animated {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(135deg, rgba(49, 46, 129, 0.1) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(30, 58, 138, 0.1) 100%);
    background-size: 200% 200%;
    animation: gradientMove 20s ease infinite;
  }
  
  .bg-pattern {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0.1;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

// Ajout des styles au document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const currentRoute = usePage().url;

    // Fonction pour vérifier si un lien est actif
    const isActive = (route) => {
        return currentRoute === route || currentRoute.startsWith(route + "/");
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-200 relative overflow-x-hidden">
            {/* Animation de fond */}
            <div className="bg-animated"></div>
            <div className="bg-pattern"></div>
            {/* Navigation */}
            <nav className="fixed backdrop-blur-sm top-0 left-0 right-0 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 border-b border-indigo-800/30 shadow-xl z-50">
                <div className="pt-safe">
                <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex">
                            <Link href="/" className="flex-shrink-0 flex items-center group">
                            <Icons.Palette className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
                            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                                ArtisanHub
                            </span>
                        </Link>
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-2">
                                {auth ? (
                                    // Navigation pour utilisateur connecté
                                    <>
                                        <NavLink
                                            href="/dashboard"
                                            active={isActive("/dashboard")}
                                        >
                                            Tableau de bord
                                        </NavLink>
                                        <NavLink
                                            href="/profile"
                                            active={isActive("/profile")}
                                        >
                                            Mon profil
                                        </NavLink>
                                    </>
                                ) : (
                                    // Navigation pour visiteur
                                    <>
                                        <NavLink
                                            href="/login"
                                            active={isActive("/login")}
                                        >
                                            Connexion
                                        </NavLink>
                                        <NavLink
                                            href="/register"
                                            active={isActive("/register")}
                                        >
                                            Incription
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                        {auth && (
                            <div className="hidden sm:ml-4 sm:flex sm:items-center space-x-4">
                                <ThemeProvider />
                                <Menu as="div" className="relative">
                                    <Menu.Button 
                                        className="flex items-center space-x-2 focus:outline-none"
                                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    >
                                        <span className="sr-only">Ouvrir le menu utilisateur</span>
                                        <div className="relative">
                                            <Icons.User className="h-8 w-8 rounded-full bg-primary/10 text-primary p-1.5 transition-colors duration-200" />
                                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                                        </div>
                                        <span className="hidden md:inline text-sm font-medium text-foreground">
                                            {auth?.user?.name || 'Mon compte'}
                                        </span>
                                        <Icons.ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
                                    </Menu.Button>
                                    <Transition
                                        show={profileMenuOpen}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items 
                                            static
                                            className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 border border-border/50 backdrop-blur-sm"
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/profile"
                                                            className={`${active ? 'bg-accent text-foreground' : 'text-foreground'} block px-4 py-2 text-sm`}
                                                        >
                                                            <div className="flex items-center">
                                                                <Icons.User className="mr-2 h-4 w-4" />
                                                                Mon profil
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/settings"
                                                            className={`${active ? 'bg-accent text-foreground' : 'text-foreground'} block px-4 py-2 text-sm`}
                                                        >
                                                            <div className="flex items-center">
                                                                <Icons.Settings className="mr-2 h-4 w-4" />
                                                                Paramètres
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href="/logout"
                                                            method="post"
                                                            as="button"
                                                            className={`${active ? 'bg-accent text-foreground' : 'text-foreground'} w-full text-left block px-4 py-2 text-sm`}
                                                        >
                                                            <div className="flex items-center">
                                                                <Icons.LogOut className="mr-2 h-4 w-4" />
                                                                Déconnexion
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </nav>

            <div className="pt-16 min-h-screen">
                <main className="relative z-10">
                    {/* Contenu principal */}
                    <div className="py-10 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="relative">
                                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Pied de page */}
                <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-10">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <nav className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
                            <p className="text-center text-gray-400 text-sm">
                                &copy; {new Date().getFullYear()} Mon Application. Tous droits réservés.
                            </p>
                        </nav>
                    </div>
                </footer>
            </div>
        </div>
    );
}

// Composant réutilisable pour les liens de navigation
function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`${active 
                ? 'border-primary text-foreground bg-primary/10' 
                : 'border-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground'
            } inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200`}
        >
            {children}
        </Link>
    );
}
