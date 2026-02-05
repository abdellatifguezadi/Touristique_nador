import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/store';
import AddPlaceForm, { type FormData } from '../../components/forms/AddPlaceForm';
import {
  addLieu,
  deleteLieu,
  fetchLieux,
  toggleLieuStatus,
  updateLieu,
} from '../../features/lieux/lieuxSlice';
import type { Lieu, LieuStatus } from '../../types';
import { PLACE_CATEGORIES } from '../../types';

type SortField = 'nom' | 'categorie' | 'createdAt' | 'updatedAt' | 'statut';

const formatDate = (value?: string) => {
  if (!value) {
    return '-';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
};

const getTimestamp = (value?: string) => {
  if (!value) {
    return 0;
  }

  const parsedDate = new Date(value).getTime();
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
};

const compareBySortField = (left: Lieu, right: Lieu, sortBy: SortField) => {
  if (sortBy === 'nom') {
    return left.nom.localeCompare(right.nom, 'fr');
  }

  if (sortBy === 'categorie') {
    return left.categorie.localeCompare(right.categorie, 'fr');
  }

  if (sortBy === 'statut') {
    return left.statut.localeCompare(right.statut, 'fr');
  }

  if (sortBy === 'createdAt') {
    return getTimestamp(right.createdAt) - getTimestamp(left.createdAt);
  }

  return getTimestamp(right.updatedAt ?? right.createdAt) - getTimestamp(left.updatedAt ?? left.createdAt);
};

const LieuxAdmin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { lieux, isLoading, error } = useAppSelector((state) => state.lieux);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLieu, setEditingLieu] = useState<Lieu | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | LieuStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortField>('updatedAt');

  useEffect(() => {
    dispatch(fetchLieux());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get('mode') === 'create') {
      setEditingLieu(null);
      setIsFormOpen(true);
    }
  }, [searchParams]);

  const availableCategories = useMemo(() => {
    return Array.from(new Set([...PLACE_CATEGORIES, ...lieux.map((lieu) => lieu.categorie)])).sort((left, right) =>
      left.localeCompare(right, 'fr')
    );
  }, [lieux]);

  const filteredLieux = useMemo(() => {
    return [...lieux]
      .filter((lieu) => {
        const matchesSearch = lieu.nom.toLowerCase().includes(searchTerm.toLowerCase().trim());
        const matchesStatus = statusFilter === 'all' || lieu.statut === statusFilter;
        const matchesCategory = categoryFilter === 'all' || lieu.categorie === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((left, right) => compareBySortField(left, right, sortBy));
  }, [lieux, searchTerm, statusFilter, categoryFilter, sortBy]);

  const openCreateForm = () => {
    setEditingLieu(null);
    setIsFormOpen(true);
    setSearchParams({});
  };

  const openEditForm = (lieu: Lieu) => {
    setEditingLieu(lieu);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingLieu(null);
  };

  const handleSubmitForm = async (data: FormData) => {
    try {
      if (editingLieu) {
        await dispatch(updateLieu({ id: editingLieu.id, data })).unwrap();
        toast.success('Lieu modifie avec succes');
      } else {
        await dispatch(addLieu(data)).unwrap();
        toast.success('Lieu ajoute avec succes');
      }

      setIsFormOpen(false);
      setEditingLieu(null);
    } catch {
      toast.error('Operation impossible, veuillez reessayer');
    }
  };

  const handleToggleStatus = async (lieu: Lieu) => {
    const nextStatus: LieuStatus = lieu.statut === 'actif' ? 'inactif' : 'actif';
    const actionLabel = nextStatus === 'actif' ? 'activer' : 'desactiver';

    if (!window.confirm(`Confirmer ${actionLabel} ce lieu ?`)) {
      return;
    }

    try {
      await dispatch(toggleLieuStatus({ id: lieu.id, statut: nextStatus })).unwrap();
      toast.success(`Lieu ${nextStatus === 'actif' ? 'active' : 'desactive'} avec succes`);
    } catch {
      toast.error('Mise a jour du statut impossible');
    }
  };

  const handleDeleteLieu = async (lieu: Lieu) => {
    if (!window.confirm(`Supprimer definitivement "${lieu.nom}" ?`)) {
      return;
    }

    try {
      await dispatch(deleteLieu(lieu.id)).unwrap();
      toast.success('Lieu supprime avec succes');
    } catch {
      toast.error('Suppression impossible');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSortBy('updatedAt');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Gestion des lieux</h1>
            <p className="text-gray-600">Administration complete des lieux touristiques.</p>
          </div>
          <button
            onClick={openCreateForm}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ajouter un lieu
          </button>
        </div>

        {isFormOpen && (
          <div className="bg-white rounded-xl shadow-md p-4">
            <AddPlaceForm
              mode={editingLieu ? 'edit' : 'create'}
              initialData={editingLieu}
              onSubmit={handleSubmitForm}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Rechercher par nom"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent xl:col-span-2"
            />

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as 'all' | LieuStatus)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortField)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="updatedAt">Trier: derniere modification</option>
              <option value="createdAt">Trier: creation</option>
              <option value="nom">Trier: nom</option>
              <option value="categorie">Trier: categorie</option>
              <option value="statut">Trier: statut</option>
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-sm text-gray-600">
              {filteredLieux.length} resultat{filteredLieux.length > 1 ? 's' : ''}
            </p>
            <button
              onClick={handleResetFilters}
              className="text-sm text-blue-600 hover:text-blue-700 px-0 py-0 border-none bg-transparent"
            >
              Reinitialiser les filtres
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
            Erreur: {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Nom</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Categorie</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Statut</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Creation</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Modification</th>
                  <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && lieux.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-600">
                      Chargement des lieux...
                    </td>
                  </tr>
                ) : filteredLieux.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-600">
                      Aucun lieu ne correspond aux filtres.
                    </td>
                  </tr>
                ) : (
                  filteredLieux.map((lieu) => (
                    <tr key={lieu.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800 font-medium">{lieu.nom}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{lieu.categorie}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            lieu.statut === 'actif'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {lieu.statut}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(lieu.createdAt)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {formatDate(lieu.updatedAt ?? lieu.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => navigate(`/lieux/${lieu.id}`)}
                            className="text-xs px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            Voir
                          </button>
                          <button
                            onClick={() => openEditForm(lieu)}
                            className="text-xs px-3 py-1.5 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleToggleStatus(lieu)}
                            className="text-xs px-3 py-1.5 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50"
                          >
                            {lieu.statut === 'actif' ? 'Desactiver' : 'Activer'}
                          </button>
                          <button
                            onClick={() => handleDeleteLieu(lieu)}
                            className="text-xs px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LieuxAdmin;
