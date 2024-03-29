import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface InputProps {
    style?: any,
    children: any
};

export const InputBar = ({ style, children }: InputProps) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.darkGray,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});