import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect, useCallback }  from 'react'
import { colors } from '../../utils/colors'
import Button from '../../components/button'
import { setUserRole } from '../../api/firestore'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";
import { db, authentication } from '../../../config'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native';
import Opportunites from './opportunities'
import Chats from './chats'

export default function HomeVolunteer({navigation}) {
  const [name, setName] = useState(null)
  const [profileUrl, setProfileUrl] = useState()
  const [activeTab, setActiveTab] = useState('opportunities')

  const handleTabPress = (tabName) => {
    setActiveTab(tabName)
  }

  useFocusEffect(
    useCallback(() => {
        getDoc(doc(db, "users", authentication.currentUser.uid))
            .then((doc) => {
                setName(doc.get('name'))
                setProfileUrl(doc.get('photoURL'))
                console.log(profileUrl)
            })    
     }, [])
  )  

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.profileBG}>
              { profileUrl !== ""
              ? <Image source={{uri: profileUrl}} style={[styles.profileBG, {marginLeft: 0, marginTop: 0}]} />
              : <FontAwesome6 name="user-large" size={55} color="white" /> 
              }
            </View>
          </TouchableOpacity>

          <View style={{marginLeft: -30}}>
            <Text style={{fontFamily: "Lilita", color: "white", fontSize: 30}}>Welcome User,</Text>
            <Text style={{fontFamily: "Rubik", color: "white", fontSize: 23, marginTop: 3, marginBottom: 3}}>{name}</Text>
          </View>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: -20}}>
          <TouchableOpacity onPress={() => handleTabPress('opportunities')}>
            { activeTab === 'opportunities'
            ? <View style={[styles.button, {backgroundColor: colors.activeGrey}]}>
                <Text style={styles.buttonText}>Opportunities</Text>
              </View>
            : <View style={[styles.button, {backgroundColor: colors.lightGrey}]}>
                <Text style={styles.buttonText}>Opportunities</Text>
              </View>
            
            }
            
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleTabPress('chats')}>
          { activeTab === 'chats'
            ? <View style={[styles.button, {backgroundColor: colors.activeGrey}]}>
                <Text style={styles.buttonText}>Chats</Text>
              </View>
            : <View style={[styles.button, {backgroundColor: colors.lightGrey}]}>
                <Text style={styles.buttonText}>Chats</Text>
              </View>
            
            }
          </TouchableOpacity>
        </View>

        <View style={styles.header2}>
          {activeTab === 'opportunities' && <Opportunites/>}
          {activeTab === 'chats' && <Chats navigation={navigation}/>}
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
      marginLeft: -35

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
      width: '100vw',
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