# Bayu Race

A landscape, kite-dodging endless runner built for a TV/exhibition booth. Players register a team, pick a kite representing one of Malaysia's 14 states, and dodge falling scrap metal, e-waste, plastic bottles, cans, and cardboard while collecting glowing eco power-ups - all with a sustainability message ("keep Malaysia's skies clean") baked into the theme.

Built with React 19, Vite, Tailwind CSS v4, and React Router. No backend - team data, kite selection, and the leaderboard all live in `localStorage`.

## Features

- **16:9 landscape, always full-bleed.** The stage fills whatever window/monitor it's given (no letterboxing) and scales UI with CSS container-query units (`cqmin`) instead of a fixed aspect ratio. A fullscreen toggle handles the case where browser chrome (tabs/address bar) would otherwise eat into a real monitor's screen space.
- **14 kites, 14 states.** Each kite in the selection screen is palette-themed after a Malaysian state's flag/crest.
- **Sustainability-themed obstacles + power-ups.** Dodge scrap metal, e-waste, plastic bottles, aluminum cans, and cardboard boxes; collect glowing eco power-ups for bonus points.
- **Progressive difficulty.** Speed and spawn rate ramp continuously, plus a level-up every 10 seconds of survival with its own visible/audible cue.
- **Game feel.** Pre-race 3-2-1 countdown, near-miss bonus + callout, screen shake and flash on collision, a live "new record" toast mid-run, and tiered game-over messaging based on performance.
- **Audio.** Looping background instrumental on menu screens only (paused during active gameplay), plus procedural sound effects (whoosh, tick, crash, level-up, power-up, countdown) synthesized with the Web Audio API - no SFX asset files needed.
- **Team registration + local leaderboard**, persisted per-browser via `localStorage`.
- **Corporate sponsor banner** with swappable logos for exhibition/institutional branding.

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build      # production build to dist/
npm run preview    # preview the production build locally
npm run lint       # oxlint
```

## Project structure

```
public/
  audio/                 background music (see audio/README.txt)
  branding/               sponsor logo images
src/
  App.jsx                 routes + route-based music enable/disable
  components/
    layout/LandscapeStage.jsx   full-bleed 16:9 stage, fullscreen + mute controls
    ui/                    Button, Input, WoodPanel, PartnerLogos, toggles
  game/
    GameCanvas.jsx         the game loop, HUD, and all overlays (ready/countdown/gameover)
    constants.js           every gameplay tunable (speed, spawn rate, scoring, leveling)
    kiteDesigns.js         the 14 state-themed kite palettes
    audio/                 useBackgroundMusic, useSfx (Web Audio synthesis)
    engine/                useGameLoop (rAF loop), useSwipe (touch/keyboard input)
    entities/              Player, Environment, Obstacle (+ its 5 variants), PowerUp
    store/localStore.js    team/kite/leaderboard persistence (localStorage)
  screens/                 Welcome, Home, Registration, KiteSelect, Game, Leaderboard
  lib/useFullscreen.js     Fullscreen API wrapper
```

## Customizing

**Brand colors** - every color in the app is a CSS variable in `src/index.css` under the "BAYURI BRAND PALETTE" block (`--color-brand-primary-*`, `-secondary-*`, `-accent-*`, `-neutral-*`, `-sky-*`, `-hill-*`). Swap the hex values there and the whole app re-themes; no component changes needed.

**Sponsor logos** - edit the `LOGOS` array in `src/components/ui/PartnerLogos.jsx` and drop files in `public/branding/`.

**Background music** - drop an MP3 at `public/audio/against-the-rising-wind.mp3` (or update `MUSIC_SRC` in `src/game/audio/useBackgroundMusic.js` to point elsewhere). Volume and fade-in duration are also tunable there.

**Kite designs** - `src/game/kiteDesigns.js` exports `KITE_DESIGNS`; each entry is a color palette keyed by state.

**Obstacles & power-ups** - obstacle SVGs live in `src/game/entities/`; register new ones in `OBSTACLE_TYPES` (`src/game/constants.js`) and the `OBSTACLE_COMPONENTS` map in `src/game/entities/Obstacle.jsx`. Power-up spawn rate/bonus are `POWERUP_SPAWN_CHANCE`/`POWERUP_BONUS` in `constants.js`.

**Difficulty & scoring** - all in `src/game/constants.js`: base/max speed, spawn interval, per-second ramp, per-level step-up (`LEVEL_UP_INTERVAL_SEC`, `LEVEL_SPEED_STEP`, `LEVEL_SPAWN_STEP_MS`), near-miss/power-up bonuses, and the score thresholds behind the game-over tier messages.

## Notes for kiosk/TV deployment

- The game auto-requests fullscreen on the Welcome screen's first tap (piggybacking on that user gesture, since browsers require one). A manual fullscreen toggle also sits in the corner of every screen in case that's dismissed or the browser is opened directly to another route.
- All data (team name, kite choice, leaderboard) is stored in the browser's `localStorage` - clearing site data or switching browsers/devices resets it. There is no backend or shared leaderboard across machines.
