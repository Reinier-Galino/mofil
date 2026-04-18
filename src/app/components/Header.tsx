import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
    setCurrentUser(null);
    navigate('/');
  };

  const categories = [
    { name: 'Kitchen Design', slug: 'kitchen' },
    { name: 'Cabinets', slug: 'cabinets' },
    { name: 'Curtains', slug: 'curtains' },
    { name: 'Custom Projects', slug: 'custom' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-[2.5rem] tracking-[-0.04em]" style={{ fontFamily: 'var(--font-serif)' }}>
            mofil
          </Link>

          {isHome && (
            <nav className="hidden md:flex items-center gap-12">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  className="text-sm tracking-wide uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-6">
            {currentUser ? (
              <>
                <span className="text-sm opacity-70">
                  {currentUser.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-wide uppercase border border-primary hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm tracking-wide uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2.5 bg-primary text-primary-foreground text-sm tracking-wide uppercase border border-primary hover:bg-background hover:text-foreground transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
