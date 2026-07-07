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
      className="relative w-full h-full flex items-center justify-center px-[4cqmin] py-[2cqmin] overflow-y-auto"
      style={{
        paddingTop: 'max(1.5cqmin, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5cqmin, env(safe-area-inset-bottom))',
      }}
    >
      <Environment />

      <div className="relative w-full max-w-2xl">
        <h1 className="font-display text-[clamp(1.25rem,7cqmin,2.25rem)] font-extrabold text-white text-center mb-[2cqmin] drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
          Team Registration
        </h1>

        <WoodPanel>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            {error && <p className="text-brand-secondary-400 text-sm mb-3 -mt-1">{error}</p>}
            <div className="flex flex-row-reverse gap-3 mt-2">
              <Button className="flex-1" type="submit">
                Join the Race
              </Button>
              <Button className="flex-1" variant="ghost" type="button" onClick={() => navigate('/menu')}>
                Cancel
              </Button>
            </div>
          </form>
        </WoodPanel>
      </div>
    </div>
  )
}
