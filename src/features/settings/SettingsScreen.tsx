import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../shared/ScreenContainer";
import { Colors } from "../../util/Colors";
import { Button } from "react-native";
import useAuth from "../../auth/useAuth";
import { GButton } from "../../components/GButton";
import { GText } from "../../components/GText";
import { HeaderText } from "../../components/HeaderText";

export const SettingsScreen = ({ navigation }) => {

    const { logOut } = useAuth();

    return (
        <ScreenContainer>
            {/* <HeaderText title={'Settings'} /> */}
            <View style={styles.buttons}>
                <GButton title={'Account'} onPress={() => { }} icon={require('../../assets/settings.png')}></GButton>
                <GButton title={'Sign Out'} onPress={() => logOut()} icon={require('../../assets/goal.png')}></GButton>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // borderWidth: 2,
    },
});