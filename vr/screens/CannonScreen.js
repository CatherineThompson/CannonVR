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
    const { angle, initialVelocity } = this.props.state.settingsCannon
    this.setState({
      vx: calculateVx(initialVelocity, angle),
      vy: calculateVy(initialVelocity, angle)
    })
  }

  componentDidMount () {
    this._handleFire()
  }

  _handleFire = () => {
    const { vx } = this.state
    const { shipDistance } = this.props.state.settingsCannon
    const { slowMo } = this.props.state.settingsVisual

    Animated.timing(this._animatedValue, {
      toValue: timeToShip(shipDistance, vx),
      easing: Easing.linear,
      duration: slowMo ? 10000 : 5000
    }).start(this._handleFireEnd)
  }

  _handleFireEnd = () => {
    const { vx, vy } = this.state
    const { shipDistance } = this.props.state.settingsCannon

    if (isHit(shipDistance, vx, vy)) {
      this.setState({showHit: true})
    }
  }

  showPointofView = () => {
    const { pointOfView } = this.props.state.settingsVisual
    const { shipDistance } = this.props.state.settingsCannon

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
      height,
      distance,
      vx,
      vy,
      showHit
    } = this.state
    const { angle, shipDistance } = this.props.state.settingsCannon
    const {
      showOutline,
      showBackground,
      distanceMarkers
    } = this.props.state.settingsVisual

    return (
      <View>
        { showBackground
          ? <Pano source={asset('Panos/simple_surface.jpg')}/>
          : null
        }

        { this.showPointofView() }

        { showDistanceMarkers(
            distanceMarkers,
            shipDistance
          )
        }

        { showOutline
          ? showPathOutline(shipDistance, vx, vy)
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
        <PirateShipModel shipDistance={shipDistance} />
        { showHit ? <Burst shipDistance={shipDistance} /> : null }

      </View>
    )
  }
}
