import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function StartTripForm() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [vibe, setVibe] = useState("Relaxation");

  // load previous values from localStorage
  useEffect(() => {
    const savedDest = localStorage.getItem("tripmuse-destination");
    const savedDates = localStorage.getItem("tripmuse-dates");
    const savedVibe = localStorage.getItem("tripmuse-vibe");

    if (savedDest) setDestination(savedDest);
    if (savedDates) setDates(savedDates);
    if (savedVibe) setVibe(savedVibe);
  }, []);

  const handleGenerate = () => {
    localStorage.setItem("tripmuse-destination", destination);
    localStorage.setItem("tripmuse-dates", dates);
    localStorage.setItem("tripmuse-vibe", vibe);
    router.push("/moodboard");
  };

  return (
    <section className="py-16 md:py-24 flex justify-center">
      <div
        className="
          w-full max-w-2xl
          rounded-2xl
          bg-white/90 dark:bg-slate-800/80
          border border-white/60 dark:border-slate-700/60
          shadow-[0_40px_120px_rgba(15,23,42,0.12)]
          backdrop-blur-sm
          p-8 md:p-10
        "
      >
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
          Start your trip setup
        </h1>

        {/* Destination field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Destination
          </label>
          <input
            className="
              w-full rounded-lg
              border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              px-3 py-2 text-base
              text-slate-800 dark:text-slate-100
              placeholder-slate-400 dark:placeholder-slate-500
              outline-none focus:ring-2 focus:ring-sky-400
            "
            placeholder="e.g. Tokyo, Japan"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Dates field */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Trip dates
          </label>
          <input
            className="
              w-full rounded-lg
              border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              px-3 py-2 text-base
              text-slate-800 dark:text-slate-100
              placeholder-slate-400 dark:placeholder-slate-500
              outline-none focus:ring-2 focus:ring-sky-400
            "
            placeholder="e.g. Oct 26 – Oct 30"
            value={dates}
            onChange={(e) => setDates(e.target.value)}
          />
        </div>

        {/* Vibe field */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
            Vibe / Mood
          </label>
          <select
            className="
              w-full rounded-lg
              border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              px-3 py-2 text-base
              text-slate-800 dark:text-slate-100
              outline-none focus:ring-2 focus:ring-sky-400
            "
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          >
            <option>Relaxation</option>
            <option>Adventure</option>
            <option>Culture & Food</option>
            <option>Nightlife</option>
            <option>Romantic</option>
          </select>
        </div>

        {/* CTA button */}
        <button
          onClick={handleGenerate}
          className="
            w-full md:w-auto
            inline-flex items-center justify-center
            rounded-lg
            px-4 py-2
            font-medium
            text-base
            bg-sky-500 text-white
            hover:bg-sky-600
            dark:bg-sky-400 dark:hover:bg-sky-300
            shadow-[0_20px_40px_rgba(2,132,199,0.4)]
            transition-colors
          "
        >
          Generate Moodboard →
        </button>

        {/* Footnote */}
        <p className="text-[12px] text-slate-500 dark:text-slate-500 mt-4">
          Your trip data only lives in your browser.
        </p>
      </div>
    </section>
  );
}
