import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Colors } from "../util/Colors";
import { Icon } from "./Icon";

interface InputFieldProps {
    initialValue?: string,
    placeHolder?: string,
    style?: any,
    icon?: any,
    onPress?: () => void,
    onChange?: (value: string) => void,
    numeric?: boolean,
    color?: string,
};

export const InputField = ({ initialValue, placeHolder, style, icon, onPress, onChange, numeric = false, color = Colors.darkGray }: InputFieldProps) => {

    const [value, setValue] = useState<string>(initialValue || '');

    const onChangeText = (text: string) => {
        if (numeric) {
            text = text.replace(/[^0-9]/g, '');
        }
        setValue(text);
        onChange && onChange(text);
    }
    return (
        <View style={[styles.container, style, { backgroundColor: color }]}>
            {icon && <Icon source={icon} style={styles.icon}></Icon>}
            <TextInput
                style={[styles.input, { backgroundColor: color }]}
                placeholder={placeHolder}
                placeholderTextColor={Colors.grayAlpha(0.3)}
                onChangeText={onChangeText}
                value={value}
                keyboardType={numeric ? 'numeric' : 'default'}
            />
            {onPress &&
                (<TouchableOpacity onPress={onPress}>
                    <Icon source={require("../assets/caret-down.png")} style={styles.caret} onPress={onPress} ></Icon>
                </TouchableOpacity>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: 50,
        borderRadius: 25,
    },
    input: {
        flex: 1,
        borderRadius: 25,
        color: Colors.light,
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 25,
        // borderWidth: 2,
    },
    icon: {
        tintColor: Colors.lightGray,
        marginLeft: 15,
    },
    caret: {
        tintColor: Colors.lightGray,
        width: 20,
        marginRight: 20,
        // borderWidth: 2,
    }
});