import { StyleSheet, View } from 'react-native';
import { GText } from '../../components/GText';
import useDialog from '../../context/ui/useDialog';
import useModal from '../../context/ui/useModal';
import { Colors } from '../../util/Colors';
import { GButton } from '../../components/GButton';

export default function useAccountModal() {



    const changeUsernameContent = (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{
                "Change username"}</GText>
        </View>
    );

    const changePasswordContent = (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{
                "Change password"}</GText>
        </View>
    );

    const deleteAccountConfirmation = (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{
                "Are you sure you want to permanently delete your account?"}</GText>
            <GText style={styles.confirmation}>{"PS! This can't be undone."}</GText>
        </View>
    );

    const { Dialog: DeleteAccountDialog, openDialog: openDeleteAcountDialog } = useDialog(
        {
            onSave: () => { },
            content: deleteAccountConfirmation,
            bottomButtons: true,
        });

    const { Dialog: ChangePasswordDialog, openDialog: openChangePasswordDialog } = useDialog(
        {
            onSave: () => { },
            content: changePasswordContent,
            bottomButtons: true,
        });

    const { Dialog: ChangeUsernameDialog, openDialog: openChangeUsernameDialog } = useDialog(
        {
            onSave: () => { },
            content: changeUsernameContent,
            bottomButtons: true,
        });

    const accountForm = (
        <View style={styles.container}>
            {ChangeUsernameDialog}
            {ChangePasswordDialog}
            {DeleteAccountDialog}
            <GButton title={"Change Username"} onPress={openChangeUsernameDialog} icon={require('../../assets/user.png')}></GButton>
            <GButton title={"Change Password"} onPress={openChangePasswordDialog} icon={require('../../assets/password.png')}></GButton>
            <GButton title={"Delete Account"} onPress={openDeleteAcountDialog} icon={require('../../assets/delete.png')} iconTint={false}></GButton>
        </View>
    )


    const { Modal, openModal, closeModal, isOpened } = useModal({
        headerText: "My Account",
        content: accountForm,
    });


    return {
        AccountModal: Modal,
        openModal,
        closeModal,
        isOpened
    };
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    reminderText: {
        flex: 1,
    },
    goalValue: {
        flex: 1
    },
    clock: {
        marginLeft: 5,
    },
    confirmationContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    confirmation: {
        textAlign: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
    timeSelection: {
        marginRight: 10,
        flex: 0,
        height: 60,
        // minWidth: 170
    },
    reminderLabelRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    reminderLabelColumn: {
        display: 'flex',
        flex: 4
    },
    toggleContainer: {
        alignItems: 'flex-end',
        flex: 1,
    },
    subHeader: {
        marginBottom: 25,
        marginTop: 20,
    },
    habitBar: {
        marginBottom: 10,
    },
    habit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bell: {
        marginLeft: 10,
    },
    daySelection: {
        marginBottom: 35,
        marginTop: 10,
    }

});