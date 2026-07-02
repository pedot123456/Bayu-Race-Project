import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Environment from '../game/entities/Environment.jsx'
import WoodPanel from '../components/ui/WoodPanel.jsx'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import { getTeam, saveTeam } from '../game/store/localStore.js'

export default function RegistrationScreen() {
  const navigate = useNavigate()
  const existing = getTeam()
  const [teamName, setTeamName] = useState(existing?.teamName ?? '')
  const [captainName, setCaptainName] = useState(existing?.captainName ?? '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!teamName.trim() || !captainName.trim()) {
      setError('Please fill in both fields to join the race.')
      return
    }
    saveTeam({ teamName: teamName.trim(), captainName: captainName.trim() })
    navigate('/menu')
  }

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 overflow-y-auto"
      style={{
        paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <div className="relative w-full max-w-xs">
        <h1 className="font-display text-[clamp(1.5rem,11cqw,2.25rem)] font-extrabold text-white text-center mb-6 drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
          Team Registration
        </h1>

        <WoodPanel>
          <form onSubmit={handleSubmit}>
            <Input
              label="Team Name"
              placeholder="e.g. Wau Warriors"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <Input
              label="Captain Name"
              placeholder="e.g. Amir Bayu"
              value={captainName}
              onChange={(e) => setCaptainName(e.target.value)}
            />
            {error && <p className="text-orange-400 text-sm mb-3 -mt-1">{error}</p>}
            <div className="flex flex-col gap-3 mt-2">
              <Button type="submit">Join the Race</Button>
              <Button variant="ghost" type="button" onClick={() => navigate('/menu')}>
                Cancel
              </Button>
            </div>
          </form>
        </WoodPanel>
      </div>
    </div>
  )
}
