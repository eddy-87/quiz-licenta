import { useState } from 'react'
import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'
import { Icon } from './Icon'
import { chapterKnowledge, coverage, topWrong, historySeries, overallAccuracy } from '../lib/stats'

function HistoryChart({ data }) {
  const W = 320
  const H = 120
  const pad = 18
  const n = data.length
  const bw = (W - pad * 2) / n

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Progres în timp">
      {[0, 50, 100].map((g) => {
        const y = pad + (H - pad * 2) * (1 - g / 100)
        return (
          <g key={g}>
            <line x1={pad} y1={y} x2={W - pad} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x={2} y={y + 3} fontSize="7" fill="rgba(255,255,255,0.35)">
              {g}
            </text>
          </g>
        )
      })}
      {data.map((d, i) => {
        const x = pad + i * bw + bw * 0.18
        const w = bw * 0.64
        const acc = d.accuracy
        const fullH = H - pad * 2
        const h = acc == null ? 0 : (acc / 100) * fullH
        const y = pad + (fullH - h)
        return (
          <g key={d.key}>
            {acc != null && (
              <motion.rect
                initial={{ height: 0, y: pad + fullH }}
                animate={{ height: h, y }}
                transition={{ duration: 0.6, delay: i * 0.02 }}
                x={x}
                width={w}
                rx={2}
                fill="url(#grad)"
              />
            )}
            {i % 2 === 0 && (
              <text x={x + w / 2} y={H - 4} fontSize="6" fill="rgba(255,255,255,0.4)" textAnchor="middle">
                {d.label}
              </text>
            )}
          </g>
        )
      })}
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e6c66f" />
          <stop offset="100%" stopColor="#b9842a" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function StatBox({ label, value, sub, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-850/70 p-4 text-center">
      <div className="text-2xl font-extrabold tabular-nums" style={{ color: color || '#f1f5f9' }}>
        {value}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      {sub && <div className="text-[11px] text-slate-600">{sub}</div>}
    </div>
  )
}

function Panel({ title, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-ink-850/60 p-5 ${className}`}>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      {children}
    </section>
  )
}

export default function Stats({ progress, onReset }) {
  const [confirming, setConfirming] = useState(false)

  const chapters = chapterKnowledge(progress)
  const cov = coverage(progress)
  const wrong = topWrong(progress, 5)
  const series = historySeries(progress, 14)
  const acc = overallAccuracy(progress)
  const hasHistory = series.some((d) => d.total > 0)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-7 sm:px-6 sm:py-9">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Statistici</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">Progresul tău</h1>
      </div>

      {/* Cifre cheie */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox label="Acuratețe" value={`${acc.percent}%`} sub={`${acc.correct}/${acc.total}`} color="#e6c66f" />
        <StatBox label="Streak" value={progress.global.currentStreak} sub={`record ${progress.global.bestStreak}`} />
        <StatBox label="Rezolvate" value={cov.solved} sub={`din ${cov.total}`} color="#82c79b" />
        <StatBox label="Rămase" value={cov.remaining} color="#d6a45c" />
      </div>

      {/* Două coloane: capitole + grafic */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Cunoaștere pe capitole">
          <div className="flex flex-col gap-4">
            {chapters.map((c) => (
              <div key={c.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-slate-200">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
                    {c.name}
                  </span>
                  <span className="text-slate-400">
                    {c.percent}% <span className="text-slate-600">· {c.seen}/{c.total}</span>
                  </span>
                </div>
                <ProgressBar percent={c.percent} color={c.color} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Progres în timp (14 zile)">
          {hasHistory ? (
            <HistoryChart data={series} />
          ) : (
            <p className="py-10 text-center text-sm text-slate-500">
              Încă nu există date. Răspunde la câteva întrebări ca să apară graficul.
            </p>
          )}
        </Panel>
      </div>

      {/* Top greșeli */}
      <Panel title="Cele mai greșite întrebări (top 5)" className="mt-4">
        {wrong.length ? (
          <ol className="flex flex-col gap-2">
            {wrong.map(({ q, wrong: w }, i) => (
              <li key={q.id} className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose-500/20 text-xs font-bold text-rose-200">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-slate-200">{q.q}</span>
                <span className="shrink-0 rounded-md bg-rose-500/15 px-2 py-0.5 text-xs font-bold text-rose-200">
                  {w}× greșit
                </span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">Nicio greșeală încă. Continuă tot așa!</p>
        )}
      </Panel>

      {/* Reset */}
      <Panel title="Administrare" className="mt-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-100">Resetare progres</p>
            <p className="text-sm text-slate-400">Șterge tot istoricul de răspunsuri, streak-urile și statisticile.</p>
          </div>
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="btn-ghost shrink-0 border-rose-400/30 text-rose-200 hover:bg-rose-500/10"
            >
              <Icon name="repeat" className="h-4 w-4" />
              Resetează
            </button>
          ) : (
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => {
                  onReset()
                  setConfirming(false)
                }}
                className="btn bg-rose-500/80 px-4 py-2.5 text-white hover:bg-rose-500"
              >
                Da, șterge tot
              </button>
              <button onClick={() => setConfirming(false)} className="btn-ghost px-4 py-2.5">
                Anulează
              </button>
            </div>
          )}
        </div>
      </Panel>
    </div>
  )
}
