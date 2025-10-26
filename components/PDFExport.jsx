import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Link from "next/link";

export default function ExportPage() {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [vibe, setVibe] = useState("");
  const [vibeText, setVibeText] = useState("");
  const [journal, setJournal] = useState("");
  const [packing, setPacking] = useState({}); // { Clothing: [...], Toiletries: [...], ... }

  // Load all local data on mount
  useEffect(() => {
    setDestination(localStorage.getItem("tripmuse-destination") || "");
    setDates(localStorage.getItem("tripmuse-dates") || "");
    setVibe(localStorage.getItem("tripmuse-vibe") || "");
    setVibeText(sessionStorage.getItem("tripmuse-vibeText") || ""); // we stored it in session
    setJournal(localStorage.getItem("tripmuse-journal") || "");

    // packing page probably stored categories in localStorage
    // e.g. localStorage.setItem('tripmuse-packing', JSON.stringify(categories))
    const raw = localStorage.getItem("tripmuse-packing");
    if (raw) {
      try {
        setPacking(JSON.parse(raw));
      } catch {
        setPacking({});
      }
    }
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF({
      unit: "pt", // points
      format: "letter", // 8.5 x 11 in
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    let cursorY = 60;

    // Brand header / title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("TripMuse – Trip Brief", pageWidth / 2, cursorY, { align: "center" });
    cursorY += 30;

    // Trip summary block
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const tripSummaryLines = [
      `Destination: ${destination || "—"}`,
      `Dates: ${dates || "—"}`,
      `Vibe: ${vibe || "—"}`,
    ];

    tripSummaryLines.forEach((line) => {
      doc.text(line, 60, cursorY);
      cursorY += 16;
    });

    cursorY += 20;

    // --- Section: Vibe / Mood description ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Trip Vibe", 60, cursorY);
    cursorY += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // wrap text for vibeText
    const vibeParagraph = vibeText
      ? vibeText
      : "Your moodboard vibe could not be generated yet.";

    const vibeLines = doc.splitTextToSize(vibeParagraph, pageWidth - 120); // wrap text
    vibeLines.forEach((line) => {
      if (cursorY > 720) { // basic page break safety
        doc.addPage();
        cursorY = 60;
      }
      doc.text(line, 60, cursorY);
      cursorY += 14;
    });

    cursorY += 24;

    // --- Section: Packing List ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Packing List", 60, cursorY);
    cursorY += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    // packing is expected like:
    // {
    //   "Clothing": [{label:"light jacket", packed:false}, ...],
    //   "Toiletries":[...],
    //   "Tech / Essentials":[...],
    //   "Documents / Money":[...]
    // }
    Object.keys(packing).forEach((cat) => {
      if (cursorY > 700) {
        doc.addPage();
        cursorY = 60;
      }

      // category heading
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(cat, 60, cursorY);
      cursorY += 16;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      // table rows for that category
      const rows = packing[cat].map((item) => [`• ${item.label}`]);

      if (rows.length === 0) {
        rows.push(["(none)"]);
      }

      autoTable(doc, {
        startY: cursorY,
        margin: { left: 60, right: 60 },
        theme: "plain",
        styles: {
          font: "helvetica",
          fontSize: 11,
          textColor: [30, 30, 30],
          cellPadding: { top: 2, right: 4, bottom: 2, left: 4 },
        },
        body: rows,
      });

      cursorY = doc.lastAutoTable.finalY + 20;
    });

    // --- Section: Personal Notes / Journal ---
    if (cursorY > 650) {
      doc.addPage();
      cursorY = 60;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Personal Notes", 60, cursorY);
    cursorY += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    const journalText = journal
      ? journal
      : "You haven't written any notes yet.";

    const journalLines = doc.splitTextToSize(journalText, pageWidth - 120);

    journalLines.forEach((line) => {
      if (cursorY > 720) {
        doc.addPage();
        cursorY = 60;
      }
      doc.text(line, 60, cursorY);
      cursorY += 14;
    });

    // Footer / brand
    if (cursorY > 700) {
      doc.addPage();
      cursorY = 60;
    }
    cursorY += 40;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(
      "Generated with TripMuse • All data stayed local to your browser.",
      pageWidth / 2,
      cursorY,
      { align: "center" }
    );

    // save
    const safeName = destination ? destination.replace(/[^\w\s-]/g, "") : "trip";
    doc.save(`${safeName}_trip_brief.pdf`);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center space-y-8">

        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
          Export your trip brief
        </h1>

        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
          This includes your vibe description, packing list, and personal notes.
          Nothing is uploaded — it’s all generated from local data.
        </p>

        <div className="space-y-4">
          <div className="text-left text-sm md:text-base bg-white/80 dark:bg-slate-800/80 border border-white/60 dark:border-slate-700/60 rounded-2xl shadow-[0_40px_120px_rgba(15,23,42,0.12)] p-6 backdrop-blur-sm">
            <div className="text-slate-900 dark:text-slate-100">
              <div className="font-semibold">Destination:</div>
              <div>{destination || "—"}</div>

              <div className="font-semibold mt-3">Dates:</div>
              <div>{dates || "—"}</div>

              <div className="font-semibold mt-3">Vibe:</div>
              <div>{vibe || "—"}</div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="
              inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium
              bg-sky-500 text-white hover:bg-sky-600
              dark:bg-sky-400 dark:hover:bg-sky-300
              text-base md:text-lg
              shadow-[0_20px_40px_rgba(2,132,199,0.4)]
              transition-colors
              w-full sm:w-auto
            "
          >
            Download Trip Brief (.pdf)
          </button>
        </div>

        <div>
          <Link
            href="/"
            className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
