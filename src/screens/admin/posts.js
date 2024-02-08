import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { colors } from '../../utils/colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Posts() {
    const [newEvent, setNewEvent] = useState(null)
    const [newEventDesc, setNewEventDesc] = useState(null)

  return (
    <View>
        <View style={styles.header3}>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput 
                    value={newEvent} 
                    style={styles.textInput} 
                    placeholder='Add a new event...'
                    onChangeText={text => setNewEvent(text)}
                />

        <Ionicons name="send" size={24} color={colors.magentaRed} style={{marginTop: 10, marginRight: 15}} />


        </View>

        <TextInput 
                value={newEventDesc} 
                style={styles.captionInput} 
                placeholder="What's it about?"
                onChangeText={text => setNewEventDesc(text)}
            />

        <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
        <TouchableOpacity>
            <View style={styles.button2}>
            <FontAwesome5 name="plus" size={15} color="white" />
            <Text style={styles.button2Text}>Images</Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.button2}>
            <FontAwesome5 name="plus" size={15} color="white" />
            <Text style={styles.button2Text}>App Form</Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity>
            <View style={styles.button2}>
            <FontAwesome5 name="plus" size={15} color="white" />
            <Text style={styles.button2Text}>Date</Text>

            </View>
        </TouchableOpacity>

        </View>

        </View>


        <View style={styles.posts}>
        <Text style={styles.subtitle}>Event History</Text>
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
        height: '18%',
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
      marginBottom: 12,
      
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

    },
    header3: {
      backgroundColor: colors.lightPink,
      width: '90%',
      height: '20%',
      borderRadius: 15,

    },
    posts: {
        // marginTop: 10,
        // backgroundColor: 'white',
        height: '75%'

    },
    subtitle: {
      fontFamily: "Lilita",
      color: colors.magentaRed,
      fontSize: 22,
      margin: 10
    },
    textInput: {
      fontFamily: "Lilita",
      color: colors.magentaRed,
      fontSize: 22,
      marginTop: 5,
      marginLeft: 10
     
    },
    captionInput: {
      fontFamily: 'Rubik',
      marginHorizontal: 10,
      // backgroundColor: colors.darkGrey,
      height: '45%',
      
    },
    caption: {

    },
    button2: {
      backgroundColor: colors.darkPink,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 10,
      width: 100,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 4,
      flexDirection: 'row',
      marginBottom: 20,
      marginTop: -1,
      marginHorizontal: 5

    },
    button2Text: {
      color: 'white',
      fontFamily: 'Lilita',
      fontSize: 17,
      marginLeft: 5

    }
})