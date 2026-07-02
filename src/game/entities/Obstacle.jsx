import Tornado from './Tornado.jsx'
import Bird from './Bird.jsx'
import StormCloud from './StormCloud.jsx'

const OBSTACLE_COMPONENTS = {
  tornado: Tornado,
  bird: Bird,
  storm: StormCloud,
}

export default function Obstacle({ type }) {
  const Component = OBSTACLE_COMPONENTS[type] ?? Tornado
  return <Component />
}
