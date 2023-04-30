import { useContext, useRef } from 'react';
import { UserContext } from '../providers/UserProvider';
import { Modalize } from 'react-native-modalize';
import { Image, StyleSheet, View } from 'react-native';
import { Colors } from '../../util/Colors';
import { GText } from '../../components/GText';
import { TextButton } from '../../components/TextButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from '../../components/Icon';

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
        <Icon name='close' onPress={closeModal} />
        {onDelete && <Icon name='delete' onPress={onDelete} />}
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
  icon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  iconRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  save: {
    flex: 1,
  },
});