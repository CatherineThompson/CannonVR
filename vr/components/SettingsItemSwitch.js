import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-vr'
import Switch from './Switch'

const SettingsItemSwitch = ({title, value, onPressOn, onPressOff}) => (
  <View style={styles.containerItem}>
    <Text
      style={styles.text}>
      { title }
    </Text>

    <Switch
      value={value}
      onPressOn={onPressOn}
      onPressOff={onPressOff} />
  </View>
)

export default SettingsItemSwitch

var styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0.03
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 0.2,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})
