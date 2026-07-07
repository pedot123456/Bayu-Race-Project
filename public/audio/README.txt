Active background track:

  public/audio/against-the-rising-wind.mp3  ("Against the Rising Wind")

Referenced by MUSIC_SRC in src/game/audio/useBackgroundMusic.js, which
plays it on loop at a tuned-down volume (0.35) with a 1.5s fade-in so it
never hits at full volume the instant it's allowed to autoplay.

Files in public/ are served as-is from the site root, so this file is
fetched at /audio/against-the-rising-wind.mp3 - no code changes or rebuild
needed if you swap the file itself, just keep the same name (or update
MUSIC_SRC in useBackgroundMusic.js if you rename it).

To change the volume or fade duration without touching the audio file,
edit TARGET_VOLUME / FADE_IN_MS at the top of useBackgroundMusic.js.
