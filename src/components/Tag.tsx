import { StyleSheet, View } from "react-native";
import { GText } from "./GText";

interface TagProps {
    title: string,
    color: string;
};

export const Tag = ({ title, color }: TagProps) => {

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GText style={styles.text}>{title.toUpperCase()}</GText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 22,
        marginRight: 10,
    },
    text: {
        fontSize: 10,
        fontStyle: 'italic',
        fontWeight: '600'
    },
});