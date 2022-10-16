import { React, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';


const StyledText = ({ children, customStyle }) => {
    return (
        <Text style={[styles.font, customStyle]}>{children}</Text>
    )
}

const colorWhite = '#fff'

const styles = StyleSheet.create({
    font: {
        fontSize: 14,
        color: colorWhite,
    }
});

export default StyledText;