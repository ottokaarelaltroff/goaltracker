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
    canGoBack?: boolean
};

export const ScreenHeader = ({ navigation, title, style, children, fontSize = 32, canGoBack = false }: ScreenHeaderProps) => {
    return (
        <View style={[styles.container, style]}>
            {canGoBack && <Icon source={require("../assets/caret-left.png")} size={20} light onPress={() => navigation?.pop()} style={styles.backIcon} />}
            <HeaderText title={title} style={{ fontSize: fontSize }}></HeaderText>
            {children}
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
        backgroundColor: Colors.primary,
        paddingHorizontal: 25,
        paddingTop: 50,
    },
    backIcon: {
        width: 12
    }
});