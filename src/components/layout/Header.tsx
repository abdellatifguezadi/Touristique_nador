const Header = () => {

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🌍 Touristique</h1>
        <nav className="flex gap-6">
          <a href="/" className="hover:text-blue-200 transition-colors">Accueil</a>
          <a href="/lieux" className="hover:text-blue-200 transition-colors">Lieux</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
