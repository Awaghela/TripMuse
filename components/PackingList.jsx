import { useState, useEffect } from 'react';

export default function PackingList({ initialCategories }) {
  const [categories, setCategories] = useState(initialCategories || {});
  
  useEffect(() => {
    const saved = localStorage.getItem('tripmuse-packing');
    if (saved) {
      setCategories(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tripmuse-packing', JSON.stringify(categories));
  }, [categories]);

  const toggleItem = (cat, idx) => {
    setCategories(prev => {
      const next = { ...prev };
      next[cat][idx].packed = !next[cat][idx].packed;
      return next;
    });
  };

  const addItem = (cat) => {
    const label = window.prompt(`Add item to ${cat}?`);
    if (!label) return;
    setCategories(prev => {
      const next = { ...prev };
      next[cat] = [...next[cat], { label, packed: false }];
      return next;
    });
  };

  if (!categories || Object.keys(categories).length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card p-6 text-sm text-slate-600 dark:text-slate-300">
          Generating a packing list... if nothing appears, click "Regenerate Packing".
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="section-title">Packing List</h2>
      {Object.keys(categories).map(cat => (
        <div key={cat} className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cat}</h3>
            <button
              className="text-xs text-sky-500 dark:text-sky-300 hover:underline"
              onClick={() => addItem(cat)}
            >
              + Add
            </button>
          </div>
          <ul className="space-y-2">
            {categories[cat].map((item, i) => (
              <li
                key={i}
                className="flex items-start text-sm text-slate-700 dark:text-slate-200"
              >
                <input
                  type="checkbox"
                  className="mt-1 mr-2 accent-sky-500"
                  checked={item.packed}
                  onChange={() => toggleItem(cat, i)}
                />
                <span className={item.packed ? "line-through opacity-60" : ""}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="text-[10px] text-slate-400 dark:text-slate-600">
        This list is stored locally on your device (offline-friendly).
      </p>
    </section>
  );
}
