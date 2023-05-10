import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../util/Colors";
import { Icon } from "./Icon";

interface CheckMarkProps {
    style?: any,
    isChecked?: boolean,
    onClick?: () => void
};

export const CheckMark = ({ style, isChecked = false, onClick }: CheckMarkProps) => {
    return (
        <TouchableOpacity
            onPress={onClick}
            disabled={!onClick}
            style={[styles.circle, style, !isChecked ? { borderColor: Colors.grayAlpha(0.5) } : {}]}>
            {isChecked ? <Icon source={require("../assets/checkmark.png")} light style={styles.check} /> : null}
        </TouchableOpacity>
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
        bottom: -23,
        left: -1
    }


});