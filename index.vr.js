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
      settingsVisual: {
        pointOfView: 'stepOut', // 'firstPerson' or 'stepOut'
        showOutline: false, // outline path the cannon ball will take
        showBackground: false, // shows the pano image if true
        slowMo: true, // shoots the cannon ball at half speed
        distanceMarkers: 10 // distance the markers spread out in meters
      },
      settingsCannon: {
        angle: 30, // in degrees, angle cannon will shoot from the ground
        initialVelocity: 40, // in m/s/s
        shipDistance: -150 // must be negative since forward is in the -Z direction
      },
      vx: 0,
      vy: 0,
      height: 0,
      distance: 0
    }
    this._animatedValue = new Animated.Value(0)
    this._animatedValue.addListener(({value}) => this.setState({
      height: -0.5 * 9.8 * value * value + this.state.vy * value,
      distance: -1 * value * this.state.vx
    }))
  }

  componentWillMount () {
    const { angle, initialVelocity } = this.state.settingsCannon
    this.setState({
      vx: initialVelocity * Math.cos(angle / 180 * Math.PI),
      vy: initialVelocity * Math.sin(angle / 180 * Math.PI)
    })
  }

  componentDidMount () {
    this._handleFire()
  }

  _calculateHeight = (time, vy) => {
    return -0.5 * 9.8 * time * time + vy * time
  }
  _calculateDistance = (time, vx) => {
    return vx * time
  }

  _handleFire = () => {
    Animated.timing(this._animatedValue, {
      toValue: 5,
      duration: this.state.settingsVisual.slowMo ? 10000 : 5000
    }).start()
  }

  showPointofView = () => {
    const { pointOfView } = this.state.settingsVisual
    const { shipDistance } = this.state.settingsCannon

    if (pointOfView === 'firstPerson') {
      return (
        <Scene style={{
          position: 'absolute',
          transform: [
            { translate: [0, 1.5, 3] },
          ]
        }} />
      )
    } else if (pointOfView === 'stepOut') {
      return (
        <Scene style={{
          position: 'absolute',
          transform: [
            { translate: [70, 0, shipDistance / 2] },
            { rotateY: 90 }
          ]
        }} />
      )
    }
  }

  showDistanceMarkers = () => {
    const { distanceMarkers } = this.state.settingsVisual
    const { shipDistance } = this.state.settingsCannon
    const positiveShipDistance = -1 * shipDistance

    var spherePath = []
    for (let i = 0; i < positiveShipDistance; i = i + distanceMarkers) {
      spherePath.push(
        <Sphere
          radius={0.2}
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

  showArc = () => {
    const { shipDistance } = this.state.settingsCannon
    var sphereArcPath = []
    for (let i = 0; -i * this.state.vx > shipDistance; i = i + 0.25) {
      const height = this._calculateHeight(i, this.state.vy)
      sphereArcPath.push(
        <Sphere
          radius={0.5}
          widthSegments={20}
          heightSegments={12}
          style={{
            color: 'green',
            position: 'absolute',
            transform: [
              { translate: [0, height, -i * this.state.vx] },
            ]
          }}
        />
      )
    }
    return sphereArcPath
  }

  render () {
    const { settingsVisual, settingsCannon } = this.state
    return (
      <View style={{}}>
        { settingsVisual.showBackground
          ? <Pano source={asset('simple_surface.jpg')}/>
          : null
        }

        { this.showPointofView() }
        { this.showDistanceMarkers() }
        { settingsVisual.showOutline ? this.showArc() : null }

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
         { settingsCannon.angle }°
        </Text>

       <Animated.View style={{
         position: 'absolute',
         opacity: 0.5,
         borderColor: 'red',
         borderWidth: 1,
         transform: [
           { translateZ: this.state.distance },
           { translateY: this.state.height }
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
              { rotateX: settingsCannon.angle },
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
              { translate: [0, 0, settingsCannon.shipDistance] },
              { scale: 0.003 }
            ]
          }}
        />

      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
