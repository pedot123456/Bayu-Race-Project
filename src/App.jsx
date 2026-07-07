import { Routes, Route, useLocation } from 'react-router-dom'
import LandscapeStage from './components/layout/LandscapeStage.jsx'
import WelcomeScreen from './screens/WelcomeScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import RegistrationScreen from './screens/RegistrationScreen.jsx'
import KiteSelectScreen from './screens/KiteSelectScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import LeaderboardScreen from './screens/LeaderboardScreen.jsx'

function App() {
  const location = useLocation()
  // Menu screens keep the instrumental track going; the Game screen is
  // "active gameplay" and gets full quiet so the player can concentrate.
  const musicEnabled = location.pathname !== '/game'

  return (
    <LandscapeStage musicEnabled={musicEnabled}>
      {/* Keying on pathname remounts this wrapper on every navigation, which
          replays the fade/rise-in animation - a cheap way to get a polished
          screen transition without a routing-transition library. */}
      <div key={location.pathname} className="relative w-full h-full animate-screen-in">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/menu" element={<HomeScreen />} />
          <Route path="/register" element={<RegistrationScreen />} />
          <Route path="/select-kite" element={<KiteSelectScreen />} />
          <Route path="/game" element={<GameScreen />} />
          <Route path="/leaderboard" element={<LeaderboardScreen />} />
        </Routes>
      </div>
    </LandscapeStage>
  )
}

export default App
