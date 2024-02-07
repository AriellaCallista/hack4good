import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import { colors } from '../utils/colors'
import Button from '../components/button'
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { signup } from '../api/auth';

export default function SignupAdmin({navigation}) {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');


    const adminSignup = async () => {
        signup(navigation, name, username, email, password, "admin")
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('LoginVol')}>
                <MaterialIcons name="arrow-back-ios" size={30} color="white" style={{margin: 10}} />
            </TouchableOpacity>

            <Text style={styles.title}>CREATE YOUR ACCOUNT</Text>
        </View>

            <View style={styles.input}>
                <TextInput 
                    value={name} 
                    style={styles.textInput} 
                    placeholder='Full Name'
                    onChangeText={text => setName(text)}
                />
            </View>

            <View style={styles.input}>
                <TextInput 
                    value={username} 
                    style={styles.textInput} 
                    placeholder='Username'
                    onChangeText={text => setUsername(text)}
                />
            </View>

            <View style={styles.input}>
                <TextInput 
                    value={email} 
                    style={styles.textInput} 
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                />
            </View>

            <View style={styles.input}>
                <TextInput 
                    value={password} 
                    style={styles.textInput} 
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <View style={{marginTop: 30}}>

            </View>
            <Button color={colors.darkPink} 
            textColor={"#FFFFFF"}
            borderRadius={30}
            width={300}
            text="Create Account"
            onPress={adminSignup} />
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
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        shadowColor: '#000', // Shadow color can be adjusted
        shadowOffset: {
          width: 0,
          height: 2, // The y-axis offset of the shadow
        },
        height: '23%',
        width: '100%',
        // shadowOpacity: 0.25, // The opacity of the shadow
        // shadowRadius: 3.84, // The blur radius of the shadow
        // elevation: 5, // This adds shadow on Android (shadow props are for iOS)
        // // You might want to add margin here if needed
        marginBottom: 30,

    },
    header2: {
        backgroundColor: colors.darkGrey,
        borderRadius: 15,
        height: "65%",
        width: "85%",
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column', 
        padding: 30     
    },
    title: {
        fontFamily: 'Archivo',
        fontSize: 35,
        textAlign: 'left',
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1},
        textShadowRadius: 0.5,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        width: 300,
        height: 'auto',
        flexDirection: 'row',
        margin: 12
    },
    textInput: {
        fontFamily: "Archivo",
        fontSize: 15,
        paddingHorizontal: 5,
        opacity: 0.5,
        width: "90%"
    }
    
})