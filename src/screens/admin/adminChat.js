import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Alert } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send, Time, InputToolbar, Composer } from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, getDoc} from 'firebase/firestore';
import { db, authentication } from '../../../config'
import { getCurrentUserName } from '../../api/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { saveAttCode } from '../../api/firestore';

export default function AdminChat({route, navigation}) {
  const uid = route.params.uid
  const chatName = route.params.name
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;
  const [name, setName] = useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [attCode, setAttCode] = useState('');
  const [attActive, setAttActive] = useState(false)

  const handleAttendance = () => {
    Alert.alert(
      "Set Attendance Code", 
      "Please create a 4 digit attendance code for volunteers to use for check-in. Share this code with your volunteers to allow them to mark their attendance."
    , [
      {
        text: 'OK',
        onPress: () => setModalVisible(true),
        style: {
          backgroundColor: colors.mediumPink
        }
      }
    ]
    );
  };

  const handleAttendance2 = () => {
    Alert.alert(
      "You've set up an attendance code",
      `The attendance code is ${attCode}.`
    )
  }

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = () => {
    saveAttCode(attCode, chatName)
    handleCloseModal();
  };

  const handleStatistics = () => {

  }


  useFocusEffect(
    useCallback(() => {
      const fetchName = async () => {
        try {
          const userName = await getCurrentUserName();
          setName(userName);
        } catch (error) {
          console.error('Failed to fetch user name:', error);
        }
      };
  
      fetchName();  
     }, [])
  )


  //chat backend 
  useEffect(() => {

    const fetchEventData = async () => {
      const eventRef = doc(db, 'events', chatName);
      try {
        const eventSnap = await getDoc(eventRef);
        if (eventSnap.exists()) {
          const data = eventSnap.data();
          if (data && "attCode" in data) {
            setAttCode(data.attCode);
            setAttActive(false);
          }
        } else {
          // Handle the case where the event document does not exist
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', uid);
    const colRef = collection(docref, 'messages');
    const q = query(colRef, orderBy('createdAt',"desc"));
    const unsubcribe = onSnapshot(q, (onSnap) => {
      const allMsg = onSnap.docs.map(mes => {
        if(mes.data().createdAt){
          return{
            ...mes.data(),
            createdAt:mes.data().createdAt.toDate()
          }
        }else{
          return{
            ...mes.data(),
            createdAt:new Date()
          }
        }
        

      })
      setMessages(allMsg)

    })
    console.log(name)

    fetchEventData()
      return () => {
        unsubcribe()
      }

  },[])

  const onSend = useCallback((messagesArray) => {
    const msg = messagesArray[0];
    const myMsg = {
      ...msg,
      sentBy:name,
      sentTo:uid
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

    const docref = doc(db, 'chatrooms', uid);
    const colRef = collection(docref, 'messages');
    const chatSnap = addDoc(colRef, {
      ...myMsg,
      createdAt:serverTimestamp(),
    })
  }, [])


  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <Ionicons 
            name="send-outline" 
            size={22} 
            color="black"
            style={{marginRight: 10, marginBottom: 10}} />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.lightPink,
          },
        }}
        textStyle={{
          right: {
            color: 'black',
          },
        }}
      />
    );

  };




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
                    onChangeText={text => setAttCode(text)}
                    value={attCode}
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


      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'space-between', width: '100%'}}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeAdm')}>
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
          <TouchableOpacity onPress={handleAttendance2}>
            <View style={[styles.cert, {backgroundColor: colors.activeGrey}]}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Attendance</Text>
                <AntDesign name="checksquareo" size={24} color="black" />
            </View>
            </TouchableOpacity>
          }
            

            <TouchableOpacity onPress={handleStatistics}>
            <View style={styles.cert}>
                <Text style={{fontFamily: 'Rubik', fontSize: 15 }}>Statistics</Text>
                <Feather name="bar-chart" size={24} color="black" />
            </View>
            </TouchableOpacity>
        </View> 
        
      </View>
      <View style={styles.chat}>
      <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      user={{
        _id: currentUser,
        name: name
      }}
      renderUsernameOnMessage={true}
      renderSend={renderSend}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderInputToolbar={(props) => (
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: colors.activeGrey,
            borderTopColor: colors.lightGrey,
            borderRadius: 10,
          }}
          primaryStyle={{ alignItems: 'center' }}
        />
      )}
      renderComposer={(props) => (
        <Composer
          {...props}
          placeholder="Type a message..."
          textInputStyle={{
            fontFamily: 'Rubik',
            color: 'black', // This will set the font color
            // Add other styles here
          }}
          placeholderTextColor="black" // This will set the placeholder text color
        />
      )}
      />
      </View>

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
    backgroundColor: colors.activeGrey,
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-around',
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 0.3
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

