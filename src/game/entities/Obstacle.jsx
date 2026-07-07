import ScrapMetal from './ScrapMetal.jsx'
import EWaste from './EWaste.jsx'
import PlasticBottle from './PlasticBottle.jsx'
import AluminumCan from './AluminumCan.jsx'
import CardboardBox from './CardboardBox.jsx'

const OBSTACLE_COMPONENTS = {
  scrap: ScrapMetal,
  ewaste: EWaste,
  bottle: PlasticBottle,
  can: AluminumCan,
  box: CardboardBox,
}

export default function Obstacle({ type }) {
  const Component = OBSTACLE_COMPONENTS[type] ?? ScrapMetal
  return <Component />
}
