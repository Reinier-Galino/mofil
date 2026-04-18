import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { PasswordStrength } from "../components/PasswordStrength";

export function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));

    localStorage.setItem('userRole', 'customer');
    localStorage.setItem('currentUser', JSON.stringify({
      username: formData.username,
      email: formData.email,
      role: 'customer'
    }));

    navigate('/customer');
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
              Create Account
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Begin your journey with mofil—where your vision meets our craft.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
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
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                placeholder="Enter your email"
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
                placeholder="Create a strong password"
              />
              <PasswordStrength password={formData.password} />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide uppercase border border-primary hover:bg-background hover:text-foreground transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-8 opacity-70">
            Already have an account?{' '}
            <Link to="/login" className="underline hover:opacity-100 transition-opacity">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
