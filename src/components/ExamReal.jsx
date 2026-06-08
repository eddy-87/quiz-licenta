import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { QUESTIONS } from '../data/questions'
import { EXERCISES, TYPE_LABEL } from '../data/exercises'
import { shuffle, shuffleOptions } from '../lib/selection'
import { useExerciseRatings } from '../hooks/useExerciseRatings'
import { Icon } from './Icon'
import Markup from './Markup'

// Cele 5 secțiuni, în ordinea de pe foaia reală de examen.
const SEC = [
  { roman: 'I', name: 'BAZE DE DATE', ch: 3, exSec: 'BD' },
  { roman: 'II', name: 'ALGORITMI, STRUCTURI DE DATE ȘI PROGRAMARE', ch: 5, exSec: 'Algo' },
  { roman: 'III', name: 'REȚELE DE CALCULATOARE', ch: 4, exSec: 'Retele' },
  { roman: 'IV', name: 'SISTEME DE OPERARE', ch: 1, exSec: 'SO' },
  { roman: 'V', name: 'TEHNOLOGII WEB', ch: 2, exSec: 'Web' },
]
const OPEN_PTS = 4
const GRILA_PTS = 2
const LETTERS = ['A', 'B', 'C', 'D']

// Construiește o variantă de examen: per secțiune 2 subiecte deschise
// (1 real + 1 compus când e posibil) + 1 grilă. Totul randomizat.
function buildPaper() {
  let n = 0
  return SEC.map((s) => {
    const pool = EXERCISES.filter((e) => e.section === s.exSec)
    const real = shuffle(pool.filter((e) => e.source === 'real'))
    const comp = shuffle(pool.filter((e) => e.source === 'compus'))
    const open = []
    if (real[0]) open.push(real[0])
    if (comp[0]) open.push(comp[0])
    while (open.length < 2) {
      const extra = shuffle(pool).find((e) => !open.includes(e))
      if (!extra) break
      open.push(extra)
    }
    const grilaPool = shuffle(QUESTIONS.filter((q) => q.ch === s.ch))
    const grila = grilaPool.slice(0, 1).map((q) => ({ ...q, ...shuffleOptions(q) }))

    const items = [
      ...shuffle(open).map((e) => ({ kind: 'open', id: e.id, points: OPEN_PTS, data: e })),
      ...grila.map((q) => ({ kind: 'grila', id: q.id, points: GRILA_PTS, data: q })),
    ].map((it) => ({ ...it, no: ++n }))

    return { ...s, items }
  })
}

