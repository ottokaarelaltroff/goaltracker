import { useRef } from 'react';
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
  onClose?: () => void;
  onDelete?: () => void;
};

export default function useModal({ headerText, content, onClose, onDelete }: ModalProps) {
  const modalRef = useRef<ModalizeRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
    onClose && onClose();
  };

  const headerComponent = (
    <View style={styles.header}>
      <View style={styles.iconRow}>
        <Icon source={require("../../assets/close.png")} onPress={closeModal} />
        {onDelete && <Icon source={require("../../assets/delete.png")} onPress={onDelete} style={styles.deleteIcon} />}
      </View>
      <GText bold size={22} style={styles.title}>{headerText}</GText>
      <View style={styles.save}>
        <TextButton title={'Save'} onPress={closeModal} style={{ textAlign: 'right' }} />
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