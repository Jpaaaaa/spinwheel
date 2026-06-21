const logos = ["Google", "Microsoft", "Airbnb", "Samsung", "Coca-Cola"];

export default function LogoBar() {
  return (
    <section className="border-y border-neutral-100 bg-neutral-50/50 py-8">
      <div className="safe-px mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 md:flex-row md:justify-between">
        <p className="text-center text-sm font-medium text-neutral-500 md:text-left">
          Built for teams. Trusted for fairness.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
          {logos.map((name) => (
            <span
              key={name}
              className="font-display text-sm font-bold tracking-tight text-neutral-300 transition-colors hover:text-neutral-400"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
