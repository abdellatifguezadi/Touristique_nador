const RecentPlaces = () => {
    // Static data for now
    const recentPlaces = [
        {
            id: 1,
            nom: 'Lagune de Marchica',
            categorie: 'Sites naturels',
            statut: 'actif',
            dateModif: '2026-02-03'
        },
        {
            id: 2,
            nom: 'Plage de Charrana',
            categorie: 'Plages',
            statut: 'actif',
            dateModif: '2026-02-02'
        },
        {
            id: 3,
            nom: 'Mont Gourougou',
            categorie: 'Sites naturels',
            statut: 'actif',
            dateModif: '2026-02-01'
        }
    ];

    const getStatusBadge = (statut: string) => {
        const colors = {
            actif: 'bg-green-100 text-green-800',
            inactif: 'bg-red-100 text-red-800',
            brouillon: 'bg-yellow-100 text-yellow-800'
        };
        return colors[statut as keyof typeof colors] || colors.actif;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Lieux Récents</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir tout →
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nom</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Catégorie</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Statut</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Dernière modification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPlaces.map((place) => (
                            <tr key={place.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-800 font-medium">{place.nom}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{place.categorie}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(place.statut)}`}>
                                        {place.statut}
                                    </span>
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {new Date(place.dateModif).toLocaleDateString('fr-FR')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentPlaces;
