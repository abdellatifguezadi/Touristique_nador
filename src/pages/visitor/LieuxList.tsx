import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLieux } from '../../features/lieux/lieuxSlice';
import type { RootState, AppDispatch } from '../../app/store';
import LieuCard from './LieuCard';
import SearchInput from './SearchInput';
import FilterSelect from './FilterSelect';

const LieuxList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { lieux, isLoading, error, searchQuery, statusFilter, categoryFilter } = useSelector((state: RootState) => state.lieux);

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

  const filteredLieux = useMemo(() => {
    return lieux.filter((lieu) => {
      const matchesSearch = !searchQuery || [lieu.nom, lieu.categorie, lieu.description]
        .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = !statusFilter || (lieu.statut === statusFilter);
      const matchesCategory = !categoryFilter || (lieu.categorie && lieu.categorie.toLowerCase() === categoryFilter.toLowerCase());
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [lieux, searchQuery, statusFilter, categoryFilter]);

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

      <div className="mb-6 flex gap-4 items-center">
        <div className="flex-1">
          <SearchInput />
        </div>
        <div className="w-56">
          <FilterSelect />
        </div>
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