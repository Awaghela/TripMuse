import { useState, useEffect } from "react";
import Link from "next/link";

export default function JournalPage() {
  const [note, setNote] = useState("");

  // load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tripmuse-journal") || "";
    setNote(saved);
  }, []);

  // save to localStorage when user types
  const handleChange = (e) => {
    const val = e.target.value;
    setNote(val);
    localStorage.setItem("tripmuse-journal", val);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-start md:justify-between gap-12">

        {/* LEFT: journal card */}
        <div
          className="
            w-full max-w-lg
            rounded-2xl
            bg-white/90 dark:bg-slate-800/80
            border border-white/60 dark:border-slate-700/60
            shadow-[0_40px_120px_rgba(15,23,42,0.12)]
            backdrop-blur-sm
            p-6
          "
        >
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Trip Journal
          </h1>

          <textarea
            className="
              w-full
              min-h-[10rem]           /* ~160px initial height */
              md:min-h-[14rem]        /* ~224px on desktop */
              rounded-lg
              border border-slate-300 dark:border-slate-600
              bg-white dark:bg-slate-800
              text-slate-800 dark:text-slate-100
              placeholder-slate-400 dark:placeholder-slate-500
              text-sm md:text-base
              leading-relaxed
              p-3
              outline-none
              focus:ring-2 focus:ring-sky-400
              resize-y                 /* <-- user can drag to resize vertically */
            "
            value={note}
            onChange={handleChange}
            placeholder={`Things I'm excited for,\nmust-eat spots, friends to meet...`}
          />

          <p className="text-[12px] text-slate-500 dark:text-slate-500 mt-3">
            Saved offline in your browser.
          </p>
        </div>

        {/* RIGHT: nav / next step */}
        <div className="flex flex-col justify-start text-right w-full md:w-auto">
          <Link
            href="/export"
            className="
              inline-flex items-center justify-end
              text-slate-800 dark:text-slate-100
              text-base md:text-lg font-medium
              hover:text-sky-600 dark:hover:text-sky-300
              transition-colors
            "
          >
            Next: Export →
          </Link>
        </div>
      </div>
    </section>
  );
}
