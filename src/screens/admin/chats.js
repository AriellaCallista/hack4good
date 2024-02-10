import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAdminChatrooms } from '../../api/firestore'
import { ListItem } from '../../components/listItem';
import { colors } from '../../utils/colors';


export default function Chats({navigation}) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAdminChatrooms()
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
            onPress={() => navigation.navigate('AdminChat', {name: item.newEvent, uid: item.newEvent, navigation: navigation})}
            title={item.newEvent}
            />
        }
      />

    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'red',
        width: '100%',
        height: '100%'
        // height: '100%',
        // justifyContent: 'center',
        // alignItems: 'center',
        // marginTop: 20
    }
})
