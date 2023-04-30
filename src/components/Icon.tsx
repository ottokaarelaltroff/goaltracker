import { Image, ImageSourcePropType, Insets, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../util/Colors";

interface IconProps {
    source: ImageSourcePropType;
    onPress?: (value?) => void;
    style?: any
}
;
export const Icon = ({ source, onPress, style }: IconProps) => {
    const defaultHitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };
    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop}>
            <Image source={source} resizeMode='contain' style={[styles.icon, style]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },

});