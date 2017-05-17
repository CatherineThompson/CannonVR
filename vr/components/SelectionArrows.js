import React from 'react'
import {
  asset,
  View,
  Text,
  StyleSheet,
  VrButton
} from 'react-vr'

const SelectionArrows = ({onPressUp, onPressDown}) => (
  <View>

    <VrButton
      onClickSound={{ wav: asset('Sounds/Click.wav') }}
      onClick={onPressUp}>
      <Text style={styles.text}>^</Text>
    </VrButton>

    <VrButton
      onClickSound={{wav: asset('Sounds/Click.wav')}}
      onClick={onPressDown}>
      <Text style={styles.text}>v</Text>
    </VrButton>

  </View>
)

export default SelectionArrows

var styles = StyleSheet.create({
  text: {
    backgroundColor: 'transparent',
    fontSize: 0.2,
    paddingLeft: 0.1,
    paddingRight: 0.1,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})
