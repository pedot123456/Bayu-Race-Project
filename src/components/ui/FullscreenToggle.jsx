// Persistent fullscreen toggle, sitting next to MusicToggle in
// LandscapeStage's HUD row. Real monitors need this: a normal browser
// window's tab/address bar eats vertical space, so the 16:9 stage
// letterboxes even on an exact 16:9 screen until the page goes truly
// fullscreen (see lib/useFullscreen.js).
export default function FullscreenToggle({ isFullscreen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen for best fit'}
      className="flex items-center justify-center w-9 h-9 rounded-full border-2 shadow-lg bg-brand-neutral-800/85 border-brand-accent-500 text-brand-accent-300"
    >
      <span aria-hidden className="text-base leading-none">{isFullscreen ? '⤡' : '⛶'}</span>
    </button>
  )
}
