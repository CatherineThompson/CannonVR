import React from 'react'
import {
  asset,
  VrButton,
  Text
} from 'react-vr'

const TextButton = ({ text }) => (
  <VrButton
    onClickSound={{
      wav: asset('Cannon.wav')
    }}
    onClick={this._handleFire}
    >
    <Text
      style={{
        backgroundColor: 'red',
        fontSize: 0.8,
        fontWeight: '400',
        paddingLeft: 0.2,
        paddingRight: 0.2,
        textAlign: 'center',
        textAlignVertical: 'center',
        position: 'absolute',
        transform: [
          { rotateY: -20 },
          { translate: [0, 2, -10] },
        ]
      }} >
     { text }
    </Text>
  </VrButton>
)

export default TextButton

{/* <Text
  style={{
    backgroundColor: 'orange',
    fontSize: 0.8,
    fontWeight: '400',
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    transform: [
      { rotateY: -20 },
      { translate: [0, 1, -10] },
    ]
  }}
  >
 { settingsCannon.angle }°
</Text> */}
