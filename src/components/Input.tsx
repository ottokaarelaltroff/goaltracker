import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";
import { InputField } from "./InputField";
import { useState } from "react";
import { WarningText } from "./WarningText";
import { Icon } from "./Icon";

interface InputProps {
    label: string,
    initialValue?: string,
    placeHolder?: string,
    style?: any,
    onPress?: () => void,
    onChange?: (value: string) => void,
    icon?: any,
    numeric?: boolean,
    small?: boolean,
    color?: string,
    charLimit?: number,
};

export const Input = ({ label, initialValue, placeHolder, style, onPress, onChange, icon, numeric = false, color, charLimit = undefined, small = false }: InputProps) => {

    const [error, setError] = useState<boolean>(false);

    const onTextChange = (text: string) => {
        if (text && charLimit) {
            setError(text.length > charLimit)
        }
        onChange && onChange(text)
    }

    const renderError = () => (
        small
            ? <Icon source={require("../assets/warning.png")} size={20} style={styles.warningIcon} />
            : <View style={styles.warningContainer}>
                <Icon source={require("../assets/warning.png")} size={20} style={styles.warningIcon} />
                <WarningText title={"Field limit is exceeded!"} />
            </View>)

    return (
        <View style={[styles.container, style]}>
            <View style={styles.header}>
                <GText style={styles.label}>{label}</GText>
                {error && renderError()}
            </View>

            <InputField initialValue={initialValue} placeHolder={placeHolder} icon={icon} onPress={onPress} onChange={onTextChange} numeric={numeric} color={color}></InputField>
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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    warningIcon: {
        marginRight: 5
    },
    warningContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
});