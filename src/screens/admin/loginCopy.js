import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';
import { colors } from '../../utils/colors'
import Button from '../../components/button'
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { login } from '../../api/auth';

export default function LoginAdmin({navigation}) {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const adminLogin = async () => {
        console.log(email)
        console.log(password)
        login(navigation, email, password, "HomeAdm")   
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <MaterialIcons name="arrow-back-ios" size={25} color="white" style={{margin: 5}} />
            </TouchableOpacity>
            <Text style={styles.title}>ADMINISTRATOR</Text>
        </View>
        <View style={styles.header2}>

            <View style={styles.input}>
                <FontAwesome name="user-circle-o" size={24} color="white" style={{paddingLeft: 5}}/>
                <TextInput 
                    value={email} 
                    style={styles.textInput} 
                    placeholder='Email'
                    onChangeText={text => setEmail(text)}
                />
            </View>


            <View style={styles.input}>
                <AntDesign name="lock" size={24} color="white" />
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
            <Button color={colors.darkRed} 
            textColor={"#FFFFFF"}
            borderRadius={30}
            width={300}
            text="Login"
            onPress={adminLogin} />

            <View style={{
                flexDirection: 'row', 
                justifyContent: 'space-evenly',
                width: '90%'}}>
                <Text 
                    style={{fontFamily: "Rubik", right: 15, marginTop: 23}}
                    >Don't have an account?
                </Text>

                <Text 
                    style={{fontFamily: "Rubik", color: '#3685cd', right: 15, marginTop: 23}}
                    onPress={() => navigation.navigate('SignupAdm')}
                    >Sign up here
                </Text>

            </View>
            


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
        justifyContent: 'center',
        shadowColor: '#000', // Shadow color can be adjusted
        shadowOffset: {
          width: 0,
          height: 2, // The y-axis offset of the shadow
        },
        height: '23%',
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
        textAlign: 'center',
        color: "white",
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 0, height: 1},
        textShadowRadius: 0.5,
    },
    input: {
        backgroundColor: colors.fillGrey,
        padding: 10,
        borderRadius: 30,
        width: 300,
        height: 'auto',
        flexDirection: 'row',
        margin: 12
    },
    textInput: {
        fontFamily: "Rubik",
        fontSize: 17,
        paddingHorizontal: 5,
    }
    
})