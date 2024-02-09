import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect }  from 'react'
import { colors } from '../../utils/colors'
import { db, authentication } from '../../../config'
import { getDoc, doc, setDoc } from "firebase/firestore";
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker';

export default function EditProfile({navigation}) {   
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [gender, SetGender] = useState('')
    const [skills, setSkills] = useState([])
    const [interests, setInterests] = useState([])
    const [workStatus, setWorkStatus] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userDoc = await getDoc(doc(db, "users", authentication.currentUser.uid));
    
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setName(userData.name);
              setUsername(userData.username);
              SetGender(userData.gender);
              setSkills(userData.skills || []); // If userData.skills is undefined, set it to an empty array
              setInterests(userData.interests || []); // If userData.interests is undefined, set it to an empty array
              setWorkStatus(userData.workStatus);
            }
          } catch (error) {
            console.error("Error fetching user profile:", error);
          }
        };
    
        fetchUserData();
    }, []); 

    const skillsData = ['Skill 1', 'Skill 2', 'Skill 3']; // Add more skills as needed
    const interestsData = ['Interest 1', 'Interest 2', 'Interest 3']; // Add more interests as needed

    const handleToggleSkill = (skill) => {
        const updatedSkills = [...skills];
        const index = updatedSkills.indexOf(skill);
    
        if (index === -1) {
          updatedSkills.push(skill);
        } else {
          updatedSkills.splice(index, 1);
        }
    
        setSkills(updatedSkills);
      };
    
      const handleToggleInterest = (interest) => {
        const updatedInterests = [...interests];
        const index = updatedInterests.indexOf(interest);
    
        if (index === -1) {
          updatedInterests.push(interest);
        } else {
          updatedInterests.splice(index, 1);
        }
    
        setInterests(updatedInterests);
      };

    // To save new information
    const handleSaveProfile = async () => {
        try {
          if (!name || !username || !gender || !workStatus) {
            alert('Please fill in all required fields!');
            return;
          }
          // Update the user profile document in Firestore
          const userRef = doc(db, 'users', authentication.currentUser.uid);
          await setDoc(userRef, {
            name,
            username,
            gender,
            skills,
            interests,
            workStatus,
          });
          alert('Profile updated successfully!');
          navigation.navigate("HomeVol")
        } catch (error) {
          console.error('Error updating user profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/icons/heart.png')} style={styles.logo} />
                <Text style={{fontFamily: "Lilita", color: "white", fontSize: 30, marginTop: -30}}>WELCOME TO HEARTLINE</Text>
                <Text style={{fontFamily: "Rubik", color: "white", fontSize: 20, marginTop: 10, marginBottom: 3}}>Personalize your profile below!</Text>
            </View>

            <Text style={styles.label}>Name:</Text>
            <TextInput value={name} onChangeText={(newName) => setName(newName)} placeholder={name} style={styles.textInput}/>

            <Text style={styles.label}>Username:</Text>
            <TextInput value={username} onChangeText={(newUsername) => setUsername(newUsername)} placeholder={username} style={styles.textInput}/>

            <Text style={styles.label}>Gender:</Text>
            <Picker selectedValue={gender} onValueChange={(gender) => SetGender(gender)} style={styles.textInput}>
                {!gender && <Picker.Item label="Please select one" value="" />}
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Others" value="Others" />
                <Picker.Item label="Prefer not to disclose" value="Prefer not to disclose" />
            </Picker>

            <Text style={styles.label}>Skills:</Text>
            <View style={styles.checkboxContainer}>
              {skillsData.map((skill) => (
                  <TouchableOpacity
                  key={skill}
                  style={[styles.checkbox, skills.includes(skill) && styles.checked ]}
                  onPress={() => handleToggleSkill(skill)}
                  >
                  <Text>{skill}</Text>
                  </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}> Interests:</Text>
            <View style={styles.checkboxContainer}>
              {interestsData.map((interest) => (
                  <TouchableOpacity
                  key={interest}
                  style={[styles.checkbox, interests.includes(interest) && styles.checked]}
                  onPress={() => handleToggleInterest(interest)}
                  >
                  <Text>{interest}</Text>
                  </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Work Status:</Text>
            <Picker selectedValue={workStatus} onValueChange={(workStatus) => setWorkStatus(workStatus)} style={styles.textInput}>
                {!workStatus && <Picker.Item label="Please select one" value="" />}
                <Picker.Item label="Student" value="Student" />
                <Picker.Item label="Worker" value="Female" />
                <Picker.Item label="Others" value="Others" />
            </Picker>
            
            {/* Save button */}
            <TouchableOpacity style={styles.button2} onPress={handleSaveProfile}>
                <Text style={styles.button2Text}>Save</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightPink
    },
    header: {
        backgroundColor: colors.darkPink, // Replace with the actual color of your card
        borderRadius: 15, // Adjust to match the border radius in your design
        padding: 20, // Adjust the padding as needed
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Shadow color can be adjusted
        shadowOffset: {
          width: 0,
          height: 2, // The y-axis offset of the shadow
        },
        width: '100%',
        marginBottom: 30

    },
    label: {
        fontFamily: "Lilita",
        color: colors.magentaRed,
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 5
    },
    textInput: {
        fontFamily: "Rubik",
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 7,
        marginLeft: 7
    },
    checkbox: {
      fontFamily: "Rubik",
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      paddingLeft: 40,
      paddingTop: 5,
      paddingBottom: 5
    },
    checkboxContainer: {
      paddingTop: 10,
      marginBottom: 10
    },
    checked: {
      backgroundColor: colors.darkPink
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
    logo: {
      marginTop: -30,
      width: 250,
      height: 250
  }
})