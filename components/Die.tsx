import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export interface DieProbs {
    value: number;
    isHeld: boolean;
    id: string;
    hold: () => void;
};

export default function Die({value, isHeld, hold} : DieProbs) {

    const style = isHeld ? styles.dieHeld : styles.die;

    return (
        <View style={style}>
            <TouchableHighlight onPress={hold} underlayColor="white">
                <Text style={styles.dieFace}>{value}</Text>
            </TouchableHighlight>
        </View>
    )
};

const styles = StyleSheet.create({
    die: {
      backgroundColor: '#0dd',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: 70,
      height: 70,
      color: 'black',
      padding: 5,
    },
    dieHeld: {
        backgroundColor: '#dd0',
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: 70,
        height: 70,
        color: 'black',
        padding: 5,
      },
    dieFace: {
      fontWeight: "800",
      fontSize: 26,
    },
  });