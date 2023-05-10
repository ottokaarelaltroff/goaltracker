import { StyleSheet } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";

interface WarningTextProps {
    title: string,
    style?: any
};

export const WarningText = ({ title, style }: WarningTextProps) => {

    return (
        <GText style={[styles.text, style]} size={14}>
            {title}
        </GText>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.red
    }
});