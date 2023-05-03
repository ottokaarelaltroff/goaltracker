import { Image, ImageSourcePropType, Insets, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../util/Colors";

interface IconProps {
    source: ImageSourcePropType;
    onPress?: (value?) => void;
    style?: any,
    size?: number,
    light?: boolean
}
;
export const Icon = ({ source, onPress, style, size = 30, light = false }: IconProps) => {
    const defaultHitSlop: Insets = { top: 10, left: 10, bottom: 10, right: 10 };
    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop} style={{ display: 'flex', flexDirection: 'row', flex: 0 }}>
            <Image source={source} resizeMode='contain' style={[style, { width: size, height: size }, light ? { tintColor: Colors.lightGray } : {}]} />
        </TouchableOpacity>
    );
};
