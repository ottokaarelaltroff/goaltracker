import { StyleSheet, View } from "react-native";
import { GText } from "./GText";

interface TagProps {
    title: string,
    color: string;
    style?: any;
};

export const Tag = ({ title, color, style }: TagProps) => {

    return (
        <View style={[styles.container, { backgroundColor: color }, style]}>
            <GText style={styles.text}>{title.toUpperCase()}</GText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 22,
        marginRight: 10
    },
    text: {
        fontSize: 10,
        fontStyle: 'italic',
        fontWeight: '600',
        flex: 0
    },

});