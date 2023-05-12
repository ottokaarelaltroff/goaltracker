import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { GButton } from "../../components/GButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import useAuth from "../auth/useAuth";
import { ScreenHeader } from "../../components/ScreenHeader";
import { HeaderText } from "../../components/HeaderText";
import useUser from "../auth/useUser";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { SettingsMenu } from "./SettingsMenu";
import useAccountModal from "./useAccountModal";

export const SettingsScreen = ({ navigation }) => {

    const { logOut } = useAuth();
    const { user } = useUser();

    const { AccountModal, openModal } = useAccountModal();

    return (
        <ScreenContainer>
            {AccountModal}
            <ScreenHeader title={"Settings"} fontSize={32} navigation={navigation}></ScreenHeader>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.accountInfo} >
                        <TouchableOpacity onPress={openModal} activeOpacity={1} style={styles.touchable}>
                            <Icon source={require("../../assets/chicken.png")} size={110} style={styles.profilePicture} />
                            <HeaderText title={user?.userName} size={28} style={styles.username}></HeaderText>
                            <GText size={16} style={styles.username}>{user?.email}</GText>
                        </TouchableOpacity>
                        <View style={styles.buttons}>
                            <GButton title={'Account'} onPress={openModal} icon={require('../../assets/settings.png')}></GButton>
                            <GButton title={'Sign Out'} onPress={() => logOut()} icon={require('../../assets/signout.png')}></GButton>
                        </View>
                    </View>
                    <View style={styles.menu}>
                        <SettingsMenu />
                    </View>
                </View>
            </ScrollView>
        </ScreenContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        marginVertical: 20,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
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
    },
    menu: {
        flex: 1,
        width: '100%',
        marginTop: 30,
    },
    profilePicture: {
        marginBottom: 20,
    },
    touchable: {
        alignItems: 'center',
    }
});