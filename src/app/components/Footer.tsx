export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="max-w-xl">
            <h3 className="text-[2rem] mb-6 tracking-[-0.02em]" style={{ fontFamily: 'var(--font-serif)' }}>
              Notes on the Local
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Thoughtful dispatches on interior craft, curated projects, and the quiet details that make spaces memorable.
            </p>
            <form className="flex border border-border">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-transparent outline-none text-sm tracking-wide"
              />
              <button className="px-8 py-4 bg-primary text-primary-foreground text-sm tracking-wide uppercase hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:gap-16 lg:justify-end">
            <div>
              <h4 className="text-sm tracking-wide uppercase mb-6 opacity-50">
                Company
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">About</a></li>
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Projects</a></li>
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Services</a></li>
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm tracking-wide uppercase mb-6 opacity-50">
                Follow
              </h4>
              <ul className="space-y-3">
                <li><a href="" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Instagram</a></li>
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Facebook</a></li>
                <li><a href="#" className="text-sm opacity-70 hover:opacity-100 transition-opacity">Tiktok</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs tracking-wide opacity-50">
            © 2026 mofil. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs tracking-wide opacity-50 hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="text-xs tracking-wide opacity-50 hover:opacity-100 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
