import { useEffect, useState } from 'react';

export default function Journal() {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem('tripmuse-journal');
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tripmuse-journal', notes);
  }, [notes]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div className="card p-6">
        <h2 className="section-title mb-3">Trip Journal</h2>
        <textarea
          className="input h-48 resize-none text-sm"
          placeholder="Things I'm excited for, must-eat spots, friends to meet..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
        <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-3">
          Saved offline in your browser.
        </p>
      </div>
    </section>
  );
}
