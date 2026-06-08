import { motion, AnimatePresence } from 'framer-motion'

// Avertisment vizibil când progresul NU se poate salva permanent,
// sau când a fost detectat progres corupt și resetat automat.
export default function StorageBanner({ status, onDismiss }) {
  const show = status === 'memory' || status === 'reset'

  const cfg =
    status === 'memory'
      ? {
          icon: '⚠️',
          title: 'Progresul NU se salvează permanent',
          text: 'localStorage este plin sau indisponibil. Lucrezi într-o sesiune temporară — datele se vor pierde la închiderea paginii.',
          tone: 'border-amber-400/40 bg-amber-500/10 text-amber-100',
        }
      : {
          icon: '🔄',
          title: 'Progres resetat automat',
          text: 'Datele salvate erau corupte și au fost resetate. Poți începe din nou în siguranță.',
          tone: 'border-sky-400/40 bg-sky-500/10 text-sky-100',
        }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -12, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -12, height: 0 }}
          className="mx-auto mb-4 w-full max-w-3xl px-4"
        >
          <div className={`flex items-start gap-3 rounded-xl border p-3 text-sm ${cfg.tone}`}>
            <span className="text-lg leading-none">{cfg.icon}</span>
            <div className="flex-1">
              <p className="font-semibold">{cfg.title}</p>
              <p className="opacity-90">{cfg.text}</p>
            </div>
            {status === 'reset' && (
              <button
                onClick={onDismiss}
                className="rounded-lg px-2 py-1 text-xs font-semibold hover:bg-white/10"
                aria-label="Închide"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
