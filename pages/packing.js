import { useEffect, useState } from 'react';
import PackingList from '@/components/PackingList';
import AnimatedButton from '@/components/AnimatedButton';
import Link from 'next/link';

// fallback list we can always show even if AI breaks
const FALLBACK_CATEGORIES = {
  "Clothing":[
    {"label":"T-shirt","packed":false},
    {"label":"Comfortable walking shoes","packed":false},
    {"label":"Light jacket","packed":false}
  ],
  "Toiletries":[
    {"label":"Toothbrush","packed":false},
    {"label":"Travel-size sunscreen","packed":false},
    {"label":"Deodorant (travel size)","packed":false}
  ],
  "Tech / Essentials":[
    {"label":"Phone charger","packed":false},
    {"label":"Portable battery","packed":false},
    {"label":"Power adapter","packed":false}
  ],
  "Documents / Money":[
    {"label":"Passport / ID","packed":false},
    {"label":"Credit card","packed":false}
  ]
};

export default function PackingPage() {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);

  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [vibe, setVibe] = useState('');

  // load trip context from localStorage
  useEffect(() => {
    setDestination(localStorage.getItem('tripmuse-destination') || '');
    setDates(localStorage.getItem('tripmuse-dates') || '');
    setVibe(localStorage.getItem('tripmuse-vibe') || '');
  }, []);

  const generatePacking = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/packing', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ destination, vibe, dates })
      });

      // If API itself threw, catch below
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Could not parse /api/packing JSON:", jsonErr);
        data = {};
      }

      console.log("Packing API response:", data);

      // choose categories from API OR fallback
      const fromAPI = data && data.categories;
      if (fromAPI && Object.keys(fromAPI).length > 0) {
        setCategories(fromAPI);
      } else {
        // backend gave nothing usable -> show fallback
        setCategories(FALLBACK_CATEGORIES);
      }
    } catch (err) {
      console.error("Error calling /api/packing:", err);
      // network / ollama failed -> still show fallback
      setCategories(FALLBACK_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate on first load if we haven't populated categories yet
  useEffect(() => {
    if (
      destination &&
      Object.keys(categories).length === 0 &&
      !loading
    ) {
      generatePacking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  const isEmpty = Object.keys(categories).length === 0;

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* LEFT CARD: trip context + actions */}
        <div className="card p-6 max-w-sm w-full h-fit">
          <h2 className="section-title mb-4">Trip Context</h2>

          <div className="text-sm text-slate-700 dark:text-slate-200 space-y-1">
            <p><strong>Destination:</strong> {destination || '—'}</p>
            <p><strong>Dates:</strong> {dates || '—'}</p>
            <p><strong>Vibe:</strong> {vibe || '—'}</p>
          </div>

          <div className="mt-6 space-y-3">
            <AnimatedButton onClick={generatePacking} disabled={loading}>
              {loading ? 'Generating…' : 'Regenerate Packing'}
            </AnimatedButton>

            <Link className="btn-primary block text-center" href="/journal">
              Next: Journal →
            </Link>
          </div>

          {!isEmpty && (
            <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-4">
              You can tap checkboxes and add items. It autosaves.
            </p>
          )}

          {isEmpty && (
            <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-4">
              If nothing shows after 5 sec, click “Regenerate Packing”.
            </p>
          )}
        </div>

        {/* RIGHT: packing list or loading state */}
        <div className="flex-1">
          {isEmpty ? (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="card p-6 text-sm text-slate-600 dark:text-slate-300">
                {loading
                  ? "Talking to the AI and building your packing list..."
                  : "No list yet. Click Regenerate Packing."}
              </div>
            </div>
          ) : (
            <PackingList initialCategories={categories} />
          )}
        </div>
      </div>
    </div>
  );
}
