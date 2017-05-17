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
import SettingsItemSwitch from '../components/SettingsItemSwitch'

export default class SettingsScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      xCenter: 0,
      yCenter: 0
    }
  }

  _repositionSettingsView = (event) => {
    if (this.state.xCenter === 0) {
      this.setState({
        xCenter: -1 * event.nativeEvent.width / 2,
        yCenter: event.nativeEvent.height / 2})
    }
  }

  render () {
    return (
      <View>
        <Pano source={asset('Panos/simple_surface.jpg')}/>

        <View
          billboarding='on'
          onLayout={this._repositionSettingsView}
          style={[styles.containerSettings, { transform: [
            {translate: [this.state.xCenter, this.state.yCenter, -5]}
          ]}]}>
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

            <SettingsItemSwitch
              title='show outline'
              value={this.props.state.settingsVisual.showOutline}
              onPressOn={() => this.props.onPressVisualSettings('showOutline', 'on')}
              onPressOff={() => this.props.onPressVisualSettings('showOutline', 'off')} />

            <SettingsItemSwitch
              title='show background'
              value={this.props.state.settingsVisual.showBackground}
              onPressOn={() => this.props.onPressVisualSettings('showBackground', 'on')}
              onPressOff={() => this.props.onPressVisualSettings('showBackground', 'off')} />

            <SettingsItemSwitch
              title='slow motion'
              value={this.props.state.settingsVisual.slowMo}
              onPressOn={() => this.props.onPressVisualSettings('slowMo', 'on')}
              onPressOff={() => this.props.onPressVisualSettings('slowMo', 'off')} />

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
    backgroundColor: '#1A0DAB'
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
