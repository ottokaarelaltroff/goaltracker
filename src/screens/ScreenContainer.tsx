import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

export const ScreenContainer = ({children}) => (
<View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
    },
});