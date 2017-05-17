import React from 'react'
import {
  asset,
  View,
  Text,
  StyleSheet,
  VrButton
} from 'react-vr'

const Switch = ({onPressOn, onPressOff, value}) => (
  <View style={styles.container}>

    <VrButton
      onClickSound={{
        wav: asset('Sounds/Click.wav')
      }}
      onClick={onPressOn}
      >
      <Text
        style={[styles.text, {backgroundColor: value ? 'blue' : 'transparent'}]}>
        ON
      </Text>
    </VrButton>

    <VrButton
      onClickSound={{
        wav: asset('Sounds/Click.wav')
      }}
      onClick={onPressOff}>
      <Text
        style={[styles.text, {backgroundColor: !value ? 'blue' : 'transparent'}]}>
        OFF
      </Text>
    </VrButton>

  </View>
)

export default Switch

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 0.2,
    paddingLeft: 0.1,
    paddingRight: 0.1,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})
