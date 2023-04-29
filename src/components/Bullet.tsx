import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface BulletProps {
    style?: any,
};

export const Bullet = ({ style }: BulletProps) => {
    return (
        <View style={[styles.bullet, style]}></View>
    );
};

const styles = StyleSheet.create({
    bullet: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        borderWidth: 2,
        borderColor: Colors.lightGray
    },
});