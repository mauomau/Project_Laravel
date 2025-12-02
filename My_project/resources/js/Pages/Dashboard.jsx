import React from 'react';
import { Link } from '@inertiajs/react';
import Layout from '../Components/Layout';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { NotificationContext } from '../Components/Notification';
import { useNotification } from '../Components/Notification';

export default function Dashboard() {
  const { auth } = usePage().props;
  
  // Données factices pour les statistiques (à remplacer par vos données réelles)
  const stats = [
    { name: 'Tâches terminées', value: '12', change: '+2', changeType: 'increase' },
    { name: 'Projets actifs', value: '3', change: '+1', changeType: 'increase' },
    { name: 'Messages non lus', value: '5', change: '-2', changeType: 'decrease' },
  ];

  const quickActions = [
    { name: 'Nouveau projet', href: '/projects/create', icon: <Icons.Folder /> },
    { name: 'Voir le calendrier', href: '/calendar', icon: <Icons.Calendar /> },
    { name: 'Voir les rapports', href: '/reports', icon: <Icons.BarChart /> },
  ];

  return (
    <Layout>
      <Head title="Tableau de bord" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bannière de démonstration */}
          <div className="mb-6 bg-yellow-900/30 border-l-4 border-yellow-400/50 p-4 rounded-r-lg backdrop-blur-sm">
            <div className="flex">
              <div className="shrink-0">
                <Icons.Info className="h-5 w-5 text-yellow-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-100">
                  Ceci est une <span className="font-medium">maquette de démonstration</span>. Les données affichées sont factices.
                </p>
              </div>
            </div>
          </div>
          {/* En-tête avec bienvenue */}
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
              <h2 className="flex flex-row gap-2 text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
                Bonjour, {auth?.name || 'Bienvenue'} <Icons.Hand className="size-6 text-yellow-300" />
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                Voici un aperçu de votre activité récente
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4
            ">
              <Link
                href="/profile"
                className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Voir mon profil
              </Link>
            </div>
          </div>

          <MonBouton />

          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                <div className="px-6 py-7 sm:p-6">
                  <dt className="text-sm font-medium text-gray-300 truncate">
                    {stat.name}
                  </dt>
                  <dd className="mt-2 text-4xl font-bold text-white">
                    {stat.value}
                  </dd>
                  <div className={`mt-3 inline-flex items-center text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                    {stat.changeType === 'increase' ? (
                      <Icons.ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <Icons.ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {stat.change} par rapport à la semaine dernière
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions rapides */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden mb-8">
            <div className="px-6 py-5 sm:px-6 border-b border-white/10">
              <h3 className="text-lg leading-6 font-medium text-white">Actions rapides</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-300">
                Accédez rapidement aux fonctionnalités principales
              </p>
            </div>
            <div className="divide-y divide-white/5">
              <dl>
                {quickActions.map((action) => (
                  <div key={action.name} className="px-6 py-4 hover:bg-white/5 transition-colors duration-200 group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
                          {React.cloneElement(action.icon, { className: 'w-5 h-5 mr-3' })}
                        </span>
                        <dt className="text-sm font-medium text-gray-200">
                          {action.name}
                        </dt>
                      </div>
                      <dd className="text-sm">
                        <Link href={action.href} className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center group-hover:translate-x-1 transition-all duration-200">
                          Accéder <Icons.ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Section d'activité récente */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-5 sm:px-6 border-b border-white/10">
              <h3 className="text-lg leading-6 font-medium text-white">Activité récente</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-300">
                Votre activité des 7 derniers jours
              </p>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Icons.Clock className="mx-auto h-12 w-12 text-gray-500/50" />
                <h3 className="mt-2 text-sm font-medium text-gray-300">Aucune activité récente</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Votre activité récente s'affichera ici
                </p>
                <div className="mt-6">
                  <Link
                    href="#"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
                  >
                    <Icons.PlusCircle className="-ml-1 mr-2 h-5 w-5" />
                    Nouvelle activité
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MonBouton() {
  const { showNotification } = useNotification();  // Utilisez le hook

  const handleClick = () => {
    showNotification(
      'Bonjour !',
      'Ceci est un message de test',
      'info',
      3000
    );
  };

  return (
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Cliquez-moi
    </button>
  );
}