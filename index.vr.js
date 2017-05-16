import React from 'react'
import {
  AppRegistry
} from 'react-vr'
import CannonScreen from './vr/screens/CannonScreen'
import SettingsScreen from './vr/screens/SettingsScreen'

export default class CannonVR extends React.Component {
  render () {
    return (
      <SettingsScreen />
    )
  }
}

AppRegistry.registerComponent('CannonVR', () => CannonVR)
