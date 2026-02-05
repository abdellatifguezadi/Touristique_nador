import { useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaChartLine, FaComments, FaUsers } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { fetchLieux, addLieu } from '../../features/lieux/lieuxSlice';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import AddPlaceForm from '../../components/forms/AddPlaceForm';
import type { FormData } from '../../components/forms/AddPlaceForm';
import { toast } from 'react-toastify';
import type { Lieu } from '../../types';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useAppDispatch();
  const { lieux } = useAppSelector((state) => state.lieux);

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

  const handleSubmit = async (data: FormData) => {
    try {
      await dispatch(addLieu(data)).unwrap();
      toast.success('Lieu ajouté avec succès!');
      setShowForm(false);
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du lieu');
      console.error('Error adding place:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tableau de Bord</h1>
            <p className="text-gray-600">Bienvenue dans votre espace d'administration</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {showForm ? '✕ Fermer' : '+ Ajouter un Lieu'}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <AddPlaceForm onSubmit={handleSubmit} onCancel={handleCancel} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total des Lieux"
            value={lieux.length.toString()}
            icon={<FaMapMarkedAlt />}
            bgColor="bg-blue-500"
            textColor="text-blue-600"
          />
          <StatCard
            title="Lieux Actifs"
            value={lieux.filter((l: Lieu) => l.statut === 'actif').length.toString()}
            icon={<FaChartLine />}
            bgColor="bg-green-500"
            textColor="text-green-600"
          />
          <StatCard
            title="Catégories"
            value={new Set(lieux.map((l: Lieu) => l.categorie)).size.toString()}
            icon={<FaComments />}
            bgColor="bg-purple-500"
            textColor="text-purple-600"
          />
          <StatCard
            title="Vues ce Mois"
            value="1,234"
            icon={<FaUsers />}
            bgColor="bg-orange-500"
            textColor="text-orange-600"
          />
        </div>

        <div className="mb-8">
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
