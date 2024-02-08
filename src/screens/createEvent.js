import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react';
import { colors } from '../utils/colors'
import Button from '../components/button'
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';


export default function CreateEvent({navigation}) {

    const [title, setTitle] = useState('');
    const [eventText, setEventText] = useState('');
    const [dateText, setDateText] = useState('');

    const createEntry = async () => {
        // Error alerts
        if (!title || !dateText || !eventText) {
            alert('Please fill in all required fields!');
            return;
        }

        // Add document to Firestore
        await firestore()
            .collection('Events')
            .add({
                title,
                eventText,
                dateText
            })
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            {/* Arrow to home */}
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
                <MaterialIcons name="arrow-back-ios" size={30} color="white" style={{margin: 10}} />
            </TouchableOpacity>
            <Text style={styles.title}>CREATE EVENT</Text>
        </View>
        <View>
            {/* title */}
            <TextInput
                placeholder="Event's Title"
                onChangeText={(text) => setTitle(text)}
                style={{
                borderRadius: 20,
                height: 80,
                padding: 20,
                width: 400,
                marginBottom: 15,
                borderColor: 'white',
                borderWidth: 1.5,
                backgroundColor: 'transparent',
                color: 'black',
                fontSize: 20,
                }}
                maxLength={100}
                required
            />

            {/* date */}
            <TextInput
                placeholder="Date..."
                onChangeText={(text) => setDateText(text)}
                style={{
                borderRadius: 40,
                height: 30,
                padding: 20,
                width: 200,
                marginBottom: 15,
                borderColor: 'white',
                borderWidth: 1.5,
                backgroundColor: 'white',
                color: '#bd9dee',
                }}
            />

            {/* event description */}
            <TextInput
                placeholder="Add some description... (max. 500 characters)"
                onChangeText={(text) => setEventText(text)}
                multiline
                style={{
                borderRadius: 20,
                height: 200,
                padding: 20,
                width: 400,
                marginBottom: 15,
                borderColor: 'white',
                borderWidth: 1.5,
                backgroundColor: 'transparent',
                color: 'black',
                }}
                maxLength={500}
                required
            />
            <Button color={colors.darkRed}
            textColor={"#FFFFFF"}
            borderRadius={30}
            width={300}
            text="Create"
            onPress={createEntry}
            />
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