import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaMapMarkedAlt, FaTimesCircle, FaUsers } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchLieux } from '../../features/lieux/lieuxSlice';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentPlaces from '../../components/dashboard/RecentPlaces';
import type { Lieu } from '../../types';
import api from '../../services/api';

const sortByMostRecent = (left: Lieu, right: Lieu) => {
  const leftDate = new Date(left.updatedAt ?? left.createdAt ?? 0).getTime();
  const rightDate = new Date(right.updatedAt ?? right.createdAt ?? 0).getTime();
  return rightDate - leftDate;
};

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { lieux, isLoading } = useAppSelector((state) => state.lieux);
  const [subscribersCount, setSubscribersCount] = useState(0);

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

  useEffect(() => {
    let isActive = true;

    const loadSubscribersCount = async () => {
      try {
        const response = await api.get('/newsletterSubscribers');
        if (isActive && Array.isArray(response.data)) {
          setSubscribersCount(response.data.length);
        }
      } catch {
        if (isActive) {
          setSubscribersCount(0);
        }
      }
    };

    loadSubscribersCount();

    return () => {
      isActive = false;
    };
  }, []);

  const activePlaces = useMemo(
    () => lieux.filter((place) => place.statut === 'actif').length,
    [lieux]
  );

  const inactivePlaces = lieux.length - activePlaces;

  const categoryDistribution = useMemo(() => {
    return lieux.reduce<Record<string, number>>((distribution, place) => {
      distribution[place.categorie] = (distribution[place.categorie] ?? 0) + 1;
      return distribution;
    }, {});
  }, [lieux]);

  const recentPlaces = useMemo(
    () => [...lieux].sort(sortByMostRecent).slice(0, 5),
    [lieux]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de bord admin</h1>
          <p className="text-gray-600">Vue globale des lieux et acces rapide aux actions de gestion.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total des lieux"
            value={lieux.length}
            icon={<FaMapMarkedAlt />}
            bgColor="bg-blue-600"
            textColor="text-blue-700"
          />
          <StatCard
            title="Lieux actifs"
            value={activePlaces}
            icon={<FaCheckCircle />}
            bgColor="bg-emerald-600"
            textColor="text-emerald-700"
          />
          <StatCard
            title="Lieux inactifs"
            value={inactivePlaces}
            icon={<FaTimesCircle />}
            bgColor="bg-red-600"
            textColor="text-red-700"
          />
          <StatCard
            title="Abonnes newsletter"
            value={subscribersCount}
            icon={<FaUsers />}
            bgColor="bg-indigo-600"
            textColor="text-indigo-700"
          />
        </div>

        <QuickActions />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Repartition par categorie</h2>
            {isLoading ? (
              <p className="text-sm text-gray-600">Chargement des statistiques...</p>
            ) : Object.keys(categoryDistribution).length === 0 ? (
              <p className="text-sm text-gray-600">Aucune categorie disponible.</p>
            ) : (
              <ul className="space-y-3">
                {Object.entries(categoryDistribution)
                  .sort((left, right) => right[1] - left[1])
                  .map(([category, count]) => (
                    <li key={category} className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <span className="text-sm text-gray-700">{category}</span>
                      <span className="text-sm font-semibold text-gray-900">{count}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <RecentPlaces lieux={recentPlaces} onViewAll={() => navigate('/admin/lieux')} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
