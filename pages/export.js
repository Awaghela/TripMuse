import { useEffect, useState } from 'react';
import PDFExport from '@/components/PDFExport';

export default function ExportPage() {
  const [moodText, setMoodText] = useState('');
  const [destination, setDestination] = useState('');
  const [tripDates, setTripDates] = useState('');

  useEffect(() => {
    setDestination(localStorage.getItem('tripmuse-destination') || '');
    setTripDates(localStorage.getItem('tripmuse-dates') || '');
    setMoodText(sessionStorage.getItem('tripmuse-vibeText') || '');
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="card p-6 space-y-6">
        <h2 className="section-title">Export Trip PDF</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          This will include your moodboard text, packing checklist, and journal notes.
        </p>

        <PDFExport
          moodText={moodText}
          destination={destination}
          tripDates={tripDates}
        />

        <p className="text-[10px] text-slate-400 dark:text-slate-600">
          All data is local. Nothing is uploaded.
        </p>
      </div>
    </div>
  );
}
