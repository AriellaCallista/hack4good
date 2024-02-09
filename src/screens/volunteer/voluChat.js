import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send, Time, InputToolbar, Composer } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, getDoc, setDoc} from 'firebase/firestore';
import { db, authentication } from '../../../config'
import { getCurrentUserName } from '../../api/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Chatroom from './chatroom';
import Download from './download';
import Attendance from './attendance';


export default function VoluChat({route, navigation}) {
  const chatName = route.params.name
  const [modalVisible, setModalVisible] = useState(false);
  const [attCode, setAttCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [attActive, setAttActive] = useState(false)
  const [certActive, setCertActive] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: '',
    age: '',
    gender: '',
    workStatus: '',
    interests: [],
    skills: [],
    username: ''
  })

  const handleAttendance = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    if (attCode === userCode) {
        setDoc(doc(db, "events", chatName, "attendees", authentication.currentUser.uid), {
            name: currentUser.name,
            gender: currentUser.gender,
            age: currentUser.age,
            workStatus: currentUser.workStatus,
            interests: currentUser.interests, 
            skills: currentUser.skills,
            username: currentUser.username
          }, {merge: true}).then(() => {
            // data saved successfully
            console.log('data submitted');
          }).catch((error) => {
            //the write failed
            console.log(error)
          });
        handleCloseModal();
        setCertActive(true)
        Alert.alert("Attendance taken! You can now download your E-Certificate")
    } else {
        handleCloseModal();
        Alert.alert("Incorrect attendance code")
    }
    
  };

  const handleDownload = () => {

  }

  useEffect(() => {
    const fetchEventData = async () => {
      const eventRef = doc(db, 'events', chatName);
      try {
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const data = eventSnap.data();
          if (data && "attCode" in data) {
            setAttCode(data.attCode);
            setAttActive(true);
          }
        } else {
          // Handle the case where the event document does not exist
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };

    const unsubscribeUser = onSnapshot(doc(db, 'users', authentication.currentUser.uid), (doc) => {
        if (doc.exists()) {
          setCurrentUser({ id: doc.id, ...doc.data() }); // Assuming setCurrentUser is your state setter for the user data
        } else {
          // Handle the case where the user document does not exist
          console.log("No such document!");
        }
      });

    fetchEventData();

    return () => {
        unsubscribeUser();
    }

    
  }, []);


  return (
    <View style={styles.container}>


        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                    <TextInput
                    placeholder="Type here..."
                    style={styles.modalText}
                    onChangeText={text => setUserCode(text)}
                    value={userCode}
                    />
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.submit}>
                            <Text style={{color: 'white', fontFamily: 'Rubik', fontSize: 18}}>Submit</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
            </View>                
            </TouchableWithoutFeedback>

        </Modal>

        {/* header */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between', width: '100%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeVol')}>
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{chatName}</Text>

        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: "90%"}}>
            {attActive
            ?
            <TouchableOpacity onPress={handleAttendance}>
            <View style={styles.cert}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Attendance</Text>
                <AntDesign name="checksquareo" size={24} color="black" />
            </View>
            </TouchableOpacity>
            : 
            <TouchableOpacity onPress={() => Alert.alert("Attendance code has not been set")}>
            <View style={[styles.cert, {backgroundColor: colors.activeGrey}]}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Attendance</Text>
                <AntDesign name="checksquareo" size={24} color="black" />
            </View>
            </TouchableOpacity>
            }

            {certActive
            ? <TouchableOpacity onPress={handleDownload}>
            <View style={styles.cert}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Download E-Certificate</Text>
                <AntDesign name="download" size={24} color="black" />
            </View>
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={() => Alert.alert("Attendance not verified", "You can only access your e-certificate once your attendance is verified!")}>
            <View style={[styles.cert, {backgroundColor: colors.activeGrey}]}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Download E-Certificate</Text>
                <AntDesign name="download" size={24} color="black" />
            </View>
            </TouchableOpacity>}
            
        </View> 
      </View>

      {/* body */}
     <Chatroom route={route} />


    </View> 
  )
}



const styles = StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor: colors.darkPink, 
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  chat: {
    borderRadius: 15,
    marginTop: 10,
    padding: 10,
    width: '97%',
    height: '80%',
    backgroundColor: colors.lightGrey,
    shadowOpacity: 0.25, // The opacity of the shadow
    shadowRadius: 3.84, // The blur radius of the shadow
    elevation: 5, // This adds shadow on Android (shadow props are for iOS)
  },
  header: {
    backgroundColor: colors.darkPink,
    borderBottomColor: 'black',
    borderWidth: 1,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    borderTopColor: colors.darkPink,
    height: 120,
    paddingHorizontal: 15,
  },
  title: {
    fontFamily: 'Lilita',
    fontSize: 25,
    color: 'white',
    marginTop: 30,
    // marginBottom: 55

  },
  cert: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-evenly',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black'
  },
  button:{
      marginTop:10,
      backgroundColor: colors.darkPink,
      height: 'auto',
      width: 200
  },
  name: {
    fontSize: 15
  },
  standardFont: {
    fontSize: 15,
  },
  slackMessageText: {
    marginLeft: 0,
    marginRight: 0,
  },
  wrapper: {
    marginRight: 60,
    minHeight: 20,
    justifyContent: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
  },
  time: {
    textAlign: 'left',
    fontSize: 12,
    color: 'black'
  },
  timeContainer: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  headerItem: {
    marginRight: 10,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: 'row',
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.activeGrey,
    borderRadius: 20,
    padding: 20,
    width: 200,
    height: 125,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: 'Rubik',
    fontSize: 18,
    color: 'black'
  },
  submit: {
    backgroundColor: colors.mediumPink,
    width: 80,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  
})

