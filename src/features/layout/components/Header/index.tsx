import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const menuItems = [
  { id: 'about', label: 'About Me' },
  { id: 'contact', label: 'Contact' },
  { id: 'blog', label: 'Blog' },
  { id: 'projects', label: 'Projects' },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeKey = useMemo(() => {
    const path = location.pathname;
    const key = path.split('/')[1];
    return key || 'home';
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className="bg-gray-900 text-white p-4 sticky top-0 z-10 h-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white mr-4"
            />
            <div>
              <h1 className="text-xl font-bold">John Doe</h1>
              <p className="text-sm">Full Stack Developer</p>
            </div>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(`/${item.id}`)}
                    className={`text-sm font-semibold px-3 py-2 rounded-full transition-colors duration-300 hover:border-transparent ${
                      activeKey === item.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 bg-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 text-white p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate(`/${item.id}`);
                  }}
                  className={`w-full text-left text-sm font-semibold px-3 py-2 rounded-full transition-colors duration-300 ${
                    activeKey === item.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Header;
