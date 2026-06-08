import { motion } from 'framer-motion'
import { CHAPTERS, LESSONS } from '../data/questions'

const LETTERS = ['A', 'B', 'C', 'D']

function optionClasses(i, { selected, revealed, correct }) {
  // Stiluri pentru fiecare variantă în funcție de stare.
  const base =
    'w-full text-left rounded-xl border px-4 py-3.5 sm:py-4 font-medium transition-all flex items-start gap-3 touch-manipulation'

  if (revealed) {
    if (i === correct) return `${base} border-emerald-400/60 bg-emerald-500/15 text-emerald-50`
    if (i === selected) return `${base} border-rose-400/60 bg-rose-500/15 text-rose-50`
    return `${base} border-white/10 bg-white/[0.03] text-slate-400`
  }
  if (i === selected) return `${base} border-accent-400/70 bg-accent-500/15 text-white shadow-glow`
  return `${base} border-white/10 bg-white/[0.04] text-slate-100 hover:border-white/25 hover:bg-white/[0.07]`
}

function Badge({ i, state }) {
  // bula cu litera A/B/C/D (sau ✓ / ✕ la dezvăluire)
  let cls = 'border-white/15 bg-white/5 text-slate-300'
  let ch = LETTERS[i]
  if (state.revealed) {
    if (i === state.correct) {
      cls = 'border-emerald-300/50 bg-emerald-400/20 text-emerald-100'
      ch = '✓'
    } else if (i === state.selected) {
      cls = 'border-rose-300/50 bg-rose-400/20 text-rose-100'
      ch = '✕'
    }
  } else if (i === state.selected) {
    cls = 'border-accent-300/50 bg-accent-400/20 text-accent-100'
  }
  return (
    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm font-bold ${cls}`}>
      {ch}
    </span>
  )
}

export default function QuestionCard({ question, selected, revealed, onSelect, shake, why }) {
  const chapter = CHAPTERS.find((c) => c.id === question.ch)
  const lesson = LESSONS[question.lesson]

  return (
    <motion.div
      // Animație de shake la răspuns greșit
      animate={shake ? { x: [0, -10, 10, -7, 7, 0] } : { x: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-5 sm:p-6"
    >
      {/* meta: capitol / lecție + indicator „de verificat" */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        <span
          className="rounded-full px-2 py-0.5 font-semibold"
          style={{ background: `${chapter.color}22`, color: chapter.color, border: `1px solid ${chapter.color}55` }}
        >
          {chapter.short}
        </span>
        <span className="text-slate-400">{lesson?.name}</span>
        {question.flag && (
          <span
            className="ml-auto inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-amber-200"
            title={'Întrebare marcată intern „de verificat" — conținut ambiguu în materie'}
          >
            ⚑ de verificat
          </span>
        )}
      </div>

      <h2 className="mb-5 text-lg font-bold leading-snug text-white sm:text-xl">{question.q}</h2>

      <div className="flex flex-col gap-2.5">
        {question.options.map((opt, i) => {
          const state = { selected, revealed, correct: question.correct }
          return (
            <motion.button
              key={i}
              whileTap={revealed ? {} : { scale: 0.99 }}
              disabled={revealed}
              onClick={() => onSelect(i)}
              className={optionClasses(i, state)}
            >
              <Badge i={i} state={state} />
              <span className="leading-snug">
                {opt}
                {/* explicație per-variantă: de ce e greșită (la dezvăluire) */}
                {revealed && why && why[i] && i !== question.correct && (
                  <span className="mt-1 block text-xs font-normal leading-snug text-rose-200/75">
                    — {why[i]}
                  </span>
                )}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
