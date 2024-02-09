import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { colors } from '../../utils/colors'
import Button from '../../components/button'
import { setUserRole } from '../../api/firestore'
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db, authentication } from '../../../config'
import { getDoc, doc } from "firebase/firestore";
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker';

export default function ProfileSurvey({navigation}) {   
    // Fetch initial user data
    const [userProfile, setUserProfile] = useState({
        name: "",
        username: "",
        gender: "",
        skills: [],
        interests: [],
        workStatus: "",
    });

    useEffect(() => {
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

    // For new profile information
    const [name, setName] = useState(userProfile.name)
    const [username, setUsername] = useState(userProfile.username)
    const [gender, SetGender] = useState(userProfile.gender)
    const [skills, setSkills] = useState(userProfile.skills)
    const [interests, setInterests] = useState(userProfile.interests)
    const [workStatus, setWorkStatus] = useState(userProfile.workStatus)

    const skillsData = ['Skill 1', 'Skill 2', 'Skill 3']; // Add more skills as needed
    const interestsData = ['Interest 1', 'Interest 2', 'Interest 3']; // Add more interests as needed


    return (
        <ScrollView>
            <View style={styles.header}>
                <Image source={require('../../assets/icons/heart.png')} style={styles.logo} />
                <Text style={styles.welcome}>WELCOME TO HEARTLINE</Text>
                <Text>Please complete your profile below</Text>
            </View>

            <Text>Name:</Text>
            <TextInput value={userProfile.name} onChangeText={(newName) => setName(newName)}/>

            <Text>Username:</Text>
            <TextInput value={userProfile.username} onChangeText={(newUsername) => setUsername(newUsername)}/>

            <Text>Gender:</Text>
            <Picker selectedValue={gender} onValueChange={(gender) => SetGender(gender)}>
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
                <Picker.Item label="Prefer not to disclose" value="Prefer not to disclose" />
            </Picker>

            <Text>Skills:</Text>

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