import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        {
            title: 'Ajouter un Lieu',
            description: 'Créer un nouveau lieu touristique',
            icon: '➕',
            color: 'bg-blue-500 hover:bg-blue-600',
            onClick: () => navigate('/admin/lieux')
        },
        {
            title: 'Gérer les Lieux',
            description: 'Modifier ou supprimer des lieux',
            icon: '📝',
            color: 'bg-green-500 hover:bg-green-600',
            onClick: () => navigate('/admin/lieux')
        },
        {
            title: 'Voir le Site',
            description: 'Aperçu du site visiteur',
            icon: '👁️',
            color: 'bg-purple-500 hover:bg-purple-600',
            onClick: () => navigate('/')
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Actions Rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className={`${action.color} text-white rounded-lg p-4 text-left transition-colors duration-200`}
                    >
                        <div className="text-3xl mb-2">{action.icon}</div>
                        <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;
