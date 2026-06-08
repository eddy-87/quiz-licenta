import { motion } from 'framer-motion'
import { Icon } from './Icon'
import { overallAccuracy, coverage } from '../lib/stats'

const NAV = [
  { id: 'dashboard', label: 'Panou', icon: 'panel' },
  { id: 'invata', label: 'Învață', icon: 'cap' },
  { id: 'subiecte', label: 'Subiecte', icon: 'book' },
  { id: 'exam', label: 'Examen', icon: 'clock' },
  { id: 'stats', label: 'Statistici', icon: 'chart' },
]

function NavButton({ item, active, onClick, layout }) {
  const isActive = active === item.id
  if (layout === 'side') {
    return (
      <button
        onClick={onClick}
        className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition
          ${isActive ? 'bg-accent-500/10 text-accent-200' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
      >
        {isActive && (
          <motion.span
            layoutId="nav-rail"
            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-accent-400"
          />
        )}
        <Icon name={item.icon} className="h-5 w-5" />
        {item.label}
      </button>
    )
  }
  // bottom (mobile)
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-semibold transition
        ${isActive ? 'text-accent-300' : 'text-slate-500'}`}
    >
      <Icon name={item.icon} className="h-6 w-6" />
      {item.label}
    </button>
  )
}

export default function Shell({ active, onNavigate, progress, children }) {
  const acc = overallAccuracy(progress)
  const cov = coverage(progress)

  return (
    <div className="min-h-full md:pl-[252px]">
      {/* ---- Sidebar (desktop) ---- */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[252px] flex-col border-r border-white/10 bg-ink-900/70 px-4 py-6 backdrop-blur-md md:flex">
        <div className="flex items-center gap-2.5 px-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300 ring-1 ring-accent-400/30">
            <Icon name="cap" className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-extrabold tracking-tight text-slate-100">Quiz Licență</p>
            <p className="text-[11px] text-slate-500">pregătire examen</p>
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-1">
          <p className="px-3.5 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-600">Meniu</p>
          {NAV.map((item) => (
            <NavButton key={item.id} item={item} active={active} layout="side" onClick={() => onNavigate(item.id)} />
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Icon name="flame" className="h-4 w-4 text-accent-300" /> Streak
              </span>
              <span className="font-bold text-slate-100">{progress.global.currentStreak}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Acuratețe</span>
              <span className="font-bold text-slate-100">{acc.percent}%</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400">Rezolvate</span>
              <span className="font-bold text-slate-100">
                {cov.solved}<span className="text-slate-600">/{cov.total}</span>
              </span>
            </div>
          </div>
          <p className="px-1 text-[10px] leading-relaxed text-slate-600">Offline · fără API-uri externe</p>
        </div>
      </aside>

      {/* ---- Conținut ---- */}
      <div className="min-h-full pb-24 md:pb-10">{children}</div>

      {/* ---- Bottom nav (mobile) ---- */}
      <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-white/10 bg-ink-900/90 backdrop-blur-md md:hidden">
        {NAV.map((item) => (
          <NavButton key={item.id} item={item} active={active} layout="bottom" onClick={() => onNavigate(item.id)} />
        ))}
      </nav>
    </div>
  )
}
