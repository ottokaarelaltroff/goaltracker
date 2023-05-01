import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../util/Colors";
import { Icon } from "./Icon";

interface ColorSelectionProps {
    selectedColor?: string,
    style?: any,
    onSelect: (color: string) => void
};

export const ColorSelection = ({ style, selectedColor, onSelect }: ColorSelectionProps) => {

    const [value, setValue] = useState<string>(selectedColor);

    const options = [
        Colors.purple,
        Colors.darkBlue,
        Colors.teal,
        Colors.darkGreen,
        Colors.darkOrange,
        Colors.lightRed,
    ]

    const isSelected = (color: string) => (color === value)

    const onClick = (color: string) => {
        setValue(color)
        onSelect && onSelect(color);
    }

    return (
        <View style={[style, styles.container]}>
            {options.map((color, index) => (
                <TouchableOpacity key={index} style={[styles.bubble, { borderColor: color }]} onPress={() => onClick(color)}>
                    {isSelected(color) && <Icon source={require("../assets/checkmark.png")} light style={styles.check} />}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 20,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    check: {
        position: 'absolute',
        bottom: -15,
        left: -15
    }



});