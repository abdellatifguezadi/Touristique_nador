import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLieux } from '../../features/lieux/lieuxSlice';
import type { RootState, AppDispatch } from '../../app/store';
import LieuCard from './LieuCard';
import SearchInput from './SearchInput';

const LieuxList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { lieux, isLoading, error, searchQuery } = useSelector((state: RootState) => state.lieux);

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

  const filteredLieux = useMemo(() => {
    if (!searchQuery) return lieux;
    return lieux.filter((lieu) =>
      lieu.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lieu.categorie.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lieu.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [lieux, searchQuery]);

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p>Chargement des lieux...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Lieux Touristiques</h1>

      <div className="mb-6">
        <SearchInput />
      </div>

      {filteredLieux.length === 0 ? (
        <div className="text-center p-8 text-gray-600">
          <p>Aucun lieu trouvé pour "{searchQuery}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLieux.map((lieu) => (
            <LieuCard key={lieu.id} lieu={lieu} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LieuxList;