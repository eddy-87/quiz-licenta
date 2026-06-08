import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CHAPTERS, LESSONS, QUESTIONS } from '../data/questions'
import { SUMMARIES } from '../data/summaries'
import { Icon } from './Icon'
import Markup from './Markup'

// ordonează id-urile de lecție „1.2" < "1.10" corect (numeric pe major.minor)
function lessonSort(a, b) {
  const [a1, a2] = a.split('.').map(Number)
  const [b1, b2] = b.split('.').map(Number)
  return a1 - b1 || a2 - b2
}

export default function Invata({ onStartLesson }) {
  const [openId, setOpenId] = useState(null)

  const countByLesson = useMemo(() => {
    const m = {}
    for (const q of QUESTIONS) m[q.lesson] = (m[q.lesson] || 0) + 1
    return m
  }, [])

  const lessonsByChapter = useMemo(() => {
    const map = {}
    for (const id of Object.keys(LESSONS)) {
      const ch = LESSONS[id].ch
      ;(map[ch] = map[ch] || []).push(id)
    }
    for (const ch of Object.keys(map)) map[ch].sort(lessonSort)
    return map
  }, [])

  // ---------- Vizualizare rezumat lecție ----------
  if (openId) {
    const lesson = LESSONS[openId]
    const chapter = CHAPTERS.find((c) => c.id === lesson.ch)
    const summary = SUMMARIES[openId]
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-9">
        <button onClick={() => setOpenId(null)} className="btn-ghost mb-5 px-3 py-2 text-sm">
          <Icon name="arrow-left" className="h-5 w-5" />
          Toate lecțiile
        </button>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-xs">
            <span
              className="rounded-full px-2 py-0.5 font-semibold"
              style={{ background: `${chapter.color}22`, color: chapter.color, border: `1px solid ${chapter.color}55` }}
            >
              {chapter.short}
            </span>
            <span className="text-slate-400">Rezumat</span>
          </div>
          <h1 className="mb-4 text-xl font-extrabold leading-snug text-white sm:text-2xl">{lesson.name}</h1>
          {summary ? <Markup blocks={summary.blocks} /> : <p className="text-slate-400">Rezumat în curând.</p>}
        </motion.div>

        <button onClick={() => onStartLesson(openId)} className="btn-primary mt-4 w-full py-4 text-base">
          <Icon name="target" className="h-5 w-5" />
          Testează-mă pe această lecție
        </button>
        <p className="mt-2 text-center text-xs text-slate-500">
          {countByLesson[openId] || 0} întrebări pe această lecție
        </p>
      </div>
    )
  }

  // ---------- Lista de capitole și lecții ----------
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-9">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Învață</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">Recapitulare pe lecții</h1>
        <p className="mt-1 text-slate-400">Citește rezumatul unei lecții, apoi testează-te imediat pe ea. Citește → testează.</p>
      </div>

      <div className="space-y-6">
        {CHAPTERS.map((ch) => (
          <section key={ch.id}>
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: ch.color }} />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">{ch.name}</h2>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60">
              {(lessonsByChapter[ch.id] || []).map((id, i, arr) => (
                <button
                  key={id}
                  onClick={() => setOpenId(id)}
                  className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-white/[0.04] ${
                    i !== arr.length - 1 ? 'border-b border-white/[0.06]' : ''
                  }`}
                >
                  <Icon name="book" className="h-4 w-4 shrink-0 text-slate-500" />
                  <span className="flex-1 text-sm font-medium text-slate-100">{LESSONS[id].name}</span>
                  <span className="shrink-0 text-xs text-slate-500">{countByLesson[id] || 0} î</span>
                  <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-600" />
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
