import { useNavigate } from 'react-router-dom';
import type { Lieu } from '../../types';

interface LieuCardProps {
  lieu: Lieu;
}

const LieuCard = ({ lieu }: LieuCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl"
      onClick={() => navigate(`/lieux/${lieu.id}`)}
    >
      <img
        src={lieu.photos[0]}
        alt={lieu.nom}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{lieu.nom}</h3>
        <p className="text-gray-600 text-sm mb-2">{lieu.categorie}</p>
        <p className="text-sm text-gray-700 mb-4">{lieu.description.substring(0, 100)}...</p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200"
        >
          Voir détails
        </button>
      </div>
    </div>
  );
};

export default LieuCard;
