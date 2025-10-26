import { useEffect, useState } from 'react';
import Moodboard from '@/components/Moodboard';
import AnimatedButton from '@/components/AnimatedButton';
import Link from 'next/link';

export default function MoodboardPage() {
  const [vibeText, setVibeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const [destination, setDestination] = useState('');
  const [vibe, setVibe] = useState('');
  const [dates, setDates] = useState('');

  useEffect(() => {
    setDestination(localStorage.getItem('tripmuse-destination') || '');
    setVibe(localStorage.getItem('tripmuse-vibe') || '');
    setDates(localStorage.getItem('tripmuse-dates') || '');
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/vibe', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ destination, vibe })
      });
      const data = await res.json();
      setVibeText(data.vibe || '');
      sessionStorage.setItem('tripmuse-vibeText', data.vibe || '');

      const picks = pickImagesFor(destination, vibe);
      setImages(picks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (destination && !vibeText) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination]);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:items-start gap-6">
        <div className="card p-6 max-w-sm w-full">
          <h2 className="section-title mb-4">Your Trip</h2>
          <div className="text-sm text-slate-700 dark:text-slate-200 space-y-1">
            <p><strong>Destination:</strong> {destination || '—'}</p>
            <p><strong>Dates:</strong> {dates || '—'}</p>
            <p><strong>Vibe:</strong> {vibe || '—'}</p>
          </div>
          <div className="mt-6 space-y-3">
            <AnimatedButton onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating…' : 'Regenerate Moodboard'}
            </AnimatedButton>

            <Link className="btn-primary block text-center" href="/packing">
              Next: Packing →
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Moodboard
            vibeText={vibeText}
            images={images}
          />
        </div>
      </div>
    </div>
  );
}