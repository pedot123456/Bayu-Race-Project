// Tropical wood panel with a gold trim, used for cards, forms, and overlays.
export default function WoodPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-b from-wood-700 to-wood-800 border-4 border-gold-500 shadow-xl p-1 ${className}`}
    >
      <div className="rounded-[1.3rem] border-2 border-gold-300/40 bg-teal-900/40 p-5">
        {children}
      </div>
    </div>
  )
}
