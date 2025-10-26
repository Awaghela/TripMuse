import '@/styles/globals.css'
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = typeof window !== 'undefined'
      ? localStorage.getItem('tripmuse-theme')
      : null;

    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('tripmuse-theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('tripmuse-theme', 'light');
      setTheme('light');
    }
  };

return (
  <div className="min-h-screen flex flex-col bg-transparent text-[17px] md:text-[18px] leading-relaxed">
    <Navbar theme={theme} onToggleTheme={toggleTheme} />
    <main className="flex-1">
      <Component {...pageProps} />
    </main>
    <footer className="text-center text-[11px] text-slate-400 dark:text-slate-600 py-6">
      TripMuse • Built with ❤️ by Aayushi Waghela
    </footer>
  </div>
);

}
