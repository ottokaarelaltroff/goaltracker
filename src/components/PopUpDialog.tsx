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
    isOpened: boolean,
    canSave: boolean,
    setIsOpened: (value: boolean) => void,
    content: any,
    bottomButtons?: boolean
}
;
export const PopUpDialog = ({ isOpened, setIsOpened, content, onSave, onClose, title, canSave, bottomButtons = false }: PopUpDialogProps) => {

    const onActionLeft = () => {
        setIsOpened(false)
        onClose && onClose();
    }

    const onActionRight = () => {
        setIsOpened(false)
        onSave && onSave();
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
                                <Icon source={require("../assets/close.png")} light size={24} onPress={onActionLeft} />
                                <GText bold size={22} style={styles.title}>{title}</GText>
                                <TextButton title="Save" onPress={onActionRight} disabled={!canSave} />
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
        color: Colors.light
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
});