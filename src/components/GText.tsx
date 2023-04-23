import { StyleSheet, Text, TextInput, View, Button, Image, Touchable, Insets } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface GTextProps {
    bold?: boolean,
    numberOfLines?: number,
    style?: any,
    children: any
};

const defaultStyle = () => ({
    // fontFamily: Fonts.getRegular(),
    fontSize: 16,
    color: Colors.lightGray,
    backgroundColor: 'transparent',
});

const defaultBoldStyle = () => ({
    // fontFamily: Fonts.getBold(),
    fontSize: 16,
    fontWeight: "600",
    color: Colors.lightGray,
});

export const GText = ({ bold = false, numberOfLines = 2, style, children }: GTextProps) => {

    return (
        <Text
            allowFontScaling={false}
            numberOfLines={numberOfLines}
            style={[defaultStyle(), bold ? defaultBoldStyle() : defaultStyle(), style]}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.darkGray,
        borderRadius: 20,
        height: 50,
        paddingVertical: 2,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: Colors.lightGray,
        marginRight: 10,
    },
    text: {
        color: Colors.lightGray,
        fontSize: 18,
    }
});