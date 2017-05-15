import React from 'react'
import {
  Sphere
} from 'react-vr'

export function showPathOutline (shipDistance, vx, vy) {
  var sphereArcPath = []
  for (let i = 0; -i * vx >= shipDistance; i = i + 0.25) {
    const height = calculateHeight(i, vy)
    sphereArcPath.push(
      <Sphere
        radius={0.3}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: 'green',
          position: 'absolute',
          transform: [
            { translate: [0, height, -i * vx] },
          ]
        }}
      />
    )
  }
  return sphereArcPath
}

function calculateHeight (time, vy) {
  return -0.5 * 9.8 * time * time + vy * time
}
