// Tropical wood panel with a gold trim, used for cards, forms, and overlays.
export default function WoodPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-b from-brand-neutral-700 to-brand-neutral-800 border-4 border-brand-accent-500 shadow-xl p-1 ${className}`}
    >
      <div className="rounded-[1.3rem] border-2 border-brand-accent-300/40 bg-brand-primary-900/40 p-5">
        {children}
      </div>
    </div>
  )
}
