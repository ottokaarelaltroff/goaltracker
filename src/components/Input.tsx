import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";
import { InputField } from "./InputField";

interface InputProps {
    label: string,
    initialValue?: string,
    placeHolder?: string,
    style?: any,
    onPress?: () => void,
    icon?: any,
    numeric?: boolean
};

export const Input = ({ label, initialValue, placeHolder, style, onPress, icon, numeric = false }: InputProps) => {
    return (
        <View style={[styles.container, style]}>
            <GText style={styles.label}>{label}</GText>
            <InputField initialValue={initialValue} placeHolder={placeHolder} icon={icon} onPress={onPress} numeric={numeric}></InputField>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 80,
        marginBottom: 15,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
});