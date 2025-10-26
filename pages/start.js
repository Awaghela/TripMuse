import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function StartPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [vibe, setVibe] = useState("Relaxation");

  // preload last-used trip so it's convenient
  useEffect(() => {
    const savedDest = localStorage.getItem("tripmuse-destination");
    const savedDates = localStorage.getItem("tripmuse-dates");
    const savedVibe = localStorage.getItem("tripmuse-vibe");

    if (savedDest) setDestination(savedDest);
    if (savedDates) setDates(savedDates);
    if (savedVibe) setVibe(savedVibe);
  }, []);

  const handleGenerate = () => {
    // 1. Save "active trip" info
    localStorage.setItem("tripmuse-destination", destination);
    localStorage.setItem("tripmuse-dates", dates);
    localStorage.setItem("tripmuse-vibe", vibe);

    // 2. Append to trip history
    // read existing trips
    const existingRaw = localStorage.getItem("tripmuse-trips");
    let trips = [];
    try {
      trips = existingRaw ? JSON.parse(existingRaw) : [];
    } catch (e) {
      trips = [];
    }

    // build new trip object
    const newTrip = {
      id: Date.now(),        // simple unique ID
      destination,
      dates,
      vibe,
    };

    // check if this exact trip already exists (optional de-dupe)
    const already = trips.find(
      (t) =>
        t.destination === newTrip.destination &&
        t.dates === newTrip.dates &&
        t.vibe === newTrip.vibe
    );
    if (!already) {
      trips.push(newTrip);
    }

    // save back
    localStorage.setItem("tripmuse-trips", JSON.stringify(trips));

    // 3. go generate moodboard
    router.push("/moodboard");
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4">
        <div
          className="
            rounded-2xl
            bg-white/90 dark:bg-slate-800/80
            border border-white/60 dark:border-slate-700/60
            shadow-[0_40px_120px_rgba(15,23,42,0.12)]
            backdrop-blur-sm
            p-6 space-y-6
          "
        >
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
            Start a new trip
          </h1>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Destination
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
                         px-3 py-2 text-sm md:text-base text-slate-800 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500 outline-none
                         focus:ring-2 focus:ring-sky-400"
              placeholder="e.g. San Diego, CA"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Trip dates
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
                         px-3 py-2 text-sm md:text-base text-slate-800 dark:text-slate-100
                         placeholder-slate-400 dark:placeholder-slate-500 outline-none
                         focus:ring-2 focus:ring-sky-400"
              placeholder="e.g. Oct 26 – Oct 30"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Vibe / Mood
            </label>
            <select
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800
                         px-3 py-2 text-sm md:text-base text-slate-800 dark:text-slate-100
                         outline-none focus:ring-2 focus:ring-sky-400"
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

          <button
            onClick={handleGenerate}
            className="
              w-full inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium
              bg-sky-500 text-white hover:bg-sky-600
              dark:bg-sky-400 dark:hover:bg-sky-300
              text-base
              shadow-[0_20px_40px_rgba(2,132,199,0.4)]
              transition-colors
            "
          >
            Generate Moodboard →
          </button>

          <p className="text-[10px] text-slate-500 dark:text-slate-500">
            Your trip is stored locally and will appear under “My previous trips.”
          </p>
        </div>
      </div>
    </section>
  );
}
