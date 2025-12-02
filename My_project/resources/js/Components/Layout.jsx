import React from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import * as Icons from 'lucide-react';
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

    const currentRoute = usePage().url;

    // Fonction pour vérifier si un lien est actif
    const isActive = (route) => {
        return currentRoute === route || currentRoute.startsWith(route + "/");
    };

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 relative overflow-x-hidden">
            {/* Animation de fond */}
            <div className="bg-animated"></div>
            <div className="bg-pattern"></div>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-indigo-900/90 to-blue-900/90 backdrop-blur-sm border-b border-indigo-800/30 shadow-xl z-50">
                <div className="pt-safe">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link
                                    href="/"
                                    className="text-xl font-bold text-white hover:text-indigo-300 transition-colors flex items-center"
                                >
                                    <Icons.Home className="w-5 h-5 mr-2 text-indigo-400" />
                                    MonApp
                                </Link>
                            </div>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
                            <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                <button
                                    onClick={() => {
                                        setIsLoggingOut(true);
                                        router.post(
                                            "/logout",
                                            {},
                                            {
                                                onFinish: () =>
                                                    setIsLoggingOut(false),
                                            }
                                        );
                                    }}
                                    disabled={isLoggingOut}
                                    type="button"
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${
                                        isLoggingOut
                                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    }`}
                                >
                                    {isLoggingOut ? (
                                        <>
                                            <Icons.Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                            Déconnexion...
                                        </>
                                    ) : (
                                        <>
                                            <Icons.LogOut className="-ml-1 mr-2 h-4 w-4" />
                                            Déconnexion
                                        </>
                                    )}
                                </button>
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
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Pied de page */}
                <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 mt-10">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-gray-400 text-sm">
                            &copy; {new Date().getFullYear()} Mon Application. Tous droits réservés.
                        </p>
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
                ? 'border-indigo-400 text-white' 
                : 'border-transparent text-gray-300 hover:border-gray-400 hover:text-white'
            } inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200`}
        >
            {children}
        </Link>
    );
}
