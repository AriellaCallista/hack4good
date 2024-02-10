import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Linking, Alert } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { colors } from '../../utils/colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler'
import { doc, getDoc, setDoc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { db, authentication } from '../../../config'
import * as ImagePicker from 'expo-image-picker';
import { saveVolunteerData, saveEventData } from '../../api/firestore';

export default function Opportunites() {

  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    gender: '',
    workStatus: '',
    interests: [],
    skills: [],
    username: ''
  })



  useEffect(() => {
    const unsubscribeEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
      const eventsData = [];
      snapshot.forEach((doc) => {
        eventsData.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsData);
    });
  
    const unsubscribeUser = onSnapshot(doc(db, 'users', authentication.currentUser.uid), (doc) => {
      if (doc.exists()) {
        setCurrentUser({ id: doc.id, ...doc.data() }); // Assuming setCurrentUser is your state setter for the user data
      } else {
        // Handle the case where the user document does not exist
        console.log("No such document!");
      }
    });
  
    // Cleanup function
    return () => {
      unsubscribeEvents();
      unsubscribeUser();
    };
  }, []); // Dependency array is empty, meaning this effect runs once on mount.


  const handleJoin = async (event) => {
    if (currentUser.gender === undefined ||  currentUser.workStatus === undefined || currentUser.interests === undefined || currentUser.skills === undefined) {
        Alert.alert("Incomplete Profile", "Please make sure all your profile fields are filled out.");
    } else {
        saveVolunteerData(event.newEvent, currentUser.name, currentUser.gender, currentUser.workStatus, currentUser.interests, currentUser.skills, currentUser.username)
        saveEventData(event)
        Alert.alert("You're In!", "Head over to your chats to dive into the group conversation and meet others attending.");
    }
  };

  return (
    <View style={styles.posts}>
          <Text style={styles.subtitle}>Events</Text>
          <ScrollView style={styles.posts}>
            {events.map((event) => (
              <View key={event.id} style={styles.eventItem}>
                <Image source={{uri: event.eventPic}} style={styles.postsImg}/>
                <Text style={styles.postsTitle}>{event.newEvent}</Text>
                <Text style={styles.postsCaption}>{event.newEventDesc}</Text>
                <View style={styles.dateButtonContainer}>
                    
                    <TouchableOpacity style={styles.button2} onPress={() => handleJoin(event)}>
                        <Text style={styles.button2Text}>Join</Text>
                    </TouchableOpacity>
                   
                  <Text style={styles.postsDate}>{event.eventDate}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
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

    },
    subtitle: {
      fontFamily: "Lilita",
      color: colors.magentaRed,
      fontSize: 22,
      margin: 10
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

    },
    eventItem: {
      backgroundColor: 'transparent',
      padding: 5,
      marginLeft: 10,
      marginRight: 10, 
      marginBottom: 10,
      width: '1000vw'
    },
    postsImg: {
      height: 200,
      borderRadius: 20
    },
    postsTitle: {
      fontFamily: "Lilita",
      color: colors.magentaRed,
      fontSize: 30,
      marginTop: 5,
      marginLeft: 7
    },
    postsCaption: {
      fontFamily: 'Rubik',
      marginLeft: 7,
      marginTop: 5,
      marginBottom: 10
    },
    postsDate: {
      backgroundColor: 'transparent',
      width: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      height: 35,
      fontFamily: 'Lilita',
      fontSize: 20,
      color: colors.darkPink
    },
    dateButtonContainer: {
      flexDirection: 'row'
    }
})