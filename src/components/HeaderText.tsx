import { StyleSheet, Text, TextInput, View, Button, Image, Touchable, Insets } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GText } from "./GText";

interface HeaderTextProps {
    title: string
};

export const HeaderText = ({ title }: HeaderTextProps) => {

    return (
        <View style={styles.container}>
            <GText style={styles.text}>
                {title}
            </GText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 0,
        textAlign: 'left',
        alignSelf: 'flex-start',
        // flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginVertical: 20,
        borderWidth: 2,

    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.lightGray,
        marginRight: 10,
    },
    text: {
        fontSize: 32,
        fontWeight: "600",
    }
});