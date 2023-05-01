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
    onChange?: (value: string) => void,
    icon?: any,
    numeric?: boolean,
    color?: string,
};

export const Input = ({ label, initialValue, placeHolder, style, onPress, onChange, icon, numeric = false, color }: InputProps) => {
    return (
        <View style={[styles.container, style]}>
            <GText style={styles.label}>{label}</GText>
            <InputField initialValue={initialValue} placeHolder={placeHolder} icon={icon} onPress={onPress} onChange={onChange} numeric={numeric} color={color}></InputField>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        marginBottom: 15,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
});