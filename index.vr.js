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
    },
    distanceMarkers: {
      high: 20,
      low: 5
    }
  }

  increments = {
    angle: 1,
    initialVelocity: 5,
    shipDistance: 5,
    distanceMarkers: 5
  }

  _handleOnPressCannonSettings = (setting, direction) => {
    const stateItem = this.state.settingsCannon[setting]

    if ((stateItem >= this.ranges[setting].high && direction === 'up') ||
      (stateItem <= this.ranges[setting].low && direction === 'down')) { return }

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

  _handleOnPressVisualSettings = (setting, direction) => {
    if (setting === 'distanceMarkers') {
      const currentDistance = this.state.settingsVisual.distanceMarkers

      if ((currentDistance >= this.ranges[setting].high && direction === 'up') ||
        (currentDistance <= this.ranges[setting].low && direction === 'down')) { return }

      if (direction === 'up') {
        const newValue = currentDistance + this.increments[setting]
        this.setState({
          ...this.state,
          settingsVisual: {
            ...this.state.settingsVisual,
            [setting]: newValue
          }
        })
      } else {
        const newValue = currentDistance - this.increments[setting]
        this.setState({
          ...this.state,
          settingsVisual: {
            ...this.state.settingsVisual,
            [setting]: newValue
          }
        })
      }
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
              onPressCannonSettings={this._handleOnPressCannonSettings}
              onPressVisualSettings={this._handleOnPressVisualSettings}
              onPressFire={this._handleFire}
            />
        }
      </View>
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
