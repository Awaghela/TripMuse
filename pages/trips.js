import { useEffect, useState } from "react";
import Link from "next/link";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // read trips array from localStorage
    try {
      const raw = localStorage.getItem("tripmuse-trips");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTrips(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load trips from localStorage", e);
    }
  }, []);

  const resumeTrip = (trip) => {
    // put this trip back into "current trip" slots
    localStorage.setItem("tripmuse-destination", trip.destination || "");
    localStorage.setItem("tripmuse-dates", trip.dates || "");
    localStorage.setItem("tripmuse-vibe", trip.vibe || "");

    // then go to moodboard flow
    window.location.href = "/moodboard";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card p-6 space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
              My previous trips
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              These are trips you’ve started in TripMuse. Stored locally on this device only.
            </p>
          </div>
          <Link
            href="/start"
            className="inline-flex items-center justify-center rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-300 px-3 py-1.5 text-xs font-medium shadow-card"
          >
            + New trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
            You haven’t started any trips yet.
            Click <span className="font-medium text-sky-600 dark:text-sky-300">+ New trip</span> to create one.
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-4">
            {trips.map((trip, idx) => (
              <li
                key={idx}
                className="rounded-xl2 border border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-800/80 shadow-card p-4 flex flex-col justify-between"
              >
                <div className="space-y-1 text-sm">
                  <div className="text-slate-800 dark:text-slate-100 font-semibold text-base">
                    {trip.destination || "—"}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs">
                    {trip.dates || "—"}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 text-xs">
                    Vibe: {trip.vibe || "—"}
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    className="w-full rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-300 px-3 py-1.5 text-xs font-medium shadow-card text-center"
                    onClick={() => resumeTrip(trip)}
                  >
                    Resume moodboard →
                  </button>

                  <button
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 px-3 py-1.5 text-[11px] font-medium text-center"
                    onClick={() => {
                      // later: could add remove/edit per trip
                      alert("Editing trip details coming soon ✈︎");
                    }}
                  >
                    Edit trip (coming soon)
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[10px] text-slate-400 dark:text-slate-600">
          Trips never leave your browser. Clearing localStorage clears this list.
        </p>
      </div>
    </div>
  );
}
