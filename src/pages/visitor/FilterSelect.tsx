import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../app/store';
import { setStatusFilter, setCategoryFilter } from '../../features/lieux/lieuxSlice';
import { LieuStatus } from '../../types';

const FilterSelect = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { lieux, statusFilter, categoryFilter } = useSelector((state: RootState) => state.lieux);

    const statuses = React.useMemo(() => Object.values(LieuStatus), []);

    const categories = React.useMemo(() => {
      const setCats = new Set<string>();
      lieux.forEach((l) => l.categorie && setCats.add(l.categorie));
      return Array.from(setCats);
    }, [lieux]);

    return (
      <div className="flex gap-3">
        <select
          value={categoryFilter || ''}
          onChange={(e) => dispatch(setCategoryFilter(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Toutes catégories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={statusFilter || ''}
          onChange={(e) => dispatch(setStatusFilter(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tous statuts</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    );
}

export default FilterSelect