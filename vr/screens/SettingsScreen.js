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

            <View style={styles.containerItem}>
              <Text
                style={styles.text}>
                angle
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={styles.text} >
                  {this.props.state.settingsCannon.angle} °
                </Text>

                <SelectionArrows
                  onPressUp={this.props.onPressAngleUp}
                  onPressDown={this.props.onPressAngleDown} />
              </View>
            </View>

            <View style={styles.containerItem}>
              <Text
                style={styles.text}>
                initial velocity
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={styles.text} >
                  {this.props.state.settingsCannon.initialVelocity} m/s
                </Text>

                <SelectionArrows
                  onPressUp={this.props.onPressVelocityUp}
                  onPressDown={this.props.onPressVelocityDown} />
              </View>
            </View>

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
