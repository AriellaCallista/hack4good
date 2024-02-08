import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import Button from '../components/button'
import { setUserRole } from '../api/firestore'

export default function Welcome({navigation}) {

    const handleVolunteer = async () => {
        navigation.navigate('LoginVol')
        
    }

    const handleAdministrator = async () => {
        navigation.navigate('LoginAdm')
    }


  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require('../assets/icons/heart.png')} style={styles.logo} />
            <Text style={styles.welcome}>WELCOME TO HEARTLINE</Text>
            <Text style={styles.continue}>Continue as</Text>
        </View>
        <View style={styles.header2}>
            <Button color={colors.darkRed} 
            textColor={"#FFFFFF"}
            borderRadius={30}
            width={300}
            text="Volunteer"
            icon={require('../assets/icons/volunteer.png')}
            onPress={handleVolunteer} />

            <Button color={colors.darkRed} 
            textColor={"#FFFFFF"}
            borderRadius={30}
            width={300}
            text="Administrator"
            icon={require('../assets/icons/working.png')}
            onPress={handleAdministrator} />
        </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightPink,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    header: {
        backgroundColor: colors.darkPink, // Replace with the actual color of your card
        borderRadius: 15, // Adjust to match the border radius in your design
        padding: 20, // Adjust the padding as needed
        alignItems: 'center',
        justifyContent: 'space-evenly',
        shadowColor: '#000', // Shadow color can be adjusted
        shadowOffset: {
          width: 0,
          height: 2, // The y-axis offset of the shadow
        },
        height: '65%',
        width: '100%',
        // shadowOpacity: 0.25, // The opacity of the shadow
        // shadowRadius: 3.84, // The blur radius of the shadow
        // elevation: 5, // This adds shadow on Android (shadow props are for iOS)
        // // You might want to add margin here if needed
        marginBottom: 30

    },
    header2: {
        backgroundColor: colors.darkGrey,
        borderRadius: 15,
        height: "25%",
        width: "85%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',      
    },
    welcome: {
        fontFamily: 'Archivo',
        fontSize: 50,
        textAlign: 'center',
        color: "white",
        marginTop: -80,
    },
    continue: {
        fontFamily: "Archivo",
        color: "white",
        fontSize: 25
    },
    logo: {
        width: 300,
        height: 300
    }
})