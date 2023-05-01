import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface CheckMarkProps {
    style?: any,
    isChecked: boolean
};

export const CheckMark = ({ style, isChecked }: CheckMarkProps) => {
    return (
        <View style={[styles.circle, style, !isChecked ? { borderColor: Colors.grayAlpha(0.5) } : {}]}>
            {isChecked ? <Image source={require("../assets/checkmark.png")} resizeMode="contain" style={styles.check} /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 25,
        height: 25,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colors.lightGray
    },
    check: {
        position: 'absolute',
        width: 25,
        height: 25,
        bottom: 2,
        left: 2
    }


});