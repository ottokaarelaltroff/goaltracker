import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Colors } from '../util/Colors';


const { width } = Dimensions.get("window");

type SpinnerProps = {
    size?: number | "large" | "small"
    color?: string
    style?: any
}
const Divider = () => (
    <View style={styles.container}></View>
);

const styles = StyleSheet.create({
    container: {
        width: width - 70,

        height: 2,
        flex: 1,
        backgroundColor: Colors.secondary,
        borderRadius: 1,
        marginVertical: 10,
        // paddingHorizontal: 15,
        // paddingVertical: 10,

    },
});

export default Divider;