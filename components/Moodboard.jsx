import { motion } from 'framer-motion';

export default function Moodboard({ vibeText, images }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="card p-6 flex flex-col justify-between">
        <div>
          <h2 className="section-title mb-3">
            Trip Moodboard
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line">
            {vibeText || "Your moodboard will appear here ✨"}
          </p>
        </div>
        <p className="text-[10px] mt-6 text-slate-400 dark:text-slate-500">
          Generated locally with Ollama (llama3)
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-xl2 shadow-card border border-slate-200/50 dark:border-slate-700/50"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={src}
              alt="trip vibe"
              className="grid-img"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
