import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
        {/* Left column */}
        <div className="space-y-6 relative z-10 max-w-xl">
          {/* HEADLINE */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-slate-100 leading-tight"
          >
            One place for your trip’s vibe,
            packing, and pre-trip notes.
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg"
          >
            TripMuse is a pre-trip companion. Generate an aesthetic moodboard,
            build an AI packing list, and capture the little moments you don’t
            want to forget — all offline and private.
          </motion.p>

          {/* CTA BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/start"
              className="inline-flex items-center justify-center rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-300 px-4 py-2 text-sm font-medium shadow-card"
            >
              Start trip moodboard →
            </Link>

            <Link
              href="/trips"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white/70 dark:bg-slate-800/60 text-slate-700 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-300 px-4 py-2 text-sm font-medium shadow-card"
            >
              My previous trips
            </Link>
          </motion.div>
        </div>

        {/* Right column: preview card */}
        <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative"
        >
        <div
            className="
            rounded-2xl
            bg-white/90 dark:bg-slate-800/80
            shadow-card
            border border-slate-200/60 dark:border-slate-700/60
            p-6 md:p-8
            max-w-2xl
            backdrop-blur-sm
            "
        >
            {/* Title */}
            <div className="text-base md:text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Preview: Tokyo • “Adventure”
            </div>

            {/* Description */}
            <div className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6 max-w-xl">
            Lantern light on side streets, the air warm with soy and charcoal. You
            wander under neon and low chatter, already a little in love with the
            night.
            </div>

            {/* Image row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Image 1 */}
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-card bg-slate-100 dark:bg-slate-700/40 h-36 w-full sm:w-1/2 flex items-center justify-center">
                <img
                src="/images/mood1.jpg"
                alt="Tokyo skyline at dusk"
                className="w-full h-full object-cover"
                />
            </div>

            {/* Image 2 */}
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 shadow-card bg-slate-100 dark:bg-slate-700/40 h-36 w-full sm:w-1/2 flex items-center justify-center">
                <img
                src="/images/mood2.jpg"
                alt="Tokyo neon alley"
                className="w-full h-full object-cover"
                />
            </div>
            </div>

            {/* Footer line */}
            <div className="text-[11px] md:text-xs text-slate-600 dark:text-slate-400">
            Mood, packing, and notes — all in one view.
            </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}
