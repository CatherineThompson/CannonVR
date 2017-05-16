import React from 'react'
import {
  Sphere
} from 'react-vr'
import { calculateHeight, calculateDistance } from '../utilities/PhysicsHelpers'

export function showPathOutline (shipDistance, vx, vy) {
  var sphereArcPath = []
  for (let i = 0; calculateDistance(i, vx) >= shipDistance; i = i + 0.25) {
    sphereArcPath.push(
      <Sphere
        key={i}
        radius={0.3}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: 'green',
          position: 'absolute',
          transform: [
            { translate: [0, calculateHeight(i, vy), calculateDistance(i, vx)] },
          ]
        }}
      />
    )
  }
  return sphereArcPath
}
