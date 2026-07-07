// Corporate sponsorship banner: School (ASP), Universiti Teknologi
// PETRONAS (UTP), and the Bayuri team logo, presented as a clean white
// pill so the institutional/corporate marks read as a single professional
// lockup rather than loose icons scattered over the sky art. Shared
// between WelcomeScreen and HomeScreen so sizing/spacing stays identical
// everywhere it appears.
//
// Add more sponsors by appending to this array + dropping the file in
// public/branding/ - the row and its circular badges lay out automatically.
const LOGOS = [
  { src: '/branding/asp.png', alt: 'ASP school logo' },
  { src: '/branding/utp.png', alt: 'Universiti Teknologi PETRONAS logo' },
  { src: '/branding/bayri.jpg', alt: 'Bayuri team logo' },
]

export default function PartnerLogos({ className = '' }) {
  return (
    <div className={`relative self-center flex flex-col items-center gap-2 ${className}`}>
      <span className="font-display text-xs sm:text-sm font-semibold text-white/85 uppercase tracking-[0.2em] drop-shadow">
        In collaboration with:
      </span>

      <div
        className="flex items-center bg-white rounded-[2.5rem] shadow-2xl ring-1 ring-black/5"
        style={{
          gap: 'clamp(1.5rem, 5cqmin, 3rem)',
          paddingInline: 'clamp(1.5rem, 4.5cqmin, 2.75rem)',
          paddingBlock: 'clamp(0.6rem, 2.2cqmin, 1.1rem)',
        }}
      >
        {LOGOS.map((logo) => (
          <LogoBadge key={logo.src} logo={logo} />
        ))}
      </div>
    </div>
  )
}

function LogoBadge({ logo }) {
  return (
    <div
      className="overflow-hidden rounded-full bg-white ring-1 ring-brand-neutral-900/10 shrink-0 p-2"
      style={{ width: 'clamp(3.5rem, 10cqmin, 6.5rem)', height: 'clamp(3.5rem, 10cqmin, 6.5rem)' }}
    >
      <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain rounded-full" />
    </div>
  )
}
