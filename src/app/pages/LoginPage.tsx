import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin@2026!Mofil";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.username === ADMIN_USERNAME && formData.password === ADMIN_PASSWORD) {
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('currentUser', JSON.stringify({ username: ADMIN_USERNAME, role: 'admin' }));
      navigate('/admin');
    } else {
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const user = storedUsers.find((u: any) => u.username === formData.username && u.password === formData.password);

      if (user) {
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('currentUser', JSON.stringify({
          username: user.username,
          email: user.email,
          role: 'customer'
        }));
        navigate('/customer');
      } else {
        setError("Invalid credentials");
      }
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-md mx-auto px-8">
          <div className="mb-12">
            <h1
              className="text-[3rem] mb-4 tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Welcome Back
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Access your account to manage appointments and explore our services.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="px-6 py-4 bg-destructive/10 border border-destructive text-destructive text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm tracking-wide uppercase opacity-70">
                Username
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm tracking-wide uppercase opacity-70">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide uppercase border border-primary hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Log In
            </button>
          </form>

          <div className="mt-8 text-sm text-center opacity-70 space-y-2">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="underline hover:opacity-100 transition-opacity">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
