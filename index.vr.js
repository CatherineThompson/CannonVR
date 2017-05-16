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
        shipDistance: 150 // must be negative since forward is in the -Z direction
      },
      currentScreen: 'settings' // 'settings' or 'cannon'
    }
  }

  ranges = {
    angle: {
      high: 90,
      low: 0
    },
    initialVelocity: {
      high: 500,
      low: 5
    },
    shipDistance: {
      high: 200,
      low: 5
    }
  }

  increments = {
    angle: 1,
    initialVelocity: 5,
    shipDistance: 5
  }

  _handleOnPressValueChange = (setting, direction) => {
    const stateItem = this.state.settingsCannon[setting]

    if (stateItem >= this.ranges[setting].high ||
      stateItem <= this.ranges[setting].low) { return }

    if (direction === 'up') {
      const newValue = stateItem + this.increments[setting]
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          [setting]: newValue
        }
      })
    } else {
      const newValue = stateItem - this.increments[setting]
      this.setState({
        ...this.state,
        settingsCannon: {
          ...this.state.settingsCannon,
          [setting]: newValue
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
              onPressValue={this._handleOnPressValueChange}
              onPressFire={this._handleFire}
            />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
