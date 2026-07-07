import useBackgroundMusic from '../../game/audio/useBackgroundMusic.js'
import useFullscreen from '../../lib/useFullscreen.js'
import MusicToggle from '../ui/MusicToggle.jsx'
import FullscreenToggle from '../ui/FullscreenToggle.jsx'

// Fills the entire viewport edge-to-edge, always - no aspect-ratio lock, no
// letterbox bars. An earlier version locked the stage to a strict 16:9 box
// and only filled the screen when the window happened to be exactly 16:9,
// which looked "broken" on any real desktop browser window (tab/address
// bar chrome alone is enough to throw off the ratio). Every screen inside
// sizes itself off `cqmin` (1% of whichever of the stage's own width/height
// is smaller) instead of a fixed aspect, so it still looks balanced at any
// window shape - ultrawide, squarish, or a real 16:9 TV - without ever
// needing black/colored bars to fall back on.
export default function LandscapeStage({ children, musicEnabled = true }) {
  const { muted, toggleMute } = useBackgroundMusic({ enabled: musicEnabled })
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-brand-primary-900"
      style={{ containerType: 'size', touchAction: 'none' }}
    >
      {children}

      <div
        className="absolute z-50 flex items-center gap-2"
        style={{
          bottom: 'max(0.75rem, env(safe-area-inset-bottom))',
          right: 'max(0.75rem, env(safe-area-inset-right))',
        }}
      >
        <FullscreenToggle isFullscreen={isFullscreen} onToggle={toggleFullscreen} />
        <MusicToggle muted={muted} onToggle={toggleMute} />
      </div>

      {/* Exhibition-booth TV is always landscape; this only shows up if the
          page is opened on a portrait phone/tablet. */}
      <div className="portrait-rotate-hint fixed inset-0 z-[100] hidden flex-col items-center justify-center gap-4 bg-brand-primary-950 text-center px-8">
        <span className="text-5xl">📱↻</span>
        <p className="font-display text-lg font-semibold text-white">
          Please rotate your device to landscape
        </p>
      </div>
    </div>
  )
}
