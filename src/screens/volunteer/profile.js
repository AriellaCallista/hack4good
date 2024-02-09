import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { colors } from '../../utils/colors'
import { db, authentication } from '../../../config'
import { getDoc, doc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler'


export default function Profile({navigation}) {
    const [userProfile, setUserProfile] = useState({
        name: "",
        username: "",
        gender: "",
        skills: "",
        interests: "",
        workStatus: "",
    });

    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
          try {
            const userDoc = await getDoc(doc(db, "users", authentication.currentUser.uid));
    
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserProfile(userData);
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        fetchUserProfile();
      }, []); 

    return (
        <ScrollView>
            <Text>Name: {userProfile.name}</Text>
            <Text>Username: {userProfile.username}</Text>
            <Text>Gender: {userProfile.gender}</Text>
            <Text>Skills: {userProfile.skills}</Text>
            <Text>Work Status: {userProfile.workStatus}</Text>
            <Text>Interests: {userProfile.interests}</Text>
            

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.button2Text}>Edit Profile</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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
})