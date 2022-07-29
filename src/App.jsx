import React, { useState } from 'react';
import {
  Plataform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from './Button';
import Display from './Display';

export default function App() {
  const [ displayValue, setDisplayValue ] = useState('0')
  const [ clearDisplay, setClearDisplay ] = useState(false)
  const [ operation, setOperation ] = useState(null)
  const [ memoryValues, setMemoryValues ] = useState([0, 0])
  const [ position, setPosition ] = useState(0)

  function addDigit(digit) {
    if (digit === '.' && displayValue.includes('.')) return

    const currentDisplayValue = displayValue === '0' || clearDisplay
      ? ''
      : displayValue

    setDisplayValue(currentDisplayValue + digit)
    setClearDisplay(false)

    if (digit !== '.') {
      const newMemoryValues = memoryValues
      newMemoryValues[position] = displayValue
      setMemoryValues(newMemoryValues)
    }
  }

  function clearMemory() {
    setDisplayValue(0)
    setMemoryValues([ 0, 0 ])
    setPosition(0)
  }

  function handleOperation(currentOperation) {
    if (position === 0) {
      setClearDisplay(true)
      setOperation(currentOperation)
    } else {
      const equals = currentOperation === '='
      try {
        const newMemoryValues = []
        newMemoryValues.push(eval(`${memoryValues[0]} ${operation} ${memoryValues[1]}`))
        newMemoryValues.push(0)
        setMemoryValues(newMemoryValues)
      } catch(error) {
        
      }

      setDisplayValue(memoryValues[0])
      setOperation(equals ? null : currentOperation)
      setPosition(equals ? 0 : 1)
      setClearDisplay(true)
    }
    
    setPosition(1)
  }

  return (
    <View style={styles.container}>
      <Display displayValue={displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' onPress={clearMemory} triple />
        <Button label='/' onPress={() => handleOperation('/')} operation />
        <Button label='7' onPress={() => addDigit(7)} />
        <Button label='8' onPress={() => addDigit(8)} />
        <Button label='9' onPress={() => addDigit(9)} />
        <Button label='*' onPress={() => handleOperation('*')} operation />
        <Button label='4' onPress={() => addDigit(4)} />
        <Button label='5' onPress={() => addDigit(5)} />
        <Button label='6' onPress={() => addDigit(6)} />
        <Button label='-' onPress={() => handleOperation('-')} operation />
        <Button label='1' onPress={() => addDigit(1)} />
        <Button label='2' onPress={() => addDigit(2)} />
        <Button label='3' onPress={() => addDigit(3)} />
        <Button label='+' onPress={() => handleOperation('+')} operation />
        <Button label='0' double onPress={() => addDigit(0)} />
        <Button label='.' onPress={() => addDigit('.')} />
        <Button label='=' onPress={() => handleOperation('=')} operation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
