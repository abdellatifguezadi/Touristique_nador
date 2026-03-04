const Footer = () => {

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://image.spreadshirtmedia.net/image-server/v1/products/T1459A839PA4459PT28X0Y11D333341899W10000H7899/views/1,width=378,height=378,appearanceId=839,backgroundColor=F2F2F2/nador-kennzeichen-50.jpg" 
                alt="Touristique Logo" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <h3 className="text-2xl font-bold">
                  CHOUF<span dir="rtl">أ</span>50
              </h3>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Découvrez les plus beaux lieux touristiques. Explorez, partagez et créez des souvenirs inoubliables.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-2xl hover:text-gray-300 transition-colors">📘</a>
              <a href="#" className="text-2xl hover:text-gray-300 transition-colors">📷</a>
              <a href="#" className="text-2xl hover:text-gray-300 transition-colors">🐦</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Liens rapides</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="/" className="hover:text-white hover:translate-x-1 inline-block transition-all">→ Accueil</a></li>
              <li><a href="/lieux" className="hover:text-white hover:translate-x-1 inline-block transition-all">→ Lieux</a></li>
              <li><a href="/admin/login" className="hover:text-white hover:translate-x-1 inline-block transition-all">→ Admin</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contact@touristique.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+212 123 456 789</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Casablanca, Maroc</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2026 <span className="text-white font-semibold">Touristique</span>. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
