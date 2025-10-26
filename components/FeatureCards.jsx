export default function FeatureCards() {
  const features = [
    {
      title: "Trip Moodboard",
      desc: "LLM-crafted vibe preview. Feel the air, sounds, and atmosphere of your destination before you land.",
      tag: "AI vibe",
    },
    {
      title: "Smart Packing",
      desc: "Packing list generated for your dates, weather vibe, and style. Tap to check off, add custom items.",
      tag: "Checklist",
    },
    {
      title: "Offline Journal",
      desc: "Save excitement, must-eat spots, and little promises to yourself. Stored locally, usable on planes.",
      tag: "Offline",
    },
    {
      title: "1-Click PDF Export",
      desc: "Auto-generate a printable pre-trip brief with mood, notes, and essentials — like a mini travel dossier.",
      tag: "PDF",
    },
  ];

  return (
    <section
      id="features"
      className="border-t border-slate-200/60 dark:border-slate-700/60 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* Section intro text */}
        <div className="max-w-3xl mx-auto text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
            Your trip prep, all in one place
          </h2>

          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
            TripMuse gives travelers a planning surface for itinerary,
            reservations, routes, and offline access all in one map–driven
            view. TripMuse focuses on the emotional side before you go: mood,
            gear, and intentions, all saved offline and fully local.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="
                rounded-2xl
                border border-white/60 dark:border-slate-700/60
                bg-white/90 dark:bg-slate-800/80
                shadow-[0_30px_80px_rgba(15,23,42,0.08)]
                backdrop-blur-sm
                p-5 md:p-6 flex flex-col gap-3
              "
            >
              {/* tag pill */}
              <div className="text-[11px] font-medium inline-block rounded-md bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 px-2 py-1 w-fit">
                {f.tag}
              </div>

              {/* title */}
              <div className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                {f.title}
              </div>

              {/* description */}
              <div className="text-sm md:text-base text-slate-700 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
