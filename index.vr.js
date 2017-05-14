import React from 'react'
import {
  AppRegistry,
  asset,
  Pano,
  View,
  Sphere,
  Scene,
  Animated
} from 'react-vr'
import PirateShipModel from './vr/PirateShipModel'
import CannonModel from './vr/CannonModel'
import { showDistanceMarkers } from './vr/DistanceMarkers'
import { showPathOutline } from './vr/PathOutline'

export default class CannonVR extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      settingsVisual: {
        pointOfView: 'stepOut', // 'firstPerson' or 'stepOut'
        showOutline: true, // outline path the cannon ball will take
        showBackground: false, // shows the pano image if true
        slowMo: false, // shoots the cannon ball at half speed
        distanceMarkers: 10 // distance the markers spread out in meters
      },
      settingsCannon: {
        angle: 50, // in degrees, angle cannon will shoot from the ground
        initialVelocity: 60, // in m/s/s
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

  render () {
    const { settingsVisual, settingsCannon } = this.state
    return (
      <View>
        { settingsVisual.showBackground
          ? <Pano source={asset('simple_surface.jpg')}/>
          : null
        }

        { this.showPointofView() }
        { showDistanceMarkers(
            settingsVisual.distanceMarkers,
            settingsCannon.shipDistance
          )
        }
        { settingsVisual.showOutline
          ? showPathOutline(
              settingsCannon.shipDistance,
              this.state.vx,
              this.state.vy
          )
          : null
        }

        <Animated.View style={{
          position: 'absolute',
          transform: [
            { translateZ: this.state.distance },
            { translateY: this.state.height }
          ]
        }}>
        <Sphere
          radius={0.3}
          widthSegments={20}
          heightSegments={12}
          style={{color: '#D3D3D3'}}
        />
        </Animated.View>

        <CannonModel angle={settingsCannon.angle} />
        <PirateShipModel shipDistance={settingsCannon.shipDistance} />

      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
