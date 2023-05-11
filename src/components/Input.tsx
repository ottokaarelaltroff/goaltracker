import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";
import { InputField } from "./InputField";
import { useState } from "react";
import { WarningText } from "./WarningText";
import { Icon } from "./Icon";

interface InputProps {
    label?: string,
    initialValue?: string,
    placeHolder?: string,
    style?: any,
    onPress?: () => void,
    onChange?: (value: string) => void,
    icon?: any,
    buttonIcon?: any,
    numeric?: boolean,
    small?: boolean,
    isSecret?: boolean,
    color?: string,
    charLimit?: number,
};

export const Input = ({
    label,
    initialValue,
    placeHolder,
    style,
    onPress,
    onChange,
    icon,
    buttonIcon,
    numeric = false,
    color,
    charLimit = undefined,
    small = false,
    isSecret = false
}: InputProps) => {

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
                <WarningText>{"Field limit is exceeded!"}</WarningText>
            </View>)

    return (
        <View style={[styles.container, style, { height: label ? 80 : 60 }]}>
            <View style={styles.header}>
                {label && <GText style={styles.label}>{label}</GText>}
                {error && renderError()}
            </View>

            <InputField
                initialValue={initialValue}
                placeHolder={placeHolder}
                icon={icon}
                buttonIcon={buttonIcon}
                onPress={onPress}
                onChange={onTextChange}
                numeric={numeric}
                color={color}
                isSecret={isSecret} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
        justifyContent: 'space-between',
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