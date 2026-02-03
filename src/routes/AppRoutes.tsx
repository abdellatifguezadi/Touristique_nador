import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/visitor/Home';
import LieuxList from '../pages/visitor/LieuxList';
import LieuDetails from '../pages/visitor/LieuDetails';
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import LieuxAdmin from '../pages/admin/LieuxAdmin';
import PrivateRoute from '../components/common/PrivateRoute';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Routes>
          {/* Visitor Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/lieux" element={<LieuxList />} />
          <Route path="/lieux/:id" element={<LieuDetails />} />

          {/* Admin Routes */}
          <Route path="/admin">
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="lieux" element={<PrivateRoute><LieuxAdmin /></PrivateRoute>} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
