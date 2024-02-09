import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { colors } from '../../utils/colors'
import Button from '../../components/button'
import { setUserRole } from '../../api/firestore'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db, authentication } from '../../../config'
import { getDoc, doc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler'


export default function Profile({navigation}) {
    const [userProfile, setUserProfile] = useState({
        name: "",
        username: "",
        gender: "",
        skills: "",
        workStatus: "",
        interests: ""
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
})