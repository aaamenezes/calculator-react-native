import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight
} from 'react-native';

export default function Button({
  label,
  double,
  triple,
  operation,
  onPress
}) {
  const stylesButton = [styles.button]

  if (double) stylesButton.push(styles.buttonDouble)
  if (triple) stylesButton.push(styles.buttonTriple)
  if (operation) stylesButton.push(styles.operationButton)

  return (
    <TouchableHighlight onPress={onPress}>
      <Text style={stylesButton}>
        {label}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 4,
    padding: 20,
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  },
  operationButton: {
    backgroundColor: '#FA8231',
    color: '#fff'
  },
  buttonDouble: {
    width: (Dimensions.get('window').width / 4) * 2
  },
  buttonTriple: {
    width: (Dimensions.get('window').width / 4) * 3
  }
});
