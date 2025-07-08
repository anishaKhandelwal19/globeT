import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Flights", label: "Flights" },
    { to: "/Hotels", label: "Hotels" },
    { to: "/Homestays & Villas", label: "Homestays & Villas" },
    { to: "/Trains", label: "Trains" },
    { to: "/Cabs", label: "Cabs" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-start space-x-3">
            <Globe className="h-8 w-8 text-blue-600 transition-transform hover:scale-110" />
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Globetripster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-gray-600 hover:text-blue-600 font-medium text-sm uppercase tracking-wide transition-colors duration-200 px-3 py-1 ${
                    isActive ? "text-blue-600 underline underline-offset-4" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-x-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 font-medium text-sm uppercase tracking-wide transition-colors duration-200 px-3 py-1"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 font-medium text-sm uppercase tracking-wide transition-colors duration-200 px-3 py-1"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-gray-600 hover:text-blue-600 font-medium text-base uppercase tracking-wide transition-colors duration-200 py-2 ${
                      isActive
                        ? "text-blue-600 underline underline-offset-4"
                        : ""
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-gray-200" />
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium text-base uppercase tracking-wide transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-red-600 hover:text-red-700 font-medium text-base uppercase tracking-wide transition-colors duration-200 py-2"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
