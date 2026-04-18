export function Hero() {
  return (
    <section className="relative pt-20 min-h-screen flex items-center">
      <div className="absolute inset-0 mt-20">
        <img
          src="https://images.unsplash.com/photo-1668026694348-b73c5eb5e299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Modern interior space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 w-full pb-32">
        <div className="max-w-3xl">
          <h1
            className="text-[4rem] md:text-[6rem] lg:text-[8rem] leading-[0.9] mb-8 tracking-[-0.04em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Spaces<br />
            Worth<br />
            Remembering
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-lg opacity-90 tracking-wide">
            Interior design that honors craft, celebrates detail, and transforms the everyday into the extraordinary.
          </p>
        </div>
      </div>
    </section>
  );
}
