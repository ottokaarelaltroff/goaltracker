import { StyleSheet, View } from "react-native";
import { GButton } from "../../components/GButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import useAuth from "../auth/useAuth";
import { ScreenHeader } from "../../components/ScreenHeader";

export const SettingsScreen = ({ navigation }) => {

    const { logOut } = useAuth();

    return (
        <ScreenContainer>
            <ScreenHeader title={"Settings"} fontSize={32} navigation={navigation}></ScreenHeader>
            <View style={styles.buttons}>
                <GButton title={'Account'} onPress={() => { }} icon={require('../../assets/settings.png')}></GButton>
                <GButton title={'Sign Out'} onPress={() => logOut()} icon={require('../../assets/goal.png')}></GButton>
            </View>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});