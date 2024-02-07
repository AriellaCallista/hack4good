import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native'
import React from 'react'

const Button = ({color, text, textColor, height = 'auto', borderRadius, onPress, disabled, width, icon}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={styles.container(color, height, borderRadius, width)}>
        {icon && <Image source={icon} style={styles.icon} />}
      <Text style={styles.text(textColor)}>{text}</Text>

      </View>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    container: (color, height, borderRadius, width) => ({
        backgroundColor: color,
        padding: 12, 
        borderRadius: borderRadius,
        height: height,
        width: width,
        flexDirection: 'row'
    }),
    text: (textColor) => ({
        fontSize: 24,
        color: textColor,
        fontFamily: 'Archivo',
        textAlignVertical: 'center',
        paddingLeft: 10
    }),
    icon: {
        height: 30,
        width: 30,
    }
})