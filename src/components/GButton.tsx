import { Image, ImageSourcePropType, Insets, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../util/Colors";

interface GButtonProps {
    title: string;
    onPress: () => void;
    icon?: ImageSourcePropType
}
;
export const GButton = ({ title, onPress, icon }: GButtonProps) => {
    const defaultHitSlop: Insets = { top: 5, left: 5, bottom: 5, right: 5 };

    return (
        <View style={styles.container}>
            {icon && <Image source={icon} style={styles.icon}></Image>}
            <TouchableOpacity onPress={onPress} hitSlop={defaultHitSlop}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>

        </View>
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