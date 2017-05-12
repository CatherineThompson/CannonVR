import React from 'react'
import {
  asset,
  Model
} from 'react-vr'

const PirateShipModel = ({shipDistance}) => (
  <Model
    source={{
      obj: asset('Pirate Ship.obj'),
      mtl: asset('Pirate Ship.mtl')
    }}
    style={{
      position: 'absolute',
      transform: [
        { translate: [0, 0, shipDistance] },
        { scale: 0.003 }
      ]
    }}
  />
)

export default PirateShipModel
