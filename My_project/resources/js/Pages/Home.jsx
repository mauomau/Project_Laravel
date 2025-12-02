import React from 'react';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

const features = [
  {
    name: 'Interface Moderne',
    description: 'Design élégant et intuitif pour une expérience utilisateur optimale',
    icon: <Icons.Palette className="h-8 w-8 text-indigo-400" />,
  },
  {
    name: 'Sécurisé',
    description: 'Protection des données et authentification robuste',
    icon: <Icons.ShieldCheck className="h-8 w-8 text-indigo-400" />,
  },
  {
    name: 'Rapide',
    description: 'Performances optimisées pour un chargement ultra-rapide',
    icon: <Icons.Zap className="h-8 w-8 text-indigo-400" />,
  },
  {
    name: 'Réactif',
    description: 'S\'adapte parfaitement à tous les appareils',
    icon: <Icons.Smartphone className="h-8 w-8 text-indigo-400" />,
  },
];

export default function Home() {
  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={container}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white"
    >
      <Head title="Accueil" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-gray-200">Bienvenue sur</span>
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Mon Application
              </span>
            </h1>
            <motion.p 
              variants={fadeIn}
              className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 sm:text-xl md:mt-6"
            >
              Une expérience moderne et fluide avec Laravel, Inertia.js et React
            </motion.p>
            <motion.div 
              variants={fadeIn}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/login"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
              >
                Se connecter
              </Link>
              <Link
                href="/register"
                className="px-8 py-3 border border-indigo-400 text-base font-medium rounded-lg text-indigo-100 bg-indigo-900/30 hover:bg-indigo-800/50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
              >
                S'inscrire
              </Link>
            </motion.div>
            
            <div className="mt-8 text-center">
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
              >
                En savoir plus
              </a>
            </div>
            
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-blue-900/20 to-indigo-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-indigo-500/10 text-indigo-400">
              Fonctionnalités
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Une expérience exceptionnelle
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Découvrez ce qui rend notre application unique
            </p>
          </motion.div>

          <motion.div 
            variants={container}
            className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                variants={item}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-indigo-400/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-300 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div 
            variants={fadeIn}
            className="lg:w-2/3"
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Prêt à commencer ?</span>
              <span className="block text-indigo-200">Créez votre compte dès maintenant.</span>
            </h2>
            <p className="mt-3 text-lg text-indigo-100">
              Rejoignez notre communauté et découvrez une nouvelle façon de gérer vos projets.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            className="mt-8 flex lg:mt-0 lg:shrink-0"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              S'inscrire gratuitement
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
