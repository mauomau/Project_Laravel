import React from "react";
import { useForm, Link } from "@inertiajs/react";
import Layout from "../Components/Layout";
import { useNotification } from "../Components/Notification";
import { motion } from "framer-motion";
import * as Icons from 'lucide-react';

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

export default function Login() {
  const { showNotification } = useNotification(); // Ajoutez cette ligne

  const form = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    form.post("/login", {
      onError: () => form.reset("password"),
      onSuccess: () => {
        form.reset();
        showNotification("Connexion reussie", "success");
      },
    });
  };

  return (
    <Layout>
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md">
          <motion.div variants={fadeIn} className="text-center">
            <div className="flex justify-center">
              <Icons.Lock className="h-12 w-12 text-indigo-500" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Connexion à votre compte
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Ou{" "}
              <Link
                href="/register"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                créez un nouveau compte
              </Link>
            </p>
          </motion.div>

          <motion.form 
            variants={container}
            onSubmit={submit} 
            className="mt-8 space-y-6"
          >
            <motion.div variants={item}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Adresse email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.data.email}
                  onChange={(e) => form.setData("email", e.target.value)}
                  required
                  className="bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent block w-full pl-10 sm:text-sm rounded-md p-3 transition-all duration-200"
                  placeholder="votre@email.com"
                />
              </div>
              {form.errors.email && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <Icons.AlertCircle className="h-4 w-4 mr-1" />
                  {form.errors.email}
                </p>
              )}
            </motion.div>

            <motion.div variants={item}>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Mot de passe
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-400 hover:text-indigo-300">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icons.Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={form.data.password}
                  onChange={(e) => form.setData("password", e.target.value)}
                  required
                  className="bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent block w-full pl-10 sm:text-sm rounded-md p-3 transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
              {form.errors.password && (
                <p className="mt-2 text-sm text-red-400 flex items-center">
                  <Icons.AlertCircle className="h-4 w-4 mr-1" />
                  {form.errors.password}
                </p>
              )}
            </motion.div>

            <motion.div variants={item} className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={form.data.remember}
                onChange={(e) => form.setData("remember", e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 bg-gray-800 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-300"
              >
                Se souvenir de moi
              </label>
            </motion.div>

            <motion.div variants={item}>
              <button
                type="submit"
                disabled={form.processing}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                  form.processing ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {form.processing ? (
                  <>
                    <Icons.Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <Icons.LogIn className="-ml-1 mr-2 h-5 w-5" />
                    Se connecter
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>

          <motion.div 
            variants={fadeIn}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Nouveau ici ?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <Icons.UserPlus className="-ml-1 mr-2 h-5 w-5" />
                Créer un compte
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}
