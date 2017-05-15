
export const calculateVx = (initialVelocity, angle) => {
  return initialVelocity * Math.cos(angle / 180 * Math.PI)
}

export const calculateVy = (initialVelocity, angle) => {
  return initialVelocity * Math.sin(angle / 180 * Math.PI)
}

export const calculateHeight = (time, vy) => {
  return -0.5 * 9.8 * time * time + vy * time
}

export const calculateDistance = (time, vx) => {
  return -1 * time * vx
}

export const timeToShip = (shipDistance, vx) => {
  return -1 * shipDistance / vx
}

export const isHit = (shipDistance, vx, vy) => {
  const heightAtShip = calculateHeight(timeToShip(shipDistance, vx), vy)
  if (heightAtShip > 0.1 || heightAtShip < -0.1) {
    return false
  }
  return true
}
