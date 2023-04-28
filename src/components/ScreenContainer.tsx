import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";


const { width } = Dimensions.get("window");

type ScreenContainerProps = {
    children: any,
    backgroundColor?: string,
}
export const ScreenContainer = ({ children, backgroundColor = Colors.primary }: ScreenContainerProps) => (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 20,
        width: width,
    },
});