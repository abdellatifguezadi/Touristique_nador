import type { Lieu } from '../../types';

interface RecentPlacesProps {
  lieux: Lieu[];
  onViewAll: () => void;
}

const getStatusBadge = (status: Lieu['statut']) => {
  if (status === 'inactif') {
    return 'bg-red-100 text-red-800';
  }

  return 'bg-emerald-100 text-emerald-800';
};

const formatDate = (dateValue?: string) => {
  if (!dateValue) {
    return '-';
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

const RecentPlaces = ({ lieux, onViewAll }: RecentPlacesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Lieux recents</h2>
        <button
          onClick={onViewAll}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium px-0 py-0 border-none bg-transparent"
        >
          Voir tout
        </button>
      </div>

      {lieux.length === 0 ? (
        <p className="text-sm text-gray-600">Aucun lieu disponible pour le moment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Categorie</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Derniere modification</th>
              </tr>
            </thead>
            <tbody>
              {lieux.map((place) => (
                <tr key={place.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{place.nom}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{place.categorie}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(place.statut)}`}>
                      {place.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {formatDate(place.updatedAt ?? place.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentPlaces;
