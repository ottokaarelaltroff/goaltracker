import { StyleSheet } from "react-native";
import { GText } from "./GText";

interface HeaderTextProps {
    title: string,
    style?: any,
    size?: number
};

export const HeaderText = ({ title, style, size = 32 }: HeaderTextProps) => {

    return (
        <GText style={[styles.text, style]} size={size}>
            {title}
        </GText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: "600",
    }
});