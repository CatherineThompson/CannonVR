import React from 'react'
import {
  asset,
  Model
} from 'react-vr'

const PirateShipModel = ({shipDistance}) => (
  <Model
    source={{
      obj: asset('Ship/Pirate Ship.obj'),
      mtl: asset('Ship/Pirate Ship.mtl')
    }}
    style={{
      position: 'absolute',
      transform: [
        { translate: [0, 0, -1 * shipDistance] },
        { scale: 0.003 }
      ]
    }}
  />
)


export const Burst = ({shipDistance}) => (
  <Model
    source={{
      obj: asset('FireBurst/FireBurst2.obj'),
      mtl: asset('FireBurst/FireBurst2.mtl')
    }}
    style={{
      position: 'absolute',
      transform: [
        { translate: [0, -5, -1 * shipDistance] },
        { scale: 5 }
      ]
    }}
  />
)

export default PirateShipModel
