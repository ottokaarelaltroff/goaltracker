import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import Divider from "../../components/Divider";
import { GText } from "../../components/GText";
import { Colors } from "../../util/Colors";
import { LanguageSelector } from "./LanguageSelector";

export const SettingsMenu = () => {

    const [darkMode, setDarkMode] = useState<boolean | undefined>(true);
    const [appSounds, setAppSounds] = useState<boolean | undefined>(false);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <GText size={20}>{"Language"}</GText>
                <LanguageSelector />
            </View>
            <Divider />
            <View style={styles.row}>
                <GText size={20}>{"Dark Mode"}</GText>
                <Switch
                    trackColor={{ false: Colors.darkGreen, true: Colors.neonGreen }}
                    thumbColor={Colors.light}
                    onValueChange={setDarkMode}
                    value={darkMode} />
            </View>
            <Divider />
            <View style={styles.row}>
                <GText size={20}>{"App Sounds"}</GText>
                <Switch
                    trackColor={{ false: Colors.darkGreen, true: Colors.neonGreen }}
                    thumbColor={Colors.light}
                    onValueChange={setAppSounds}
                    value={appSounds} />
            </View>
            <Divider />
            <View style={styles.row}>
                <GText size={20}>{"App Version"}</GText>
                <GText size={18}>{"v1.0.0"}</GText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        paddingHorizontal: 30,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        alignItems: 'center',
    },
    username: {
        marginBottom: 15,
    },
    accountInfo: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // borderWidth: 2,
    },
});