import { motion } from 'framer-motion'

// Bară de progres animată, reutilizabilă (statistici, progres examen etc.)
export default function ProgressBar({ percent, color = '#ddb44c', height = 10, track = 'rgba(255,255,255,0.07)' }) {
  const p = Math.max(0, Math.min(100, percent || 0))
  return (
    <div
      className="w-full overflow-hidden rounded-full"
      style={{ height, background: track }}
      role="progressbar"
      aria-valuenow={p}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
        initial={{ width: 0 }}
        animate={{ width: `${p}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  )
}
