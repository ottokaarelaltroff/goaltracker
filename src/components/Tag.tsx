import { StyleSheet, Text, TextInput, View, Button, Image, Touchable, Insets, Dimensions } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start'
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