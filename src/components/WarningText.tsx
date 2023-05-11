import { StyleSheet } from "react-native";
import { Colors } from "../util/Colors";
import { GText } from "./GText";

interface WarningTextProps {
    children: any,
    style?: any
};

export const WarningText = ({ children, style }: WarningTextProps) => {

    return (
        <GText style={[styles.text, style]} size={14}>
            {children}
        </GText>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.red
    }
});