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
        initialVelocity: 50, // in m/s/s
        shipDistance: -150 // must be negative since forward is in the -Z direction
      },
      currentScreen: 'settings' // 'settings' or 'cannon'
    }
  }

  _handleOnPressAngleUp = () => {
    const { angle } = this.state.settingsCannon
    if (angle < 90) {
      const newAngle = angle + 1
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          angle: newAngle
        }
      })
    }
  }

  _handleOnPressAngleDown = () => {
    const { angle } = this.state.settingsCannon
    if (angle > 0) {
      const newAngle = angle - 1
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          angle: newAngle
        }
      })
    }
  }

  _handleOnPressVelocityUp = () => {
    const { initialVelocity } = this.state.settingsCannon
    if (initialVelocity < 500) {
      const newInititalVelocity = initialVelocity + 5
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          initialVelocity: newInititalVelocity
        }
      })
    }
  }

  _handleOnPressVelocityDown = () => {
    const { initialVelocity } = this.state.settingsCannon
    if (initialVelocity > 5) {
      const newInititalVelocity = initialVelocity - 5
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          initialVelocity: newInititalVelocity
        }
      })
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
              onPressVelocityUp={this._handleOnPressVelocityUp}
              onPressVelocityDown={this._handleOnPressVelocityDown}
              onPressFire={this._handleFire}
            />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
