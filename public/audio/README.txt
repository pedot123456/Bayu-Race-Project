Active background track:

  public/audio/KRAMAKALA (BACKSOUND GAMELAN NUSANTARA ) - Epic Cinematic Gamelan Nusantara.mp3

Referenced by MUSIC_SRC in src/game/audio/useBackgroundMusic.js (wrapped in
encodeURI() since the filename has spaces/parentheses), which plays it on
loop at a tuned-down volume (0.35) with a 1.5s fade-in so it never hits at
full volume the instant it's allowed to autoplay. It plays on every menu
screen (Welcome/Home/Leaderboard/Registration/Kite Select) and pauses
outright on the Game screen - see the `musicEnabled` logic in App.jsx.

Files in public/ are served as-is from the site root. To swap the track,
replace the file and update MUSIC_SRC in useBackgroundMusic.js to match its
new name (spaces are fine - encodeURI() handles them).

To change the volume or fade duration without touching the audio file,
edit TARGET_VOLUME / FADE_IN_MS at the top of useBackgroundMusic.js.
