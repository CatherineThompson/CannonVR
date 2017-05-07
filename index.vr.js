import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
} from 'react-vr'

export default class CannonVR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      angle: 0
    }
  }

  render () {
    return (
      <View style={{}}>
        <Pano source={asset('simple_surface.jpg')}/>
        <Model
          source={{
            obj: asset('canon_jouet.obj'),
            mtl: asset('canon_jouet.mtl')
          }}
          style={{
            position: 'absolute',
            transform: [
              { translate: [0, -2, -1.5] },
              { rotateX: this.state.angle },
              { rotateY: -90 },
              { scale: 0.13 }
            ]
          }}
          onEnter={() => this.setState({angle: 20})}
        />
        <Model
          source={{
            obj: asset('Pirate Ship.obj'),
            mtl: asset('Pirate Ship.mtl')
          }}
          style={{
            position: 'absolute',
            transform: [
              { translate: [0, -2, -200] },
              { scale: 0.01 }
            ]
          }}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
