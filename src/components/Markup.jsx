// Randare minimală a „blocurilor" dintr-o rezolvare (text / cod / liste / subtitlu).
export default function Markup({ blocks }) {
  return (
    <div className="space-y-3">
      {blocks.map((b, i) => {
        if (b.t === 'code') {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-xl border border-white/10 bg-ink-950/80 p-3.5 text-[13px] leading-relaxed"
            >
              <code className="whitespace-pre font-mono text-slate-200">{b.v}</code>
            </pre>
          )
        }
        if (b.t === 'ul') {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 text-slate-300">
              {b.v.map((it, j) => (
                <li key={j} className="leading-relaxed">
                  {it}
                </li>
              ))}
            </ul>
          )
        }
        if (b.t === 'h') {
          return (
            <h4 key={i} className="pt-1 font-semibold text-slate-100">
              {b.v}
            </h4>
          )
        }
        return (
          <p key={i} className="leading-relaxed text-slate-300">
            {b.v}
          </p>
        )
      })}
    </div>
  )
}
