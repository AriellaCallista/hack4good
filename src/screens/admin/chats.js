import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchChatrooms } from '../../api/firestore'
import { ListItem } from '../../components/listItem';
import { colors } from '../../utils/colors';


export default function Chats() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchChatrooms()
          .then(setEvents)
      },[])

  return (
    <View style={styles.container}>
        {console.log("events aree: " + events)}

        <FlatList
        data={events}
        key={event => event.date + event.newEvent}
        renderItem={({item}) => 
            <ListItem 
            onPress={() => navigation.navigate('Chatroom', {})}
            title={item.newEvent}
            image={item.photoURL}
            />
        }
      />

    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        // width: '100%',
        // height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    }
})
