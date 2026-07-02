// Constrains the game to a 9:16 portrait canvas, letterboxed on wider screens
// (desktop testing) and edge-to-edge on real mobile devices.
//
// The letterboxed size is computed with min()/calc() against the outer
// wrapper's own container-query size rather than `auto` + `aspect-ratio`:
// every screen inside renders at `w-full h-full` (a percentage), and a
// percentage child can't contribute to a shrink-to-fit `auto` parent's
// intrinsic size - that combination collapses the frame to 0x0 the moment
// the sm: breakpoint (desktop-width windows) kicks in. min()/calc() against
// the always-definite outer size sidesteps that collapse entirely.
//
// The inner wrapper is its own (inline-size) container so screens can size
// text/art in cqw units proportional to the frame's actual rendered width,
// instead of fixed rem/px values tuned to one device.
export default function MobileFrame({ children }) {
  return (
    <div
      className="h-full w-full flex items-center justify-center bg-teal-950 sm:p-4"
      style={{ containerType: 'size' }}
    >
      <div
        className="relative w-full h-full sm:w-[min(100cqw,calc(100cqh*9/16))] sm:h-[min(100cqh,calc(100cqw*16/9))] overflow-hidden bg-teal-900 sm:rounded-[2rem] sm:shadow-2xl sm:ring-8 sm:ring-wood-800"
        style={{ touchAction: 'pan-y' }}
      >
        <div className="w-full h-full" style={{ containerType: 'inline-size' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
