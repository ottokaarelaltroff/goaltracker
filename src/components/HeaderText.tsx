import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
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
    container: {
        // display: 'flex',
        // flexDirection: 'row',
        // flex: 0,
        // textAlign: 'left',
        // alignSelf: 'flex-start',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'flex-start',
        // marginVertical: 20,

    },
    text: {
        fontSize: 32,
        fontWeight: "600",
    }
});