import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { PopUpDialog } from '../../components/PopUpDialog';
import { Colors } from '../../util/Colors';

export type DialogRef = {
    open: () => void;
    close: () => void;
};

type DialogProps = {
    headerText?: string
    content?: any,
    onClose?: () => void;
    onDelete?: () => void;
};

export default function useDialog({ headerText, content, onClose, onDelete }: DialogProps) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const openDialog = () => {
        setIsOpened(true);
    };

    const closeDialog = () => {
        setIsOpened(false);
        onClose && onClose();
    };

    const Dialog = (
        <PopUpDialog isOpened={isOpened} setIsOpened={setIsOpened} content={content} title={headerText} />
    );

    return {
        Dialog,
        openDialog,
        closeDialog,
        isOpened
    };
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 0.9,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    deleteIcon: {
        marginLeft: 20,
        // borderWidth: 2
    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,

    },
    title: {
        flex: 1,
        textAlign: 'center'
    },
    save: {
        flex: 1,
    },
});