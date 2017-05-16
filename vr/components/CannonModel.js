import React from 'react'
import {
  asset,
  Model
} from 'react-vr'

const CannonModel = ({angle}) => (
  <Model
    source={{
      obj: asset('Cannon/canon_jouet.obj'),
      mtl: asset('Cannon/canon_jouet.mtl')
    }}
    style={{
      position: 'absolute',
      transform: [
        { translate: [0, -1, 0] },
        { rotateX: angle },
        { rotateY: -90 },
        { scale: 0.13 }
      ]
    }}
  />
)

export default CannonModel
