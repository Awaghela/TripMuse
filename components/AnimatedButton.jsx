import { motion } from 'framer-motion';

export default function AnimatedButton({ onClick, disabled, children }) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      className={`btn-primary ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
