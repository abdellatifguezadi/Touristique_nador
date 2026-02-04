import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLieux } from '../../features/lieux/lieuxSlice';
import type { RootState, AppDispatch } from '../../app/store';

const LieuDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { lieux, isLoading, error } = useSelector((state: RootState) => state.lieux);
  const lieu = lieux.find(l => l.id === Number(id));

  useEffect(() => {
    if (lieux.length === 0) {
      dispatch(fetchLieux());
    }
  }, [dispatch, lieux.length]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={() => navigate('/lieux')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  if (!lieu) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Lieu non trouvé</h2>
        <p className="text-gray-700 mb-6">Le lieu que vous recherchez n'existe pas.</p>
        <button
          onClick={() => navigate('/lieux')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Retour à la liste
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg mb-6 transition-colors"
        onClick={() => navigate('/lieux')}
      >
        ← Retour
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image principale */}
        <div className="relative w-full h-96 overflow-hidden">
          <img
            src={lieu.photos[0]}
            alt={lieu.nom}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-blue-500 bg-opacity-90 text-white px-4 py-2 rounded-full font-semibold">
            {lieu.categorie}
          </span>
        </div>

        {/* En-tête */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{lieu.nom}</h1>
          <p className="text-lg text-gray-600">📍 {lieu.adresse}</p>
        </div>

        {/* Description */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{lieu.description}</p>
        </div>

        {/* Tarifs */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tarifs</h2>
          <p className="text-green-600 text-xl font-semibold">{lieu.tarifs}</p>
        </div>

        {/* Horaires */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Horaires</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(lieu.horaires).map(([jour, horaire]) => (
              <div key={jour} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-800 capitalize">{jour}</span>
                <span className="text-gray-600">{horaire}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Moyens de transport */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Comment s'y rendre</h2>
          <div className="flex flex-wrap gap-3">
            {lieu.moyens_transport.map((moyen, index) => (
              <span key={index} className="bg-gray-100 px-4 py-2 rounded-full text-gray-800 font-medium">
                🚗 {moyen}
              </span>
            ))}
          </div>
        </div>

        {/* Accessibilité */}
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accessibilité</h2>
          <p className="text-gray-700 text-lg">♿ {lieu.accessibilite}</p>
        </div>

        {/* Galerie photos */}
        {lieu.photos.length > 1 && (
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Galerie photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lieu.photos.slice(1).map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${lieu.nom} - ${index + 2}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LieuDetails;