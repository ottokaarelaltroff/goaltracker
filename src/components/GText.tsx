import { StyleSheet, Text } from "react-native";
import { Colors } from "../util/Colors";

interface GTextProps {
    bold?: boolean,
    italic?: boolean,
    size?: number,
    numberOfLines?: number,
    style?: any,
    children: any
};

const defaultStyle = (size) => ({
    // fontFamily: Fonts.getRegular(),
    fontSize: size ? size : 16,
    color: Colors.lightGray,
    backgroundColor: 'transparent',
});

const defaultBoldStyle = (size) => ({
    // fontFamily: Fonts.getBold(),
    fontSize: size ? size : 16,
    fontWeight: "600",
    color: Colors.lightGray,
});

export const GText = ({ bold = false, italic = false, size, numberOfLines = 10, style, children }: GTextProps) => {

    return (
        <Text
            allowFontScaling={false}
            numberOfLines={numberOfLines}
            style={[defaultStyle(size), bold ? defaultBoldStyle(size) : defaultStyle(size), style, italic ? { fontStyle: 'italic' } : null]}>
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
});