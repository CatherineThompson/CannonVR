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
              onPressUp={() => this.props.onPressValue('angle', 'up')}
              onPressDown={() => this.props.onPressValue('angle', 'down')} />

            <SettingsItemWithArrows
              title='initial velocity'
              value={this.props.state.settingsCannon.initialVelocity}
              units='m/s'
              onPressUp={() => this.props.onPressValue('initialVelocity', 'up')}
              onPressDown={() => this.props.onPressValue('initialVelocity', 'down')} />

            <SettingsItemWithArrows
              title='ship distance'
              value={this.props.state.settingsCannon.shipDistance}
              units='m'
              onPressUp={() => this.props.onPressValue('shipDistance', 'up')}
              onPressDown={() => this.props.onPressValue('shipDistance', 'down')} />

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
