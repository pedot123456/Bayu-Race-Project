// Persistent mute/unmute control for the background instrumental track.
// Rendered once by LandscapeStage (inside its bottom-right HUD row) so it
// stays put across every screen.
export default function MusicToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
      className="flex items-center justify-center w-9 h-9 rounded-full border-2 shadow-lg bg-brand-neutral-800/85 border-brand-accent-500 text-brand-accent-300"
    >
      <span aria-hidden className="text-base leading-none">
        {muted ? '🔇' : '🎵'}
      </span>
    </button>
  )
}
