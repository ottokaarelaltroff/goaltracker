import { StyleSheet } from "react-native";
import { GText } from "./GText";

interface HeaderTextProps {
    title: string,
    style?: any
};

export const HeaderText = ({ title, style }: HeaderTextProps) => {

    return (
        <GText style={[styles.text, style]}>
            {title}
        </GText>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 32,
        fontWeight: "600",
    }
});