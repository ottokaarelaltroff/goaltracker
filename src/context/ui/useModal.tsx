import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { GText } from '../../components/GText';
import { Icon } from '../../components/Icon';
import { TextButton } from '../../components/TextButton';
import { Colors } from '../../util/Colors';

type ModalizeRef = {
  open: () => void;
  close: () => void;
};

type ModalProps = {
  headerText: string
  content: any,
  canSave: boolean,
  onSave?: () => void;
  onClose?: () => void;
  onDelete?: () => void;
};

export default function useModal({ headerText, content, onSave, onClose, onDelete, canSave }: ModalProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const modalRef = useRef<ModalizeRef>(null);

  const openModal = () => {
    modalRef.current?.open();
    setIsOpened(true);
  };

  const closeModal = () => {
    modalRef.current?.close();
    setIsOpened(false);
    onClose && onClose();
  };

  const onSaveClick = () => {
    onSave && onSave();
    closeModal();
  }

  const headerComponent = (
    <View style={styles.header}>
      <View style={styles.iconRow}>
        <Icon source={require("../../assets/close.png")} onPress={closeModal} style={styles.closeIcon} />
        {onDelete && <Icon source={require("../../assets/delete.png")} onPress={onDelete} style={styles.deleteIcon} />}
      </View>
      <GText bold size={22} style={styles.title}>{headerText}</GText>
      <View style={styles.save}>
        <TextButton title={'Save'} onPress={onSaveClick} disabled={!canSave} />
      </View>
    </View>
  )


  const Modal = (
    <Modalize
      ref={modalRef}
      disableScrollIfPossible={true}
      useNativeDriver
      modalStyle={styles.modalContainer}
      HeaderComponent={headerComponent}>
      {content}
    </Modalize>
  );

  return {
    Modal,
    openModal,
    closeModal,
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
    // borderWidth: 2,
    flex: 0.5
  },
  closeIcon: {
    // borderWidth: 2,
    flex: 0.5
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
});