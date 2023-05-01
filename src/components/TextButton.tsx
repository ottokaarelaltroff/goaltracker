import { Insets, TouchableOpacity } from "react-native";
import { GText } from "./GText";

interface TextButtonProps {
    title: string;
    onPress: () => void;
    style?: any
}
;
export const TextButton = ({ title, onPress, style }: TextButtonProps) => {
    const defaultHitSlop: Insets = { top: 5, left: 5, bottom: 5, right: 5 };

    return (
        <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop}>
            <GText size={18} style={style}>{title}</GText>
        </TouchableOpacity>
    );
};