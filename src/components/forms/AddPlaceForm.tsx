import { useForm } from 'react-hook-form';


type RawForm = {
    nom: string;
    categorie: string;
    description: string;
    photosInput: string;
    horaires: {
        lundi: string;
        mardi: string;
        mercredi: string;
        jeudi: string;
        vendredi: string;
        samedi: string;
        dimanche: string;
    };
    tarifs: string;
    adresse: string;
    moyens_transport?: string[];
    accessibilite: string;
    statut: string;
};


export type FormData = {
    nom: string;
    categorie: string;
    description: string;
    photos: string[];
    horaires: {
        lundi: string;
        mardi: string;
        mercredi: string;
        jeudi: string;
        vendredi: string;
        samedi: string;
        dimanche: string;
    };
    tarifs: string;
    adresse: string;
    moyens_transport: string[];
    accessibilite: string;
    statut: string;
};

interface AddPlaceFormProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
}

const AddPlaceForm = ({ onSubmit, onCancel }: AddPlaceFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RawForm>({
        defaultValues: {
            photosInput: '',
            horaires: {
                lundi: '',
                mardi: '',
                mercredi: '',
                jeudi: '',
                vendredi: '',
                samedi: '',
                dimanche: '',
            },
            moyens_transport: [],
            statut: 'actif',
        },
    });

    const submit = (raw: RawForm) => {
        const photos = raw.photosInput
            .split(/\r?\n|,/) 
            .map((s) => s.trim())
            .filter(Boolean);

        const payload: FormData = {
            nom: raw.nom,
            categorie: raw.categorie,
            description: raw.description,
            photos,
            horaires: raw.horaires,
            tarifs: raw.tarifs,
            adresse: raw.adresse,
            moyens_transport: raw.moyens_transport || [],
            accessibilite: raw.accessibilite,
            statut: raw.statut,
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un Nouveau Lieu</h2>

            <div className="mb-4">
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du Lieu *
                </label>
                <input
                    type="text"
                    id="nom"
                    {...register('nom', { required: 'Le nom est requis' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ex: Lagune de Marchica"
                />
                {errors.nom && <p className="mt-1 text-sm text-red-600">{String(errors.nom.message)}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="categorie" className="block text-sm font-medium text-gray-700 mb-2">
                    Catégorie *
                </label>
                <select id="categorie" {...register('categorie', { required: 'La catégorie est requise' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Sélectionner une catégorie</option>
                    <option value="Sites naturels">Sites naturels</option>
                    <option value="Plages">Plages</option>
                    <option value="Monuments historiques">Monuments historiques</option>
                    <option value="Musées">Musées</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Hébergements">Hébergements</option>
                </select>
                {errors.categorie && <p className="mt-1 text-sm text-red-600">{String(errors.categorie.message)}</p>}
            </div>


            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                </label>
                <textarea id="description" {...register('description', { required: 'La description est requise', minLength: { value: 20, message: 'Au moins 20 caractères' } })} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Décrivez le lieu..." />
                {errors.description && <p className="mt-1 text-sm text-red-600">{String(errors.description.message)}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="photosInput" className="block text-sm font-medium text-gray-700 mb-2">Photos (URLs, une par ligne ou séparées par des virgules)</label>
                <textarea id="photosInput" {...register('photosInput')} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="https://...jpg" />
            </div>


            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Horaires d'ouverture</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map((jour) => (
                        <div key={jour}>
                            <label className="block text-xs text-gray-600 mb-1 capitalize">{jour}</label>
                            <input type="text" {...register(('horaires.' + jour) as any)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" placeholder="Ex: 08:00 - 18:00" />
                        </div>
                    ))}
                </div>
            </div>

 
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Moyens de Transport</label>
                <div className="flex flex-wrap gap-3">
                    {['Bus', 'Taxi', 'Voiture', 'Train', 'Tramway', 'À pied'].map((moyen) => (
                        <label key={moyen} className="flex items-center gap-2">
                            <input type="checkbox" value={moyen} {...register('moyens_transport')} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                            <span className="text-sm text-gray-700">{moyen}</span>
                        </label>
                    ))}
                </div>
            </div>


            <div className="mb-4">
                <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                <input type="text" id="adresse" {...register('adresse', { required: "L'adresse est requise" })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Nador, Maroc" />
                {errors.adresse && <p className="mt-1 text-sm text-red-600">{String(errors.adresse.message)}</p>}
            </div>


            <div className="mb-4">
                <label htmlFor="tarifs" className="block text-sm font-medium text-gray-700 mb-2">Tarifs *</label>
                <input type="text" id="tarifs" {...register('tarifs', { required: 'Les tarifs sont requis' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Gratuit ou 50 MAD" />
                {errors.tarifs && <p className="mt-1 text-sm text-red-600">{String(errors.tarifs.message)}</p>}
            </div>


            <div className="mb-4">
                <label htmlFor="accessibilite" className="block text-sm font-medium text-gray-700 mb-2">Accessibilité *</label>
                <input type="text" id="accessibilite" {...register('accessibilite', { required: "L'accessibilité est requise" })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ex: Accessible aux personnes à mobilité réduite" />
                {errors.accessibilite && <p className="mt-1 text-sm text-red-600">{String(errors.accessibilite.message)}</p>}
            </div>


            <div className="mb-6">
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">Statut *</label>
                <select id="statut" {...register('statut', { required: 'Le statut est requis' })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="brouillon">Brouillon</option>
                </select>
                {errors.statut && <p className="mt-1 text-sm text-red-600">{String(errors.statut.message)}</p>}
            </div>


            <div className="flex gap-4">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">{isSubmitting ? 'Ajout en cours...' : 'Ajouter le Lieu'}</button>
                <button type="button" onClick={onCancel} className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Annuler</button>
            </div>
        </form>
    );
};

export default AddPlaceForm;
