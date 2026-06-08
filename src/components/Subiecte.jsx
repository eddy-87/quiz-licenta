import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EXERCISES, SECTIONS, TYPE_LABEL } from '../data/exercises'
import { useExerciseRatings } from '../hooks/useExerciseRatings'
import { Icon } from './Icon'
import Markup from './Markup'

const RATINGS = [
  { id: 'unknown', label: 'Nu știam', cls: 'border-rose-400/40 bg-rose-500/10 text-rose-200 hover:bg-rose-500/20' },
  { id: 'partial', label: 'Parțial', cls: 'border-amber-300/40 bg-amber-400/10 text-amber-200 hover:bg-amber-400/20' },
  { id: 'known', label: 'Știam', cls: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200 hover:bg-emerald-500/20' },
]
const RATING_DOT = { known: '#34d399', partial: '#e6c66f', unknown: '#fb7185' }

export default function Subiecte() {
  const { ratings, setRating } = useExerciseRatings()
  const [section, setSection] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all') // all | real | compus
  const [onlyRepeat, setOnlyRepeat] = useState(false)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const list = useMemo(() => {
    let l = EXERCISES
    if (section !== 'all') l = l.filter((e) => e.section === section)
    if (sourceFilter !== 'all') l = l.filter((e) => e.source === sourceFilter)
    if (onlyRepeat) l = l.filter((e) => ratings[e.id] !== 'known')
    return l
    // ratings intenționat omis: filtrăm „de repetat" la schimbarea filtrului, nu la fiecare notare
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section, sourceFilter, onlyRepeat])

  // reset poziție când se schimbă filtrarea
  const safeIndex = Math.min(index, Math.max(0, list.length - 1))
  const ex = list[safeIndex]

  const changeFilter = (fn) => {
    fn()
    setIndex(0)
    setRevealed(false)
  }

  const go = (delta) => {
    setIndex((i) => Math.max(0, Math.min(list.length - 1, i + delta)))
    setRevealed(false)
  }

  const rate = (r) => {
    if (ex) setRating(ex.id, r)
    // avansează automat la următorul, dacă există
    if (safeIndex < list.length - 1) go(1)
    else setRevealed(false)
  }

  const ratedKnown = list.filter((e) => ratings[e.id] === 'known').length
  const secColor = (id) => SECTIONS.find((s) => s.id === id)?.color || '#94a3b8'

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-7 sm:px-6 sm:py-9">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-400/80">Recapitulare</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">Subiecte de examen</h1>
        <p className="mt-1 text-slate-400">
          Întrebări deschise, SQL, cod și probleme — ca la examenul real. Gândește-te, apoi dezvăluie rezolvarea.
        </p>
      </div>

      {/* Filtre pe secțiune */}
      <div className="mb-3 flex flex-wrap gap-2">
        <FilterChip active={section === 'all'} onClick={() => changeFilter(() => setSection('all'))} color="#ddb44c">
          Toate
        </FilterChip>
        {SECTIONS.map((s) => (
          <FilterChip key={s.id} active={section === s.id} onClick={() => changeFilter(() => setSection(s.id))} color={s.color}>
            {s.name}
          </FilterChip>
        ))}
      </div>

      {/* sursă: examen real vs compus */}
      <div className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-sm">
        {[
          ['all', 'Toate'],
          ['real', 'Examen real'],
          ['compus', 'Compuse'],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => changeFilter(() => setSourceFilter(id))}
            className={`rounded-full px-3 py-1 font-semibold transition ${
              sourceFilter === id ? 'bg-accent-400 text-ink-950' : 'text-slate-300 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          onClick={() => changeFilter(() => setOnlyRepeat((v) => !v))}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
            onlyRepeat ? 'border-accent-400/50 bg-accent-500/15 text-accent-200' : 'border-white/10 bg-white/5 text-slate-300'
          }`}
        >
          <Icon name="repeat" className="h-4 w-4" />
          Doar de repetat
        </button>
        <span className="text-sm text-slate-500">
          {list.length ? `${ratedKnown}/${list.length} știute` : '0 subiecte'}
        </span>
      </div>

      {!ex ? (
        <div className="card p-10 text-center text-slate-400">
          {onlyRepeat ? 'Nu mai ai subiecte de repetat aici. 🎉' : 'Niciun subiect pentru acest filtru.'}
        </div>
      ) : (
        <>
          <motion.div
              key={ex.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="card p-5 sm:p-6"
            >
              {/* meta */}
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className="rounded-full px-2 py-0.5 font-semibold"
                  style={{ background: `${secColor(ex.section)}22`, color: secColor(ex.section), border: `1px solid ${secColor(ex.section)}55` }}
                >
                  {SECTIONS.find((s) => s.id === ex.section)?.name}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">
                  {TYPE_LABEL[ex.type]}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-semibold ${
                    ex.source === 'real'
                      ? 'border border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                      : 'border border-white/10 bg-white/5 text-slate-400'
                  }`}
                >
                  {ex.source === 'real' ? '✓ Examen real' : 'Compus'}
                </span>
                {ratings[ex.id] && (
                  <span className="ml-auto flex items-center gap-1.5 text-slate-400">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: RATING_DOT[ratings[ex.id]] }} />
                    {RATINGS.find((r) => r.id === ratings[ex.id])?.label}
                  </span>
                )}
              </div>

              <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">{ex.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-300">{ex.prompt}</p>

              <AnimatePresence initial={false}>
                {revealed ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 border-t border-white/10 pt-5"
                  >
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-400/80">Rezolvare model</p>
                    <Markup blocks={ex.blocks} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>

          {/* Acțiuni */}
          {!revealed ? (
            <button onClick={() => setRevealed(true)} className="btn-primary mt-4 w-full py-3.5 text-base">
              <Icon name="check" className="h-5 w-5" />
              Arată rezolvarea
            </button>
          ) : (
            <div className="mt-4">
              <p className="mb-2 text-center text-sm text-slate-400">Cât de bine ai știut?</p>
              <div className="grid grid-cols-3 gap-2">
                {RATINGS.map((r) => (
                  <button key={r.id} onClick={() => rate(r.id)} className={`btn border py-3 ${r.cls}`}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigare */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <button onClick={() => go(-1)} disabled={safeIndex === 0} className="btn-ghost px-4 py-2.5 disabled:opacity-40">
              <Icon name="arrow-left" className="h-5 w-5" />
              Înapoi
            </button>
            <span className="text-sm text-slate-500">
              {safeIndex + 1} / {list.length}
            </span>
            <button
              onClick={() => go(1)}
              disabled={safeIndex >= list.length - 1}
              className="btn-ghost px-4 py-2.5 disabled:opacity-40"
            >
              Înainte
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, color, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active ? 'text-ink-950' : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
      }`}
      style={active ? { background: color, borderColor: color } : undefined}
    >
      {children}
    </button>
  )
}
