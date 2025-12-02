import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "../Components/Layout";
import { usePage } from "@inertiajs/react";
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

// Variantes d'animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth;

    console.log(auth);

    console.log(user);

    return (
        <Layout>
            <motion.div 
                initial="hidden"
                animate="show"
                variants={container}
                className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8"
            >
                <motion.div variants={item} className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
                    <div className="p-6">
                        <motion.div variants={item} className="flex items-center mb-8">
                            <div className="p-3 rounded-full bg-indigo-900/50 border border-indigo-700/50 mr-4">
                                <Icons.User className="h-8 w-8 text-indigo-400" />
                            </div>
                            <h1 className="text-3xl font-bold text-white">Mon Profil</h1>
                        </motion.div>
                        
                        <motion.div variants={container} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div variants={item} className="space-y-4">
                                <div className="bg-gray-700/30 backdrop-blur-sm p-6 rounded-xl border border-gray-600/30">
                                    <h2 className="text-lg font-medium text-white mb-6 flex items-center">
                                        <Icons.Info className="mr-2 h-5 w-5 text-indigo-400" />
                                        Informations personnelles
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-400">Nom complet</p>
                                            <p className="mt-1 text-base text-white">{user?.name || 'Non spécifié'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400">Email</p>
                                            <p className="mt-1 text-base text-white">{user?.email || 'Non spécifié'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400">Date d'inscription</p>
                                            <p className="mt-1 text-base text-white">
                                                {user?.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'Non disponible'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={item} className="space-y-4">
                                <div className="bg-gray-700/30 backdrop-blur-sm p-6 rounded-xl border border-gray-600/30">
                                    <h2 className="text-lg font-medium text-white mb-6 flex items-center">
                                        <Icons.Settings className="mr-2 h-5 w-5 text-indigo-400" />
                                        Actions
                                    </h2>
                                    <div className="space-y-4">
                                        <Link 
                                            href="/profile/edit"
                                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <Icons.Edit3 className="mr-2 h-4 w-4" />
                                            Modifier le profil
                                        </Link>
                                        <Link 
                                            href="/change-password"
                                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                        >
                                            <Icons.Lock className="mr-2 h-4 w-4" />
                                            Changer le mot de passe
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        <motion.div variants={item} className="mt-8">
                            <Link 
                                href="/" 
                                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                            >
                                <Icons.ArrowLeft className="mr-1 h-4 w-4" />
                                Retour à l'accueil
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </Layout>
    );
}