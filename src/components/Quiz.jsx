import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS, CHAPTERS, LESSONS } from '../data/questions'
import { WHY } from '../data/whyMap'
import { pickWeighted, shuffleOptions, weakPool } from '../lib/selection'
import { coverage } from '../lib/stats'
import { fireConfetti } from '../lib/confetti'
import QuestionCard from './QuestionCard'
import { Icon } from './Icon'

export default function Quiz({ mode, chapterId = null, lessonId = null, progress, onAnswer, onExit }) {
  // Pool stabil pe durata sesiunii.
  const pool = useMemo(() => {
    if (mode === 'weak') return weakPool(QUESTIONS, progress, 2)
    if (lessonId != null) return QUESTIONS.filter((q) => q.lesson === lessonId)
    if (chapterId != null) return QUESTIONS.filter((q) => q.ch === chapterId)
    return QUESTIONS
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, chapterId, lessonId])

  // Referință mereu actualizată la progres (pt. selecția ponderată corectă).
  const progressRef = useRef(progress)
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  const [current, setCurrent] = useState(null)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)
  const [session, setSession] = useState({ answered: 0, correct: 0 })

  const prepare = useCallback((q) => {
    const s = shuffleOptions(q)
    // remapăm explicațiile per-variantă la noua ordine a opțiunilor
    const orig = WHY[q.id]
    const why = orig ? s.order.map((i) => orig[i] || '') : null
    return { ...q, ...s, why }
  }, [])

  const nextQuestion = useCallback(() => {
    if (!pool.length) return
    const picked = pickWeighted(pool, progressRef.current, current?.id || null)
    setCurrent(prepare(picked))
    setSelected(null)
    setRevealed(false)
  }, [pool, current, prepare])

  // Prima întrebare
  useEffect(() => {
    if (pool.length) {
      const picked = pickWeighted(pool, progressRef.current, null)
      setCurrent(prepare(picked))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = useCallback(
    (i) => {
      if (revealed || !current) return
      const isCorrect = i === current.correct
      setSelected(i)
      setRevealed(true)
      setLastCorrect(isCorrect)
      setSession((s) => ({ answered: s.answered + 1, correct: s.correct + (isCorrect ? 1 : 0) }))
      onAnswer(current.id, isCorrect)
      if (isCorrect) fireConfetti()
    },
    [revealed, current, onAnswer],
  )

  // Suport tastatură: 1-4 selectează, Enter/Space => următoarea.
  useEffect(() => {
    const onKey = (e) => {
      if (!current) return
      if (!revealed && ['1', '2', '3', '4'].includes(e.key)) {
        handleSelect(Number(e.key) - 1)
      } else if (revealed && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        nextQuestion()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, revealed, handleSelect, nextQuestion])

  const cov = coverage(progress)
  const shake = revealed && !lastCorrect
  const sessionLabel =
    mode === 'weak'
      ? 'Recapitulare greșeli'
      : lessonId != null
        ? LESSONS[lessonId]?.name || 'Lecție'
        : chapterId != null
          ? CHAPTERS.find((c) => c.id === chapterId)?.name
          : 'Exersare liberă'

  if (!current) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center text-slate-400">
        Nu există întrebări disponibile pentru acest mod.
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      {/* Header sesiune (focus) */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          onClick={onExit}
          className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full p-0"
          aria-label="Înapoi la panou"
        >
          <Icon name="arrow-left" className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="truncate text-sm font-semibold text-slate-200">{sessionLabel}</p>
          <p className="text-[11px] text-slate-500">
            {mode === 'weak' ? `${pool.length} de exersat` : `${cov.solved}/${cov.total} rezolvate`}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-200">
          <Icon name="flame" className="h-4 w-4 text-accent-300" />
          {progress.global.currentStreak}
        </span>
      </div>

      {/* Cheie = doar id-ul întrebării: a RĂSPUNDE nu remontează cardul
          (altfel AnimatePresence mode="wait" se bloca). Se remontează doar
          la trecerea la întrebarea următoare. */}
      <motion.div
        key={current.id}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22 }}
      >
        <QuestionCard
          question={current}
          selected={selected}
          revealed={revealed}
          onSelect={handleSelect}
          shake={shake}
          why={current.why}
        />
      </motion.div>

      {/* Feedback + explicație */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div
              className={`rounded-xl border p-4 ${
                lastCorrect
                  ? 'border-emerald-400/40 bg-emerald-500/10'
                  : 'border-rose-400/40 bg-rose-500/10'
              }`}
            >
              <div className="flex items-center gap-2 text-base font-bold">
                {lastCorrect ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className="inline-flex items-center gap-2 text-emerald-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20">
                      <Icon name="check" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    Corect!
                  </motion.span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-rose-300">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-400/20">
                      <Icon name="close" className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    Greșit
                  </span>
                )}
              </div>
              {!lastCorrect && (
                <p className="mt-2 text-sm text-slate-200">
                  Răspuns corect:{' '}
                  <span className="font-semibold text-emerald-300">
                    {current.options[current.correct]}
                  </span>
                </p>
              )}
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                <span className="font-semibold text-slate-200">Explicație: </span>
                {current.exp}
              </p>
            </div>

            <button onClick={nextQuestion} className="btn-primary mt-4 w-full py-4 text-base">
              Următoarea întrebare
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <p className="mt-4 text-center text-xs text-slate-500">
          Atinge o variantă pentru a răspunde · sau apasă tastele 1–4
        </p>
      )}
    </div>
  )
}
