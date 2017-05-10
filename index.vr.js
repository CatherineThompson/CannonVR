import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  Model,
  View,
  Text,
  Sound,
  Sphere,
  Scene,
  Animated
} from 'react-vr'

export default class CannonVR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      boom: 'stop',
      pointOfView: 'firstPerson',
      angle: 30,
      initialVelocity: 50,
      velocityX: 0,
      velocityY: 0,
      height: 0,
      time: new Animated.Value(0.5),
      shipDistance: -100
    }
  }

  componentWillMount () {
    this._calculateVelocities()
  }

  _calculateHeight = (time, vy) => {
    return -0.5 * 9.8 * time * time + vy * time
  }

  _calculateVelocities = (time, vy) => {
    this.setState({
      velocityX: this.state.initialVelocity * Math.cos(this.state.angle / 180 * Math.PI),
      velocityY: this.state.initialVelocity * Math.sin(this.state.angle / 180 * Math.PI)
    })
  }

  _handleFire = () => {
    Animated.timing(this.state.time, {
      toValue: 5,
      duration: 5000
    }).start()
  }

  _handleFire2 = () => {
    Animated.timing(this.state.time, {
      toValue: 0.5,
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

  render () {
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

    var sphereArcPath = []

    for (let i = 0; -i * this.state.velocityX > this.state.shipDistance; i = i + 0.25) {
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

    var CannonBall = Animated.createAnimatedComponent(Sphere)

    return (
      <View style={{}}>
        { this.showPointofView() }
        { spherePath }
        { sphereArcPath }
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
        <Animated.Text
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
              { translate: [0, 2, -10] },
            ]
          }}>
         { this.state.time }
       </Animated.Text>
        <CannonBall
          radius={this.state.time}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'blue',
            transform: [
              { rotateX: this.state.angle },
              { translate: [0, 2, -3.5] },
            ]
          }}
        />
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
          onEnter={() => {
            this.setState({ boom: 'start' })
            this._handleFire()
          }}
          onExit={() => {
            this.setState({ boom: 'stop' })
            this._handleFire2()
          }} >
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
