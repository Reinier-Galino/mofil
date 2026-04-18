import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MaterialRecommendations } from "../components/MaterialRecommendations";
import { CustomerPortfolio } from "../components/CustomerPortfolio";

interface AppointmentData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  projectType: string;
  budget: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export function CustomerPage() {
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState(false);
  const [portfolioKey, setPortfolioKey] = useState(0);
  const [formData, setFormData] = useState<AppointmentData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    projectType: "kitchen",
    budget: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowRecommendations = () => {
    if (formData.budget) {
      setShowRecommendations(true);
    }
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      ...formData,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      customerEmail: currentUser.email,
      customerUsername: currentUser.username,
    };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    setAppointmentBooked(true);

    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        projectType: "kitchen",
        budget: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
      });
      setAppointmentBooked(false);
      setShowRecommendations(false);
      setPortfolioKey(prev => prev + 1);
    }, 3000);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-8">
          <div className="mb-16">
            <h1
              className="text-[3.5rem] mb-4 tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Book a Consultation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Share your vision with us. Our team will craft a personalized approach to transform your space into something extraordinary.
            </p>
          </div>

          {appointmentBooked && (
            <div className="mb-8 px-8 py-6 bg-accent/20 border border-accent">
              <p className="text-accent-foreground">
                ✓ Appointment successfully booked! You will receive an SMS confirmation shortly.
              </p>
            </div>
          )}

          <form onSubmit={handleBookAppointment} className="space-y-12">
            <section>
              <h2
                className="text-[2rem] mb-8 tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2
                className="text-[2rem] mb-8 tracking-[-0.02em]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Project Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  >
                    <option value="kitchen">Kitchen Design</option>
                    <option value="cabinets">Custom Cabinets</option>
                    <option value="curtains">Window Treatments</option>
                    <option value="full">Complete Interior</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Budget Range (USD)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    required
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                    placeholder="e.g., 50000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Preferred Time
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors"
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 3PM)</option>
                    <option value="evening">Evening (3PM - 6PM)</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm tracking-wide uppercase opacity-70">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-6 py-4 bg-input-background border border-border outline-none focus:border-foreground transition-colors resize-none"
                    placeholder="Share any specific requirements, inspirations, or questions..."
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
              <button
                type="button"
                onClick={handleShowRecommendations}
                disabled={!formData.budget}
                className="flex-1 px-8 py-4 bg-secondary text-secondary-foreground text-sm tracking-wide uppercase border border-secondary hover:bg-background hover:text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                View Material Recommendations
              </button>
              <button
                type="submit"
                className="flex-1 px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide uppercase border border-primary hover:bg-background hover:text-foreground transition-all duration-300"
              >
                Book Appointment
              </button>
            </div>
          </form>

          {showRecommendations && (
            <MaterialRecommendations
              budget={parseFloat(formData.budget)}
              projectType={formData.projectType}
              onClose={() => setShowRecommendations(false)}
            />
          )}

          <CustomerPortfolio key={portfolioKey} />
        </div>
      </main>
      <Footer />
    </>
  );
}
