import { useEffect, useMemo } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Lieu, LieuStatus } from '../../types';
import { PLACE_CATEGORIES } from '../../types';

type HorairesForm = {
  lundi: string;
  mardi: string;
  mercredi: string;
  jeudi: string;
  vendredi: string;
  samedi: string;
  dimanche: string;
};

type RawForm = {
  nom: string;
  categorie: string;
  description: string;
  photosInput: string;
  horaires: HorairesForm;
  tarifs: string;
  adresse: string;
  moyens_transport: string[];
  accessibilite: string;
  statut: LieuStatus;
};

export type FormData = {
  nom: string;
  categorie: string;
  description: string;
  photos: string[];
  horaires: HorairesForm;
  tarifs: string;
  adresse: string;
  moyens_transport: string[];
  accessibilite: string;
  statut: LieuStatus;
};

interface AddPlaceFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;
  onCancel: () => void;
  initialData?: Lieu | null;
  mode?: 'create' | 'edit';
}

const DAYS: Array<keyof HorairesForm> = [
  'lundi',
  'mardi',
  'mercredi',
  'jeudi',
  'vendredi',
  'samedi',
  'dimanche',
];

const TRANSPORT_OPTIONS = ['Bus', 'Taxi', 'Voiture', 'Train', 'A pied'];

const EMPTY_HORAIRES: HorairesForm = {
  lundi: '',
  mardi: '',
  mercredi: '',
  jeudi: '',
  vendredi: '',
  samedi: '',
  dimanche: '',
};

const parsePhotos = (value: string) =>
  value
    .split(/\r?\n|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);

const formSchema = yup.object({
  nom: yup.string().trim().required('Le nom est requis'),
  categorie: yup.string().trim().required('La categorie est requise'),
  description: yup
    .string()
    .trim()
    .min(20, 'La description doit contenir au moins 20 caracteres')
    .required('La description est requise'),
  photosInput: yup
    .string()
    .required('Au moins une photo est requise')
    .test('has-photo', 'Au moins une photo est requise', (value) => parsePhotos(value ?? '').length > 0),
  horaires: yup.object({
    lundi: yup.string().default(''),
    mardi: yup.string().default(''),
    mercredi: yup.string().default(''),
    jeudi: yup.string().default(''),
    vendredi: yup.string().default(''),
    samedi: yup.string().default(''),
    dimanche: yup.string().default(''),
  }),
  tarifs: yup.string().trim().required('Les tarifs sont requis'),
  adresse: yup.string().trim().required('L adresse est requise'),
  moyens_transport: yup.array().of(yup.string().trim()).default([]),
  accessibilite: yup.string().trim().required('L accessibilite est requise'),
  statut: yup
    .mixed<LieuStatus>()
    .oneOf(['actif', 'inactif'], 'Le statut est invalide')
    .required('Le statut est requis'),
});

const AddPlaceForm = ({ onSubmit, onCancel, initialData, mode = 'create' }: AddPlaceFormProps) => {
  const defaultValues = useMemo<RawForm>(() => {
    return {
      nom: initialData?.nom ?? '',
      categorie: initialData?.categorie ?? '',
      description: initialData?.description ?? '',
      photosInput: initialData?.photos?.join('\n') ?? '',
      horaires: {
        ...EMPTY_HORAIRES,
        ...(initialData?.horaires ?? {}),
      },
      tarifs: initialData?.tarifs ?? '',
      adresse: initialData?.adresse ?? '',
      moyens_transport: initialData?.moyens_transport ?? [],
      accessibilite: initialData?.accessibilite ?? '',
      statut: initialData?.statut ?? 'actif',
    };
  }, [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RawForm>({
    resolver: yupResolver(formSchema) as Resolver<RawForm>,
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const submit = async (raw: RawForm) => {
    const payload: FormData = {
      nom: raw.nom.trim(),
      categorie: raw.categorie,
      description: raw.description.trim(),
      photos: parsePhotos(raw.photosInput),
      horaires: raw.horaires,
      tarifs: raw.tarifs.trim(),
      adresse: raw.adresse.trim(),
      moyens_transport: raw.moyens_transport ?? [],
      accessibilite: raw.accessibilite.trim(),
      statut: raw.statut,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {mode === 'edit' ? 'Modifier un lieu' : 'Ajouter un nouveau lieu'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du lieu *
          </label>
          <input
            type="text"
            id="nom"
            {...register('nom')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Lagune de Marchica"
          />
          {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom.message}</p>}
        </div>

        <div>
          <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-2">
            Categorie *
          </label>
          <select
            id="categorie"
            {...register('categorie')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selectionner une categorie</option>
            {PLACE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.categorie && <p className="mt-1 text-sm text-red-600">{errors.categorie.message}</p>}
        </div>

        <div>
          <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">
            Statut *
          </label>
          <select
            id="statut"
            {...register('statut')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="actif">Actif</option>
            <option value="inactif">Inactif</option>
          </select>
          {errors.statut && <p className="mt-1 text-sm text-red-600">{errors.statut.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Description detaillee du lieu"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="photosInput" className="block text-sm font-medium text-gray-700 mb-2">
            Photos (URLs, une par ligne ou separees par des virgules) *
          </label>
          <textarea
            id="photosInput"
            {...register('photosInput')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/photo-1.jpg"
          />
          {errors.photosInput && <p className="mt-1 text-sm text-red-600">{errors.photosInput.message}</p>}
        </div>

        <div>
          <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
            Adresse *
          </label>
          <input
            type="text"
            id="adresse"
            {...register('adresse')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Nador, Maroc"
          />
          {errors.adresse && <p className="mt-1 text-sm text-red-600">{errors.adresse.message}</p>}
        </div>

        <div>
          <label htmlFor="tarifs" className="block text-sm font-medium text-gray-700 mb-2">
            Tarifs *
          </label>
          <input
            type="text"
            id="tarifs"
            {...register('tarifs')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: Gratuit ou 50 MAD"
          />
          {errors.tarifs && <p className="mt-1 text-sm text-red-600">{errors.tarifs.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="accessibilite" className="block text-sm font-medium text-gray-700 mb-2">
            Accessibilite *
          </label>
          <input
            type="text"
            id="accessibilite"
            {...register('accessibilite')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Infos acces PMR, parking, etc."
          />
          {errors.accessibilite && <p className="mt-1 text-sm text-red-600">{errors.accessibilite.message}</p>}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Moyens de transport</label>
        <div className="flex flex-wrap gap-3">
          {TRANSPORT_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={option}
                {...register('moyens_transport')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Horaires d ouverture</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {DAYS.map((day) => (
            <div key={day}>
              <label className="block text-xs text-gray-600 mb-1 capitalize">{day}</label>
              <input
                type="text"
                {...register(`horaires.${day}`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Ex: 08:00 - 18:00"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting
            ? mode === 'edit'
              ? 'Mise a jour...'
              : 'Ajout...'
            : mode === 'edit'
              ? 'Enregistrer les modifications'
              : 'Ajouter le lieu'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default AddPlaceForm;
