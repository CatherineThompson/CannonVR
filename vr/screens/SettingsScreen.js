import React from 'react'
import {
  asset,
  View,
  Text,
  Pano,
  StyleSheet,
  VrButton
} from 'react-vr'
import SettingsItemWithArrows from '../components/SettingsItemWithArrows'

export default class SettingsScreen extends React.Component {
  render () {
    return (
      <View>
        <Pano source={asset('Panos/simple_surface.jpg')}/>

        <View style={styles.containerSettings}>
          <View style={{flex: 1}}>

            <Text
              style={styles.text}>
              SETTINGS
            </Text>

            <SettingsItemWithArrows
              title='angle'
              value={this.props.state.settingsCannon.angle}
              units='°'
              onPressUp={() => this.props.onPressCannonSettings('angle', 'up')}
              onPressDown={() => this.props.onPressCannonSettings('angle', 'down')} />

            <SettingsItemWithArrows
              title='initial velocity'
              value={this.props.state.settingsCannon.initialVelocity}
              units='m/s'
              onPressUp={() => this.props.onPressCannonSettings('initialVelocity', 'up')}
              onPressDown={() => this.props.onPressCannonSettings('initialVelocity', 'down')} />

            <SettingsItemWithArrows
              title='ship distance'
              value={this.props.state.settingsCannon.shipDistance}
              units='m'
              onPressUp={() => this.props.onPressCannonSettings('shipDistance', 'up')}
              onPressDown={() => this.props.onPressCannonSettings('shipDistance', 'down')} />

            <SettingsItemWithArrows
              title='marker distance'
              value={this.props.state.settingsVisual.distanceMarkers}
              units='m'
              onPressUp={() => this.props.onPressVisualSettings('distanceMarkers', 'up')}
              onPressDown={() => this.props.onPressVisualSettings('distanceMarkers', 'down')} />

          </View>

          <VrButton
            onClick={this.props.onPressFire}>
            <Text
              style={styles.fireButton}>
              Fire!
            </Text>
          </VrButton>
        </View>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  containerSettings: {
    backgroundColor: '#1A0DAB',
    transform: [
      {translate: [0, 0, -3]}
    ]
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 0.2,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  fireButton: {
    backgroundColor: 'red',
    fontSize: 0.2,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})
