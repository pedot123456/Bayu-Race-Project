// Panel with a gold trim and a faint Songket-lattice texture, used for
// cards, forms, and overlays.
export default function WoodPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-b from-brand-neutral-700 to-brand-neutral-800 border-4 border-brand-accent-500 shadow-xl p-1 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1.3rem] border-2 border-brand-accent-300/40 bg-brand-primary-900/40 p-5">
        {/* Texture sits behind the content layer below - see the
            SONGKET & BATIK note in index.css for why it's a separate
            absolutely-positioned div rather than a second background-image
            on this element. */}
        <div className="absolute inset-0 bg-pattern-songket pointer-events-none" aria-hidden />
        <div className="relative">{children}</div>
      </div>
    </div>
  )
}
