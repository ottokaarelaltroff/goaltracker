import { Image, ImageSourcePropType, Insets, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";

interface GButtonProps {
    title: string;
    onPress: () => void;
    icon?: ImageSourcePropType,
    backgroundColor?: string,
    borderColor?: string,
    iconTint?: boolean,
    disabled?: boolean,
    style?: any
}
;
export const GButton = ({ title, onPress, icon, backgroundColor = Colors.darkGray, borderColor, iconTint = true, style, disabled = false }: GButtonProps) => {
    const defaultHitSlop: Insets = { top: 5, left: 5, bottom: 5, right: 5 };

    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop} style={style} disabled={disabled}>
            <View style={[styles.container, { backgroundColor: backgroundColor, }, borderColor && { borderWidth: 2, borderColor: borderColor }]}>
                {icon && <Image source={icon} style={[styles.icon, iconTint && { tintColor: Colors.lightGray }]}></Image>}
                <GText style={[styles.text, { color: disabled ? Colors.grayAlpha(0.5) : Colors.lightGray }]}>
                    {title}
                </GText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        height: 50,
        paddingVertical: 2,
        paddingHorizontal: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
    }
});