import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-black text-white shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img 
            src="https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28X0Y11D333341899W10000H7899/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/nador-kennzeichen-50.jpg" 
            alt="Touristique Logo" 
            className="w-10 h-10 rounded-lg object-cover"
          />
            <h3 className="text-2xl font-bold text-white">
              CHOUF<span dir="rtl">أ</span>50
            </h3>
        </NavLink>

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1" 
                : "text-gray-400 hover:text-white transition-colors"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/lieux"
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b-2 border-white pb-1"
                : "text-gray-400 hover:text-white transition-colors"
            }
          >
            Lieux
          </NavLink>

          {user && token ? (
            <div className="flex items-center gap-4">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-white font-semibold border-b-2 border-white pb-1"
                    : "text-gray-400 hover:text-white transition-colors"
                }
              >
                Dashboard
              </NavLink>
              <div className="flex items-center gap-3">
                <img 
                  src={user.image || "https://ui-avatars.com/api/?name=" + user.firstName} 
                  alt={user.firstName}
                  className="w-8 h-8 rounded-full border-2 border-gray-700"
                />
                <span className="text-sm font-medium text-gray-300">{user.firstName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/admin/login"
              className="bg-white text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
