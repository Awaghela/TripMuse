import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/60 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Left: brand now links to home */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2"
        >
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.6)]" />
            <span>TripMuse</span>
          </Link>
        </motion.div>

        {/* Right: nav links + CTA + theme toggle */}
        <nav className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          {/* anchor links / pages */}
          <Link
            className="hover:text-sky-500 dark:hover:text-sky-300 transition-colors"
            href="/#features"
          >
            Features
          </Link>

          <Link
            className="hover:text-sky-500 dark:hover:text-sky-300 transition-colors"
            href="/moodboard"
          >
            Moodboard
          </Link>

          <Link
            className="hover:text-sky-500 dark:hover:text-sky-300 transition-colors"
            href="/packing"
          >
            Packing
          </Link>

          <Link
            className="hover:text-sky-500 dark:hover:text-sky-300 transition-colors"
            href="/trips"
          >
            Trips
          </Link>

          {/* CTA: New trip */}
          <Link
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-400 dark:hover:bg-sky-300 px-3 py-1.5 text-xs font-medium shadow-card transition-colors"
            href="/start"
          >
            New trip
          </Link>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/60 px-2.5 py-1.5 text-[11px] font-medium text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
          >
            <span className="text-[12px]">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
