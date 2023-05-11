import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { HeaderText } from "./HeaderText";
import { Icon } from "./Icon";

interface ScreenHeaderProps {
    navigation?: any,
    title: string,
    style?: any,
    children?: any
    fontSize?: number
    canGoBack?: boolean,
    backgroundColor?: string,
};

export const ScreenHeader = ({ navigation, title, style, children, fontSize = 32, canGoBack = false, backgroundColor = Colors.primary }: ScreenHeaderProps) => {
    return (
        <View style={[styles.container, style, { backgroundColor: backgroundColor }]}>
            {canGoBack && <Icon source={require("../assets/caret-left.png")} size={20} light onPress={() => navigation?.pop()} style={styles.backIcon} />}
            <HeaderText title={title} style={{ fontSize: fontSize }}></HeaderText>
            {children || <View />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: 25,
        paddingTop: 50,
    },
    backIcon: {
        width: 12
    }
});