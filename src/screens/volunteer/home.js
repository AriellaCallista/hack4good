import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import Button from '../../components/button'
import { setUserRole } from '../../api/firestore'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function HomeVolunteer({navigation}) {

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <View style={styles.profileBG}>
              <FontAwesome6 name="user-large" size={55} color="white" />
            </View>
          </TouchableOpacity>

          <View style={{marginHorizontal: 40}}>
            <Text style={{fontFamily: "Lilita", color: "white", fontSize: 30}}>Welcome User,</Text>
            <Text style={{fontFamily: "Rubik", color: "white", fontSize: 23, marginTop: 3, marginBottom: 3}}>Ariella</Text>
          </View>

          <View style={{marginRight: 20, marginBottom: 10}}>
            <MaterialCommunityIcons name="qrcode-scan" size={60} color="white" />
          </View>
         

         
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '95%', marginTop: -18}}>
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Opportunities</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Chat</Text>
            </View>
          </TouchableOpacity>

        </View>
        
        
        <View style={styles.header2}>
           
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
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        shadowColor: '#000', // Shadow color can be adjusted
        shadowOffset: {
          width: 0,
          height: 2, // The y-axis offset of the shadow
        },
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        // shadowOpacity: 0.25, // The opacity of the shadow
        // shadowRadius: 3.84, // The blur radius of the shadow
        // elevation: 5, // This adds shadow on Android (shadow props are for iOS)
        // // You might want to add margin here if needed
        marginBottom: 30

    },
    header2: {
        backgroundColor: colors.darkGrey,
        borderRadius: 15,
        height: "85%",
        width: "95%",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',      
    },
    button: {
      backgroundColor: colors.lightGrey,
      height: 'auto',
      borderColor: colors.magentaRed,
      borderWidth: 3,
      padding: 10,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      width: 185,
      marginBottom: 12
      
    },
    buttonText: {
      fontFamily: "Lilita",
      color: colors.magentaRed,
      fontSize: 23
    },
    profileBG: {
      backgroundColor: colors.lightPink,
      width: 85,
      height: 85,
      borderRadius: 25,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20

    }
})