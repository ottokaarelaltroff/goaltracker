import { Image, Insets, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IconProps {
    name: string;
    onPress: () => void;
    style?: any
}
;
export const Icon = ({ name, onPress, style }: IconProps) => {
    const defaultHitSlop: Insets = { top: 5, left: 5, bottom: 5, right: 5 };
    const path = `../assets/${name}.png`;
    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop} activeOpacity={onPress && 1}>
            <Image source={require(path)} resizeMode='contain' style={[styles.icon, style]} />
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },

});