import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-vr'
import SelectionArrows from './SelectionArrows'

const SettingsItemWithArrows = ({title, value, units, onPressUp, onPressDown}) => (
  <View style={styles.containerItem}>
    <Text
      style={styles.text}>
      { title }
    </Text>

    <View style={{flexDirection: 'row'}}>
      <Text
        style={styles.text} >
        {value} {units}
      </Text>

      <SelectionArrows
        onPressUp={onPressUp}
        onPressDown={onPressDown} />
    </View>
  </View>
)

export default SettingsItemWithArrows

var styles = StyleSheet.create({
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0.1
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
