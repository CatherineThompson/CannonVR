import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
  Text,
  Sphere,
  Scene,
  Animated,
  VrButton
} from 'react-vr'

export default class CannonVR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      pointOfView: 'firstPerson',
      angle: 30,
      initialVelocity: 40,
      velocityX: 0,
      velocityY: 0,
      height: 0,
      time: new Animated.Value(-2),
      shipDistance: -100
    }
  }

  componentWillMount () {
    this.setState({
      velocityX: this.state.initialVelocity * Math.cos(this.state.angle / 180 * Math.PI),
      velocityY: this.state.initialVelocity * Math.sin(this.state.angle / 180 * Math.PI)
    })
  }

  _calculateHeight = (time, vy) => {
    return -0.5 * 9.8 * time * time + vy * time
  }

  _handleFire = () => {
    Animated.timing(this.state.time, {
      toValue: -100,
      duration: 5000
    }).start()
  }

  showPointofView = () => {
    if (this.state.pointOfView === 'firstPerson') {
      return (
        <Scene style={{
          position: 'absolute',
          transform: [
            { translate: [0, 1.5, 3] },
          ]
        }} />
      )
    } else if (this.state.pointOfView === 'stepOut') {
      return (
        <Scene style={{
          position: 'absolute',
          transform: [
            { translate: [70, 0, -50] },
            { rotateY: 90 }
          ]
        }} />
      )
    }
  }

  showPath = () => {
    var spherePath = []
    for (let i = 0; i < 20; i++) {
      spherePath.push(
        <Sphere
          radius={0.2}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'red',
            position: 'absolute',
            transform: [
              { translate: [0, 0, -i * 5] },
            ]
          }}
        />
      )
    }
    return spherePath
  }

  showArc = () => {
    var sphereArcPath = []
    for (let i = 1; -i * this.state.velocityX > this.state.shipDistance; i = i + 0.25) {
      const height = this._calculateHeight(i, this.state.velocityY)
      sphereArcPath.push(
        <Sphere
          radius={0.5}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'green',
            position: 'absolute',
            transform: [
              { translate: [0, height, -i * this.state.velocityX] },
            ]
          }}
        />
      )
    }
    return sphereArcPath
  }

  // { this.showPointofView() }

  render () {
    return (
      <View style={{}}>
        <Pano source={asset('simple_surface.jpg')}/>

        { this.showPath() }
        { this.showArc() }

        <Text
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
         { this.state.angle }°
        </Text>

       <Animated.View style={{
         position: 'absolute',
         opacity: 0.5,
         borderColor: 'red',
         borderWidth: 1,
         transform: [
           { translateZ: this.state.time },
         ]
       }}>
         <Sphere
           radius={0.2}
           widthSegments={20}
           heightSegments={12}
           style={{color: 'blue'}}
         />
       </Animated.View>

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
           FIRE!
          </Text>
        </VrButton>

        <Model
          source={{
            obj: asset('canon_jouet.obj'),
            mtl: asset('canon_jouet.mtl')
          }}
          style={{
            position: 'absolute',
            transform: [
              { translate: [0, -1, 0] },
              { rotateX: this.state.angle },
              { rotateY: -90 },
              { scale: 0.13 }
            ]
          }}
        />

        <Model
          source={{
            obj: asset('Pirate Ship.obj'),
            mtl: asset('Pirate Ship.mtl')
          }}
          style={{
            position: 'absolute',
            transform: [
              { translate: [0, 0, this.state.shipDistance] },
              { scale: 0.003 }
            ]
          }}
        />

      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
