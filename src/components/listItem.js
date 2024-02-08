import { Text, Image, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppText } from './appText'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { colors } from '../utils/colors'

export function ListItem({title, subTitle, image, ImageComponent, onPress}) {
  return (
        <TouchableOpacity
        onPress={onPress}
        >
            <View style={styles.container}>
                {ImageComponent}
               {image && <Image source={{uri:image}} style={styles.image}/>} 
                <View style={styles.ownerHolder}>
                    <Text style={styles.name}>{title}</Text>
                   {/* {subTitle && <AppText inputText={subTitle} stylesLing={styles.listing} noOfLines={2}/>} */}
                    
                </View>
                <MaterialCommunityIcons name='chevron-right' size={20} color='#000'/>
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        backgroundColor: colors.darkPink,
        alignItems:"center",
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 0.8,
        borderRadius: 8,
        width: "100%"
    },
    image:{
        width:80,
        height:80,
        borderRadius:50,
        marginLeft:10,
        marginVertical:10
    },
    name:{
        fontFamily: 'Lilita',
        color: 'white'
    },
    listing:{
        color:"#6e6969",
        marginTop:5
    }
})