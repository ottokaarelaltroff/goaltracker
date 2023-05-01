import { Insets, TouchableOpacity } from "react-native";
import { GText } from "./GText";
import { Colors } from "../util/Colors";

interface TextButtonProps {
    title: string;
    onPress: () => void;
    style?: any,
    disabled?: boolean
}
;
export const TextButton = ({ title, onPress, style, disabled = false }: TextButtonProps) => {
    const defaultHitSlop: Insets = { top: 5, left: 5, bottom: 5, right: 5 };

    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop} disabled={disabled}>
            <GText size={18} style={[style, disabled ? { color: Colors.grayAlpha(0.5) } : {}]}>{title}</GText>
        </TouchableOpacity>
    );
};