import { motion } from 'framer-motion'
import { Icon } from './Icon'
import ProgressBar from './ProgressBar'
import { chapterKnowledge, coverage, overallAccuracy } from '../lib/stats'

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05 } }),
}

function Metric({ label, value, accent }) {
  return (
    <div className="flex flex-1 flex-col items-center px-2 text-center">
      <span className="text-2xl font-extrabold tabular-nums sm:text-3xl" style={{ color: accent || '#f1f5f9' }}>
        {value}
      </span>
      <span className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-500">{label}</span>
    </div>
  )
}

export default function Dashboard({ progress, onStartNormal, onStartWeak, onStartChapter, onNavigate, weakCount }) {
  const chapters = chapterKnowledge(progress)
  const cov = coverage(progress)
  const acc = overallAccuracy(progress)
  const isNew = cov.solved === 0

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-7 sm:px-6 sm:py-9">
      {/* Titlu pagină */}
      <motion.div variants={fade} initial="hidden" animate="show" custom={0} className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Panou</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
          {isNew ? 'Bine ai venit 👋' : 'Bine ai revenit'}
        </h1>
        <p className="mt-1 text-slate-400">
          {isNew ? 'Hai să începem pregătirea pentru licență.' : `Ai rezolvat ${cov.solved} din ${cov.total} întrebări.`}
        </p>
      </motion.div>

      {/* HERO — acțiunea principală */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={1}
        className="relative overflow-hidden rounded-3xl border border-accent-400/20 bg-gradient-to-br from-accent-500/[0.12] via-ink-850 to-ink-850 p-6 sm:p-8"
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-400/15 blur-3xl"
          aria-hidden
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-slate-50 sm:text-3xl">Exersează în ritmul tău</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
              Întrebări în ordine aleatorie, cu feedback imediat și explicații. Cele greșite revin mai des,
              automat.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button onClick={onStartNormal} className="btn-primary px-6 py-3.5 text-base">
                <Icon name="target" className="h-5 w-5" />
                {isNew ? 'Începe să exersezi' : 'Continuă să exersezi'}
              </button>
              <button onClick={() => onNavigate('exam')} className="btn-ghost px-5 py-3.5">
                <Icon name="clock" className="h-5 w-5" />
                Mod examen
              </button>
            </div>
          </div>

          {/* inel de progres total */}
          <ProgressRing solved={cov.solved} total={cov.total} />
        </div>
      </motion.div>

      {/* STRIP de statistici */}
      <motion.div
        variants={fade}
        initial="hidden"
        animate="show"
        custom={2}
        className="mt-4 flex items-stretch divide-x divide-white/10 rounded-2xl border border-white/10 bg-ink-850/70 py-4"
      >
        <Metric label="Streak" value={progress.global.currentStreak} accent="#e6c66f" />
        <Metric label="Acuratețe" value={`${acc.percent}%`} />
        <Metric label="Record" value={progress.global.bestStreak} />
        <Metric label="Rămase" value={cov.remaining} />
      </motion.div>

      {/* Recapitulare greșeli (dacă există) */}
      {weakCount > 0 && (
        <motion.button
          variants={fade}
          initial="hidden"
          animate="show"
          custom={3}
          onClick={onStartWeak}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-400/[0.06] p-4 text-left transition hover:bg-amber-400/[0.1]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">
            <Icon name="repeat" className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="font-semibold text-slate-100">Recapitulare țintită</p>
            <p className="text-sm text-slate-400">
              {weakCount} {weakCount === 1 ? 'întrebare greșită' : 'întrebări greșite'} de cel puțin 2 ori — reia-le acum.
            </p>
          </div>
          <Icon name="chevron-right" className="h-5 w-5 text-slate-500" />
        </motion.button>
      )}

      {/* Subiecte de examen (mod nou) */}
      <motion.button
        variants={fade}
        initial="hidden"
        animate="show"
        custom={4}
        onClick={() => onNavigate('subiecte')}
        className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-ink-850/70 p-4 text-left transition hover:bg-white/[0.05]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300 ring-1 ring-accent-400/25">
          <Icon name="book" className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-slate-100">Subiecte de examen (recapitulare)</p>
          <p className="text-sm text-slate-400">
            Întrebări deschise, SQL, cod HTML/JS, algoritmică și POO — în formatul examenului, cu rezolvări model.
          </p>
        </div>
        <Icon name="chevron-right" className="h-5 w-5 shrink-0 text-slate-500" />
      </motion.button>

      {/* Răspuns scris (type-in) */}
      <motion.button
        variants={fade}
        initial="hidden"
        animate="show"
        custom={5}
        onClick={() => onNavigate('scrie')}
        className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-ink-850/70 p-4 text-left transition hover:bg-white/[0.05]"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300 ring-1 ring-accent-400/25">
          <Icon name="bolt" className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-slate-100">Răspuns scris (memorare activă)</p>
          <p className="text-sm text-slate-400">
            Tastezi răspunsul din cap la definiții, SQL și concepte — cea mai puternică formă de fixare.
          </p>
        </div>
        <Icon name="chevron-right" className="h-5 w-5 shrink-0 text-slate-500" />
      </motion.button>

      {/* CAPITOLE — progres + practică pe capitol */}
      <motion.div variants={fade} initial="hidden" animate="show" custom={4} className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Capitole</h3>
          <span className="text-xs text-slate-600">apasă pentru a exersa capitolul</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60">
          {chapters.map((c, i) => (
            <button
              key={c.id}
              onClick={() => onStartChapter(c.id)}
              className={`flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04] sm:px-5 ${
                i !== chapters.length - 1 ? 'border-b border-white/[0.06]' : ''
              }`}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="truncate font-semibold text-slate-100">{c.name}</p>
                  <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color: c.color }}>
                    {c.percent}%
                  </span>
                </div>
                <div className="mt-2">
                  <ProgressBar percent={c.percent} color={c.color} height={6} />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">
                  {c.seen}/{c.total} întrebări văzute
                </p>
              </div>
              <Icon name="chevron-right" className="h-5 w-5 shrink-0 text-slate-600" />
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Inel de progres SVG pentru acoperirea totală.
function ProgressRing({ solved, total }) {
  const pct = total ? solved / total : 0
  const r = 46
  const c = 2 * Math.PI * r
  return (
    <div className="relative mx-auto h-32 w-32 shrink-0 sm:mx-0">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="55"
          cy="55"
          r={r}
          fill="none"
          stroke="#ddb44c"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - pct) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold text-slate-100">{Math.round(pct * 100)}%</span>
        <span className="text-[11px] text-slate-500">acoperit</span>
      </div>
    </div>
  )
}
