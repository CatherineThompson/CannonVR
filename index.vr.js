import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
  Text,
  Sound
} from 'react-vr'

export default class CannonVR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      angle: 0,
      boom: 'stop'
    }
  }

  render () {
    return (
      <View style={{}}>
        <Pano source={asset('simple_surface.jpg')}/>
        <Text
          style={{
            backgroundColor: '#777879',
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
          }}>
         { this.state.angle }°
        </Text>
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
          onEnter={() => this.setState({angle: 20, boom: 'play'})}
          onExit={() => this.setState({angle: 0, boom: 'stop'})} >
          <Sound
            source={asset('Cannon.wav')}
            playStatus={this.state.boom}
          />
        </Model>
        <Model
          source={{
            obj: asset('Pirate Ship.obj'),
            mtl: asset('Pirate Ship.mtl')
          }}
          style={{
            position: 'absolute',
            transform: [
              { translate: [0, 4, -100] },
              { scale: 0.003 }
            ]
          }}
        />
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
