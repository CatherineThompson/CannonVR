import React from 'react'
import {
  asset,
  Pano,
  View,
  Sphere,
  Scene,
  Animated
} from 'react-vr'
import { Easing } from 'react-native'
import PirateShipModel, { Burst } from '../components/PirateShipModel'
import CannonModel from '../components/CannonModel'
import { showDistanceMarkers } from '../components/DistanceMarkers'
import { showPathOutline } from '../components/PathOutline'
import {
  calculateVx,
  calculateVy,
  calculateHeight,
  calculateDistance,
  timeToShip,
  isHit
} from '../utilities/PhysicsHelpers'

export default class CannonScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      settingsVisual: {
        pointOfView: 'stepOut', // 'firstPerson' or 'stepOut'
        showOutline: true, // outline path the cannon ball will take
        showBackground: false, // shows the pano image if true
        slowMo: false, // shoots the cannon ball at half speed
        distanceMarkers: 5 // distance the markers spread out in meters
      },
      settingsCannon: {
        initialVelocity: 39, // in m/s/s
        shipDistance: -120 // must be negative since forward is in the -Z direction
      },
      vx: 0,
      vy: 0,
      height: 0,
      distance: 0,
      showHit: false
    }

    this._animatedValue = new Animated.Value(0)
    this._animatedValue.addListener(({value}) => this.setState({
      height: calculateHeight(value, this.state.vy),
      distance: calculateDistance(value, this.state.vx)
    }))
  }

  componentWillMount () {
    const { initialVelocity } = this.state.settingsCannon
    const { angle } = this.props.state.settingsCannon
    this.setState({
      vx: calculateVx(initialVelocity, angle),
      vy: calculateVy(initialVelocity, angle)
    })
  }

  componentDidMount () {
    this._handleFire()
  }

  _handleFire = () => {
    const { settingsVisual, settingsCannon, vx } = this.state
    Animated.timing(this._animatedValue, {
      toValue: timeToShip(settingsCannon.shipDistance, vx),
      easing: Easing.linear,
      duration: settingsVisual.slowMo ? 10000 : 5000
    }).start(this._handleFireEnd)
  }

  _handleFireEnd = () => {
    const { settingsCannon, vx, vy } = this.state

    if (isHit(settingsCannon.shipDistance, vx, vy)) {
      this.setState({showHit: true})
    }
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
    const {
      settingsVisual,
      settingsCannon,
      height,
      distance,
      vx,
      vy,
      showHit
    } = this.state
    const { angle } = this.props.state.settingsCannon
    return (
      <View>
        { settingsVisual.showBackground
          ? <Pano source={asset('Panos/simple_surface.jpg')}/>
          : null
        }

        { this.showPointofView() }

        { showDistanceMarkers(
            settingsVisual.distanceMarkers,
            settingsCannon.shipDistance
          )
        }

        { settingsVisual.showOutline
          ? showPathOutline(settingsCannon.shipDistance, vx, vy)
          : null
        }

        <Animated.View style={{
          position: 'absolute',
          transform: [
            { translateZ: distance },
            { translateY: height }
          ]
        }}>
        <Sphere
          radius={0.3}
          widthSegments={20}
          heightSegments={12}
          style={{color: '#D3D3D3'}}
        />
        </Animated.View>

        <CannonModel angle={angle} />
        <PirateShipModel shipDistance={settingsCannon.shipDistance} />
        { showHit ? <Burst shipDistance={settingsCannon.shipDistance} /> : null }

      </View>
    )
  }
}
