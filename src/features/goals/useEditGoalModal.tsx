import { useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Colors } from '../../util/Colors';
import useModal from '../../context/ui/useModal';
import { GText } from '../../components/GText';
import { Goal } from '../../model/types';
import { TextButton } from '../../components/TextButton';

interface EditGoalModalProps {
    goal: Goal;
};

export default function useEditGoalModal({ goal }: EditGoalModalProps) {

    const editGoalContent = (
        <View style={styles.container}>
            <GText>{goal.title}</GText>
        </View>
    )

    const { Modal, openModal, closeModal } = useModal({ headerText: 'Edit Goal', content: editGoalContent, onDelete: () => { } });

    return {
        EditGoalModal: Modal,
        openModal,
        closeModal,
    };
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,

    },

});