const frac = (r) => (r === 'known' ? 1 : r === 'partial' ? 0.5 : 0)

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function ExamReal({ minutes, onAnswer, onExit }) {
  const { setRating } = useExerciseRatings()
  const [seed, setSeed] = useState(0)
  const paper = useMemo(() => buildPaper(), [seed])
  const [answers, setAnswers] = useState({}) // grilă: id -> optionIndex
  const [drafts, setDrafts] = useState({}) // open: id -> ciornă text
  const [open, setOpen] = useState({}) // open self-rating: id -> 'known'|'partial'|'unknown'
  const [phase, setPhase] = useState('run') // 'run' | 'done'
  const [timeLeft, setTimeLeft] = useState(minutes * 60)
  const submittedRef = useRef(false)

  const restart = () => {
    setSeed((s) => s + 1)
    setAnswers({})
    setDrafts({})
    setOpen({})
    setTimeLeft(minutes * 60)
    submittedRef.current = false
    setPhase('run')
    window.scrollTo({ top: 0 })
  }

  const allItems = useMemo(() => paper.flatMap((s) => s.items), [paper])
  const maxPoints = allItems.reduce((a, it) => a + it.points, 0)

  const submit = useCallback(() => {
    if (submittedRef.current) return
    submittedRef.current = true
    // înregistrăm grilele în progres
    for (const it of allItems) {
      if (it.kind === 'grila' && answers[it.id] != null) {
        onAnswer(it.id, answers[it.id] === it.data.correct)
      }
    }
    setPhase('done')
    window.scrollTo({ top: 0 })
  }, [allItems, answers, onAnswer])

  // cronometru
  useEffect(() => {
    if (phase !== 'run') return
    if (timeLeft <= 0) {
      submit()
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, submit])

  // ---- scor ----
  const score = useMemo(() => {
    const bySec = {}
    let got = 0
    for (const s of paper) {
      let sg = 0
      let smax = 0
      for (const it of s.items) {
        smax += it.points
        if (it.kind === 'grila') {
          if (answers[it.id] === it.data.correct) sg += it.points
        } else {
          sg += it.points * frac(open[it.id])
        }
      }
      bySec[s.roman] = { got: sg, max: smax, name: s.name }
      got += sg
    }
    return { got, max: maxPoints, percent: maxPoints ? Math.round((got / maxPoints) * 100) : 0, bySec }
  }, [paper, answers, open, maxPoints])

  const rateOpen = (item, r) => {
    setOpen((o) => ({ ...o, [item.id]: r }))
    setRating(item.id, r) // sincronizează cu „Subiecte" (de repetat)
  }

  const review = phase === 'done'

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
      {/* Antet examen */}
      <div className="mb-4 rounded-2xl border border-white/10 bg-ink-850/70 p-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Examen Licență — Informatică</p>
        <p className="mt-1 text-sm text-slate-300">Capitole fundamentale · variantă generată</p>
      </div>

      {/* Bara fixă: timer / scor */}
      <div className="sticky top-2 z-10 mb-5 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-900/90 px-4 py-2.5 backdrop-blur">
        <button onClick={onExit} className="btn-ghost px-3 py-1.5 text-sm">
          <Icon name="arrow-left" className="h-4 w-4" />
          Ieși
        </button>
        {review ? (
          <span className="text-sm font-bold text-slate-100">
            Scor: <span className={score.percent >= 50 ? 'text-emerald-300' : 'text-rose-300'}>{score.got}/{score.max}</span>{' '}
            ({score.percent}%)
          </span>
        ) : (
          <span
            className={`rounded-full border px-3 py-1 font-mono text-sm font-bold ${
              timeLeft <= 60 ? 'animate-pulse border-rose-400/50 bg-rose-500/15 text-rose-200' : 'border-white/10 text-slate-200'
            }`}
          >
            ⏳ {fmt(timeLeft)}
          </span>
        )}
        {!review ? (
          <button onClick={submit} className="btn-primary px-4 py-1.5 text-sm">
            Termină
          </button>
        ) : (
          <span className="w-[64px]" />
        )}
      </div>

      {review && (
        <p className="mb-4 text-center text-xs text-slate-500">
          Grilele au fost corectate automat. La subiectele deschise, citește rezolvarea model și autoevaluează-te.
        </p>
      )}

      {/* Foaia de examen */}
      <div className="space-y-8">
        {paper.map((s) => (
          <section key={s.roman}>
            <h2 className="mb-3 border-b border-white/10 pb-2 text-base font-extrabold tracking-tight text-slate-100">
              {s.roman}. {s.name}
            </h2>
            <div className="space-y-4">
              {s.items.map((it) =>
                it.kind === 'grila' ? (
                  <GrilaItem key={it.id} item={it} value={answers[it.id]} review={review} onSelect={(i) => setAnswers((a) => ({ ...a, [it.id]: i }))} />
                ) : (
                  <OpenItem
                    key={it.id}
                    item={it}
                    draft={drafts[it.id] || ''}
                    onDraft={(v) => setDrafts((d) => ({ ...d, [it.id]: v }))}
                    review={review}
                    rating={open[it.id]}
                    onRate={(r) => rateOpen(it, r)}
                  />
                ),
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      {!review ? (
        <button onClick={submit} className="btn-primary mt-8 w-full py-4 text-base">
          Termină examenul și vezi scorul ✓
        </button>
      ) : (
        <>
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-850/70 p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Scor pe secțiuni</h3>
            <div className="space-y-2">
              {Object.entries(score.bySec).map(([roman, v]) => (
                <div key={roman} className="flex items-center justify-between text-sm">
                  <span className="text-slate-200">{roman}. {v.name}</span>
                  <span className="font-semibold text-slate-100">
                    {Math.round(v.got * 10) / 10}/{v.max}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-base font-extrabold">
              <span className="text-slate-100">Total</span>
              <span className={score.percent >= 50 ? 'text-emerald-300' : 'text-rose-300'}>
                {Math.round(score.got * 10) / 10} / {score.max} · {score.percent}%
              </span>
            </div>
          </div>
          <div className="mt-4 flex gap-3 pb-6">
            <button onClick={onExit} className="btn-ghost flex-1 py-3">
              <Icon name="arrow-left" className="h-5 w-5" /> Panou
            </button>
            <button onClick={restart} className="btn-primary flex-1 py-3">
              <Icon name="repeat" className="h-5 w-5" /> Variantă nouă
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function GrilaItem({ item, value, review, onSelect }) {
  const q = item.data
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850/50 p-4">
      <p className="mb-2 font-semibold text-slate-100">
        <span className="text-slate-400">{item.no}.</span> [{item.points}p · grilă] {q.q}
      </p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const chosen = value === i
          let cls = 'border-white/10 bg-white/[0.03] text-slate-200'
          if (review) {
            if (i === q.correct) cls = 'border-emerald-400/50 bg-emerald-500/10 text-emerald-100'
            else if (chosen) cls = 'border-rose-400/50 bg-rose-500/10 text-rose-100'
            else cls = 'border-white/10 text-slate-400'
          } else if (chosen) cls = 'border-accent-400/70 bg-accent-500/15 text-white'
          return (
            <button
              key={i}
              disabled={review}
              onClick={() => onSelect(i)}
              className={`flex items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${cls}`}
            >
              <span className="font-bold">{LETTERS[i]}.</span>
              <span>{opt}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const RATE_BTN = [
  { id: 'unknown', label: 'Nu știam', cls: 'border-rose-400/40 bg-rose-500/10 text-rose-200' },
  { id: 'partial', label: 'Parțial', cls: 'border-amber-300/40 bg-amber-400/10 text-amber-200' },
  { id: 'known', label: 'Știam', cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200' },
]

function OpenItem({ item, draft, onDraft, review, rating, onRate }) {
  const e = item.data
  return (
    <div className="rounded-xl border border-white/10 bg-ink-850/50 p-4">
      <p className="mb-1 font-semibold text-slate-100">
        <span className="text-slate-400">{item.no}.</span> [{item.points}p · {TYPE_LABEL[e.type]}] {e.title}
      </p>
      <p className="mb-3 text-sm leading-relaxed text-slate-300">{e.prompt}</p>

      {!review ? (
        <textarea
          value={draft}
          onChange={(ev) => onDraft(ev.target.value)}
          placeholder="Ciornă (opțional) — scrie-ți răspunsul aici…"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-ink-950/70 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-accent-400/60"
        />
      ) : (
        <div className="mt-2 border-t border-white/10 pt-3">
          <div className="mb-2 flex items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-400/80">Rezolvare model</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                e.source === 'real'
                  ? 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                  : 'border border-white/10 bg-white/5 text-slate-400'
              }`}
            >
              {e.source === 'real' ? '✓ Examen real' : 'Compus'}
            </span>
          </div>
          <Markup blocks={e.blocks} />
          <p className="mb-2 mt-3 text-sm text-slate-400">Cât de bine ai știut?</p>
          <div className="grid grid-cols-3 gap-2">
            {RATE_BTN.map((r) => (
              <button
                key={r.id}
                onClick={() => onRate(r.id)}
                className={`btn border py-2 text-sm ${r.cls} ${rating === r.id ? 'ring-2 ring-white/30' : ''}`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
