const VARIANTS = {
  primary:
    'bg-gradient-to-b from-brand-secondary-400 to-brand-secondary-600 text-white border-brand-accent-400',
  secondary:
    'bg-gradient-to-b from-brand-primary-400 to-brand-primary-600 text-white border-brand-accent-400',
  ghost:
    'bg-brand-primary-800/60 text-brand-accent-300 border-brand-neutral-600',
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-display font-semibold text-lg px-6 py-3 rounded-2xl border-b-4 shadow-lg active:border-b-0 active:translate-y-1 transition-all disabled:opacity-40 disabled:active:translate-y-0 ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
