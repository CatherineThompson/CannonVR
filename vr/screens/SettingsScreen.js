import React from 'react'
import {
  asset,
  View,
  Text,
  Pano,
  StyleSheet,
  VrButton
} from 'react-vr'
import SelectionArrows from '../components/SelectionArrows'
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
              onPressUp={this.props.onPressAngleUp}
              onPressDown={this.props.onPressAngleDown} />

            <SettingsItemWithArrows
              title='initial velocity'
              value={this.props.state.settingsCannon.initialVelocity}
              units='m/s'
              onPressUp={this.props.onPressVelocityUp}
              onPressDown={this.props.onPressVelocityDown} />

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
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
