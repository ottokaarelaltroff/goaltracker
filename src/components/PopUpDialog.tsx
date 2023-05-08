import { Modal, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { GButton } from "./GButton";
import { GText } from "./GText";
import { Icon } from "./Icon";
import { TextButton } from "./TextButton";

interface PopUpDialogProps {
    title?: string;
    onSave?: () => void;
    onClose?: () => void;
    onDelete?: () => void;
    isOpened: boolean,
    canSave: boolean,
    setIsOpened: (value: boolean) => void,
    content: any,
    bottomButtons?: boolean
}
;
export const PopUpDialog = ({ isOpened, setIsOpened, content, onSave, onClose, onDelete, title, canSave, bottomButtons = false }: PopUpDialogProps) => {

    const onActionLeft = () => {
        setIsOpened(false)
        onClose && onClose();
    }

    const onActionRight = () => {
        setIsOpened(false)
        onSave && onSave();
    }

    const onDeleteIcon = () => {
        setIsOpened(false)
        onDelete && onDelete();
    }

    if (!isOpened) {
        return null;
    }

    return (
        <View>
            <Modal visible={isOpened} transparent={true}>
                <View
                    style={styles.modalBackground}>
                    <View style={styles.modal}>


                        {title &&
                            <View style={styles.header}>
                                <View style={styles.iconRow}>
                                    <Icon source={require("../assets/close.png")} light onPress={onActionLeft} style={styles.closeIcon} />
                                    {onDelete && <Icon source={require("../assets/delete.png")} onPress={onDeleteIcon} style={styles.deleteIcon} />}
                                </View>
                                <GText bold size={22} style={styles.title}>{title}</GText>
                                <View style={styles.save}>
                                    <TextButton title="Save" onPress={onActionRight} disabled={!canSave} />
                                </View>

                            </View>}


                        {content &&
                            <View style={styles.content}>{content}</View>
                        }

                        {bottomButtons &&
                            <View style={styles.bottomButtons}>
                                <View style={[styles.bottomButton]}>
                                    <GButton title={"Cancel"} onPress={onActionLeft} backgroundColor={Colors.primary}></GButton>
                                </View>
                                <View style={[styles.bottomButton]}>
                                    <GButton title={"OK"} onPress={onActionRight} backgroundColor={Colors.primary}></GButton>
                                </View>
                            </View>
                        }
                    </View>
                </View>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blackAlpha(0.6),
    },
    modal: {
        width: '90%',
        maxHeight: '80%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.secondary,
        borderRadius: 25,

    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
    },
    content: {
        alignItems: 'center',
        flex: 0,
        padding: 10,
    },
    title: {
        color: Colors.light,
        flex: 2,
        textAlign: 'center',
    },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    bottomButtons: {
        flex: 0,
        display: 'flex',
        flexDirection: 'row',
    },
    bottomButton: {
        flex: 1,
    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
    },
    deleteIcon: {
        // borderWidth: 2,
        flex: 0.5
    },
    closeIcon: {
        // borderWidth: 2,
        flex: 0.5
    },
    save: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
});