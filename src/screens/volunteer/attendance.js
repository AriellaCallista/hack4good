import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function Attendance() {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        
      </View>

      <View style={styles.back}>
        <FontAwesome name="backward" size={30} color="white" />
        <Text style={{fontSize: 28, fontFamily: 'Lilita', color: 'white'}}>Chat</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.darkPink,
        width: '100%',
        height: '80%',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    body: {
        backgroundColor: colors.lightGrey,
        width: '97%',
        height: '92%',
        marginTop: 5,
        borderRadius: 15,
        shadowOpacity: 0.25, // The opacity of the shadow
        shadowRadius: 3.84, // The blur radius of the shadow
        elevation: 5, // This adds shadow on Android (shadow props are for iOS)
    },
    back: {
        backgroundColor: colors.mediumPink,
        height: '8%',
        width: '30%',
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: -250,
        borderColor: 'white',
        borderWidth: 1

    }
})