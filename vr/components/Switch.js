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
      onClickSound={{ wav: asset('Sounds/Click.wav') }}
      onClick={onPressOn} >
      <Text
        style={[styles.text, {backgroundColor: value ? 'blue' : 'transparent'}]}>
        ON
      </Text>
    </VrButton>

    <VrButton
      onClickSound={{ wav: asset('Sounds/Click.wav') }}
      onClick={onPressOff} >
      <Text
        style={[styles.text, {backgroundColor: !value ? 'blue' : 'transparent'}]}>
        OFF
      </Text>
    </VrButton>

  </View>
)

export const SwitchItems = ({onPressStepOut, onPressFirstPerson, value}) => (
  <View style={styles.containerSwitchItems}>

    <VrButton
      onClickSound={{ wav: asset('Sounds/Click.wav') }}
      onClick={onPressStepOut} >
      <Text
        style={[styles.text, {backgroundColor: value === 'stepOut' ? 'blue' : 'transparent'}]}>
        Step Out
      </Text>
    </VrButton>

    <VrButton
      onClickSound={{ wav: asset('Sounds/Click.wav') }}
      onClick={onPressFirstPerson}>
      <Text
        style={[styles.text, {backgroundColor: value === 'firstPerson' ? 'blue' : 'transparent'}]}>
        First Person
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
  containerSwitchItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 0.12
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
