import React from 'react'
import {
  asset,
  View,
  Text,
  Pano,
  StyleSheet
} from 'react-vr'
import SelectionArrows from '../components/SelectionArrows'

export default class SettingsScreen extends React.Component {
  render () {
    return (
      <View>
        <Pano source={asset('Panos/simple_surface.jpg')}/>

        <View style={styles.containerSettings}>
          <View style={{flex: 1}}>

            <View style={styles.containerAngle}>
              <Text
                style={styles.text}>
                angle
              </Text>

              <Text
                style={styles.text}>
                {this.props.state.settingsCannon.angle} °
              </Text>

              <SelectionArrows
                onPressUp={this.props.onPressAngleUp}
                onPressDown={this.props.onPressAngleDown} />
            </View>

            <Text
              style={styles.text}>
              hello
            </Text>

          </View>
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
  containerAngle: {
    flex: 1,
    flexDirection: 'row'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 0.2,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})
