import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLieux } from '../../features/lieux/lieuxSlice';
import type { RootState, AppDispatch } from '../../app/store';
import LieuCard from './LieuCard';

const LieuxList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { lieux, isLoading, error } = useSelector((state: RootState) => state.lieux);

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lieux.map((lieu) => (
          <LieuCard key={lieu.id} lieu={lieu} />
        ))}
      </div>
    </div>
  );
};

export default LieuxList;