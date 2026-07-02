import { Routes, Route } from 'react-router-dom'
import MobileFrame from './components/layout/MobileFrame.jsx'
import WelcomeScreen from './screens/WelcomeScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import RegistrationScreen from './screens/RegistrationScreen.jsx'
import KiteSelectScreen from './screens/KiteSelectScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import LeaderboardScreen from './screens/LeaderboardScreen.jsx'

function App() {
  return (
    <MobileFrame>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/menu" element={<HomeScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/select-kite" element={<KiteSelectScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
      </Routes>
    </MobileFrame>
  )
}

export default App
