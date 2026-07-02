export default function Input({ label, ...props }) {
  return (
    <label className="block text-left mb-4">
      {label && (
        <span className="block font-display text-sm font-semibold text-gold-300 mb-1.5 tracking-wide">
          {label}
        </span>
      )}
      <input
        {...props}
        className="w-full rounded-xl bg-teal-950/60 border-2 border-teal-600 focus:border-orange-400 outline-none text-white placeholder-teal-400/70 px-4 py-3 font-body transition-colors"
      />
    </label>
  )
}
