import { useNavigate } from 'react-router-dom';
import { FaListUl, FaMapMarkedAlt, FaPlusCircle } from 'react-icons/fa';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Ajouter un lieu',
      description: 'Ouvrir le formulaire de creation',
      icon: <FaPlusCircle className="text-xl" />,
      className: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => navigate('/admin/lieux?mode=create'),
    },
    {
      title: 'Gerer les lieux',
      description: 'Voir la liste complete et les actions',
      icon: <FaListUl className="text-xl" />,
      className: 'bg-emerald-600 hover:bg-emerald-700',
      onClick: () => navigate('/admin/lieux'),
    },
    {
      title: 'Voir le site',
      description: 'Aller sur la vue visiteur',
      icon: <FaMapMarkedAlt className="text-xl" />,
      className: 'bg-slate-700 hover:bg-slate-800',
      onClick: () => navigate('/'),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Actions rapides</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={action.onClick}
            className={`${action.className} text-white rounded-lg p-4 text-left transition-colors duration-200`}
          >
            <div className="mb-2">{action.icon}</div>
            <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
            <p className="text-sm opacity-90">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
