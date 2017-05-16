import React from 'react'
import {
  AppRegistry,
  View
} from 'react-vr'
import CannonScreen from './vr/screens/CannonScreen'
import SettingsScreen from './vr/screens/SettingsScreen'

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
        angle: 30, // in degrees, angle cannon will shoot from the ground
        initialVelocity: 39, // in m/s/s
        shipDistance: -70 // must be negative since forward is in the -Z direction
      },
      currentScreen: 'settings' // 'settings' or 'cannon'
    }
  }

  _handleOnPressAngleUp = () => {
    const { angle } = this.state.settingsCannon
    if (angle < 90) {
      this.state.settingsCannon.angle ++
      this.forceUpdate()
    }
  }

  _handleOnPressAngleDown = () => {
    const { angle } = this.state.settingsCannon
    if (angle > 0) {
      this.state.settingsCannon.angle--
      this.forceUpdate()
    }
  }

  _handleFire = () => {
    this.setState({currentScreen: 'cannon'})
  }

  render () {
    return (
      <View>
        {
          this.state.currentScreen === 'cannon'
          ? <CannonScreen
              state={this.state}
            />
          : <SettingsScreen
              state={this.state}
              onPressAngleUp={this._handleOnPressAngleUp}
              onPressAngleDown={this._handleOnPressAngleDown}
              onPressFire={this._handleFire}
            />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
