import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { QUESTIONS, CHAPTERS } from '../data/questions'
import { buildExamSet } from '../lib/selection'
import QuestionCard from './QuestionCard'
import ProgressBar from './ProgressBar'
import { Icon } from './Icon'

const TIME_OPTIONS = [30, 60, 90] // minute
const COUNT_OPTIONS = [20, 30, 50]

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function Exam({ onAnswer, onExit }) {
  const [phase, setPhase] = useState('setup') // 'setup' | 'run' | 'done'
  const [minutes, setMinutes] = useState(60)
  const [count, setCount] = useState(30)

  const [examSet, setExamSet] = useState([])
  const [answers, setAnswers] = useState({}) // index -> optionIndex
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [result, setResult] = useState(null)

  const submittedRef = useRef(false)

  // ---- pornire examen ----
  const start = () => {
    const set = buildExamSet(QUESTIONS, Math.min(count, QUESTIONS.length))
    setExamSet(set)
    setAnswers({})
    setIndex(0)
    setTimeLeft(minutes * 60)
    setResult(null)
    submittedRef.current = false
    setPhase('run')
  }

  // ---- finalizare + calcul scor ----
  const submit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true

    const perChapter = {}
    for (const c of CHAPTERS) perChapter[c.id] = { correct: 0, total: 0, name: c.name, short: c.short, color: c.color }

    let correct = 0
    examSet.forEach((q, i) => {
      perChapter[q.ch].total++
      const a = answers[i]
      const isCorrect = a != null && a === q.correct
      if (isCorrect) {
        correct++
        perChapter[q.ch].correct++
      }
      // Înregistrăm în progres doar întrebările la care s-a răspuns.
      if (a != null) onAnswer(q.id, isCorrect)
    })

    setResult({
      correct,
      total: examSet.length,
      percent: examSet.length ? Math.round((correct / examSet.length) * 100) : 0,
      perChapter: Object.values(perChapter).filter((c) => c.total > 0),
      timeUsed: minutes * 60 - timeLeft,
      answered: Object.keys(answers).length,
    })
    setPhase('done')
  }, [examSet, answers, onAnswer, minutes, timeLeft])

  // ---- cronometru ----
  useEffect(() => {
    if (phase !== 'run') return
    if (timeLeft <= 0) {
      submit()
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, submit])

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers])

  // =================== SETUP ===================
  if (phase === 'setup') {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-8">
        <button
          onClick={onExit}
          className="btn-ghost mb-6 flex h-10 w-10 items-center justify-center rounded-full p-0"
          aria-label="Înapoi la panou"
        >
          <Icon name="arrow-left" className="h-5 w-5" />
        </button>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Mod examen</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-100">Configurează examenul</h1>
          <p className="mt-1 text-sm text-slate-400">
            Timp limitat, fără feedback până la final. La sfârșit primești scor detaliat pe capitole.
          </p>

          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-slate-300">Durată</p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_OPTIONS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMinutes(m)}
                  className={`btn py-3 ${minutes === m ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-sm font-semibold text-slate-300">Număr de întrebări</p>
            <div className="grid grid-cols-3 gap-2">
              {COUNT_OPTIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCount(c)}
                  className={`btn py-3 ${count === c ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button onClick={start} className="btn-primary mt-7 w-full py-4 text-base">
            Începe examenul →
          </button>
        </motion.div>
      </div>
    )
  }

  // =================== RUN ===================
  if (phase === 'run') {
    const q = examSet[index]
    const danger = timeLeft <= 60
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-sm text-slate-400">
            Întrebarea <span className="font-bold text-white">{index + 1}</span> / {examSet.length}
          </span>
          <span
            className={`rounded-full border px-3 py-1 font-mono text-sm font-bold ${
              danger ? 'animate-pulse border-rose-400/50 bg-rose-500/15 text-rose-200' : 'border-white/10 bg-white/5 text-slate-200'
            }`}
          >
            ⏳ {fmt(timeLeft)}
          </span>
        </div>

        <div className="mb-4">
          <ProgressBar percent={(answeredCount / examSet.length) * 100} color="#ddb44c" height={8} />
          <p className="mt-1 text-right text-xs text-slate-500">{answeredCount} răspunse</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2 }}
          >
            {/* În examen nu dezvăluim corectitudinea (revealed=false) */}
            <QuestionCard
              question={q}
              selected={answers[index] ?? null}
              revealed={false}
              onSelect={(i) => setAnswers((a) => ({ ...a, [index]: i }))}
              shake={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigator compact */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {examSet.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-7 w-7 rounded-md text-xs font-semibold transition ${
                i === index
                  ? 'bg-accent-400 text-ink-950'
                  : answers[i] != null
                    ? 'bg-accent-500/20 text-accent-200'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="btn-ghost px-4 py-3 disabled:opacity-40"
          >
            ← Înapoi
          </button>
          {index < examSet.length - 1 ? (
            <button onClick={() => setIndex((i) => Math.min(examSet.length - 1, i + 1))} className="btn-primary px-6 py-3">
              Înainte →
            </button>
          ) : (
            <button onClick={submit} className="btn-primary px-6 py-3">
              Termină examenul ✓
            </button>
          )}
        </div>

        <button onClick={submit} className="mt-4 w-full text-center text-xs text-slate-500 underline hover:text-slate-300">
          Termină acum și vezi rezultatul
        </button>
      </div>
    )
  }

  // =================== DONE / REZULTATE ===================
  const passed = result.percent >= 50
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="card p-6 text-center">
        <p className="text-sm uppercase tracking-wide text-slate-400">Rezultat examen</p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
          className={`mx-auto my-3 text-6xl font-extrabold ${passed ? 'text-emerald-300' : 'text-rose-300'}`}
        >
          {result.percent}%
        </motion.div>
        <p className="text-slate-300">
          {result.correct} din {result.total} corecte · {result.answered} răspunse
        </p>
        <p className="mt-1 text-sm text-slate-500">Timp folosit: {fmt(result.timeUsed)}</p>
        <p className="mt-3 text-lg font-semibold">
          {passed ? '🎉 Felicitări, ai trecut pragul!' : '💪 Mai exersează — ești pe drumul cel bun!'}
        </p>
      </motion.div>

      <div className="card mt-4 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">Scor pe capitole</h3>
        <div className="flex flex-col gap-4">
          {result.perChapter.map((c) => {
            const pct = c.total ? Math.round((c.correct / c.total) * 100) : 0
            return (
              <div key={c.short}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">{c.name}</span>
                  <span className="text-slate-400">
                    {c.correct}/{c.total} · {pct}%
                  </span>
                </div>
                <ProgressBar percent={pct} color={c.color} />
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button onClick={onExit} className="btn-ghost flex-1 py-3">
          <Icon name="arrow-left" className="h-5 w-5" />
          Panou
        </button>
        <button onClick={() => setPhase('setup')} className="btn-primary flex-1 py-3">
          <Icon name="repeat" className="h-5 w-5" />
          Examen nou
        </button>
      </div>
    </div>
  )
}
