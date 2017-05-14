import React from 'react'
import {
  Sphere
} from 'react-vr'

export function showDistanceMarkers (distanceBetween, shipDistance) {
  const positiveShipDistance = -1 * shipDistance

  var spherePath = []
  for (let i = 0; i < positiveShipDistance; i = i + distanceBetween) {
    spherePath.push(
      <Sphere
        radius={0.3}
        widthSegments={20}
        heightSegments={12}
        style={{
          color: 'red',
          position: 'absolute',
          transform: [
            { translate: [0, 0, -i] },
          ]
        }}
      />
    )
  }
  return spherePath
}
