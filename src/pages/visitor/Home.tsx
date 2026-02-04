import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem' }}>
      <h1>Bienvenue sur notre site touristique</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', margin: '2rem 0' }}>
        Découvrez les plus beaux lieux de notre région
      </p>
      
      <Link 
        to="/lieux"
        style={{
          display: 'inline-block',
          background: '#3498db',
          color: 'white',
          padding: '1rem 2rem',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          marginTop: '2rem'
        }}
      >
        Voir tous les lieux
      </Link>
    </div>
  );
};

export default Home;