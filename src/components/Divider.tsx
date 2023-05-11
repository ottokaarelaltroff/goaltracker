import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../util/Colors';

const Divider = () => (
    <View style={styles.container}></View>
);

const styles = StyleSheet.create({
    container: {
        height: 2,
        backgroundColor: Colors.secondary,
        borderRadius: 1,
        marginBottom: 15,
    },
});

export default Divider;