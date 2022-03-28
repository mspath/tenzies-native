import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Die, { DieProbs } from './components/Die';

export default function App() {

  /**
   * returns an array of 10 random DieProps
   */
  function allNewDice(): DieProbs[] {
      const newDice: DieProbs[] = []
      for (let i = 0; i < 10; i++) {
        const number = Math.ceil(Math.random() * 6)
        const die = {value: number, isHeld: false, id: i.toString(), hold: () => handleHold(i.toString())}
        newDice.push(die)
      }
      return newDice
  }

  const [dice, setDice] = React.useState(allNewDice())

  function handleRoll() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      return
    }
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  function handleHold(id: string) {
    console.log(`handling hold: ${id}`);
    setDice(oldDice => oldDice.map(die => {
      console.log(die);
      return id === die.id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  
  function createDieElement(die: DieProbs): JSX.Element {
    return <Die 
            value={die.value} 
            isHeld={die.isHeld} 
            id={die.id} 
            hold={die.hold}
            key={die.id} 
          />
  }

  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const value = dice[0].value
    const allSame = dice.every(die => die.value === value)
    if (allHeld && allSame) {
      setTenzies(true)
    }}, [dice]
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tenzies</Text>
        <Text>Roll until all dice are the same. Click to lock.</Text>
      </View>
      <View style={styles.tenzies}>
        {dice.map(die => createDieElement(die))}
      </View>
      <View style={styles.roll}>
        <Button title={tenzies ? "New Game" : "Roll"} onPress={handleRoll}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  tenzies: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: '#ccc',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    borderWidth: 10,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 400,
  },
  roll: {
    flex: 2,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 400,
  },
  header: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#ccc',
    justifyContent: 'center',
    width: 400,
    padding: 10,
  },
  title: {
    fontFamily: "monospace",
    fontSize: 26
  }
});
