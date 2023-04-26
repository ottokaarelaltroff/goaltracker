import { StyleSheet } from "react-native";
import { GText } from "./GText";

interface HeadingTextProps {
    bold?: boolean,
    numberOfLines?: number,
    style?: any,
    children: any
};


export const HeadingText = ({ style, children }: HeadingTextProps) => {

    return (
        <GText
            bold
            style={[styles.heading, style]}>
            {children}
        </GText>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
    }
});