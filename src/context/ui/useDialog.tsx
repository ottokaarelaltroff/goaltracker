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
    onSave?: () => void;
    canSave?: boolean,
    bottomButtons?: boolean,
};

export default function useDialog({ headerText, content, onClose, onDelete, onSave, canSave, bottomButtons }: DialogProps) {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const openDialog = () => {
        setIsOpened(true);
    };

    const closeDialog = () => {
        setIsOpened(false);
        onClose && onClose();
    };

    const Dialog = (
        <PopUpDialog
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            onSave={onSave}
            content={content}
            title={headerText}
            canSave={canSave}
            bottomButtons={bottomButtons} />
    );

    return {
        Dialog,
        openDialog,
        closeDialog,
        isOpened
    };
}