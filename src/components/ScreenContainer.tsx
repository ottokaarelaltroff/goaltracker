import { Dimensions, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";


const { width } = Dimensions.get("window");

type ScreenContainerProps = {
    children: any,
    backgroundColor?: string,
    center?: boolean
}
export const ScreenContainer = ({ children, backgroundColor = Colors.primary, center = false }: ScreenContainerProps) => (
    <View style={[styles.container, { backgroundColor: backgroundColor, alignItems: center ? 'center' : 'stretch' }]}>{children}</View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: 20,
        width: width,
    },
});