import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput, { OptionType } from '../../components/DropdownInput';
import { GText } from '../../components/GText';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { InputBar } from '../../components/InputBar';
import useDialog from '../../context/ui/useDialog';
import useModal from '../../context/ui/useModal';
import { Goal, Habit, Unit } from '../../model/types';
import { Colors } from '../../util/Colors';

import { useUnits } from '../units/useUnits';
import useAddUnitDialog from '../units/useAddUnitDialog';
import { EditCategories } from '../categories/EditCategories';
import useGoal from '../goals/useGoal';
import useAllGoals from '../goals/useAllGoals';

interface EditHabitModalProps {
    habit?: Habit;
    title: string;
    navigation: any
};

export default function useEditHabitModal() {

    const { selectedGoal } = useAllGoals();

    const [habit, setHabit] = useState<Habit | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(selectedGoal?.targetDate || new Date()));


    // const onSave = () => {
    //     if (goal) {
    //         goal.title = titleValue;
    //         goal.isCompleted = false,
    //             goal.targetDate = selectedDate;
    //         goal.currentValue = parseFloat(currentValue) || 0;
    //         goal.targetValue = parseFloat(targetValue) || 0;
    //         goal.unit = selectedUnit.value;
    //         updateGoal(goal);
    //     } else {
    //         const newGoal = {
    //             title: titleValue,
    //             isCompleted: false,
    //             targetDate: selectedDate,
    //             currentValue: parseFloat(currentValue) || 0,
    //             targetValue: parseFloat(targetValue) || 0,
    //             unit: selectedUnit.value
    //         } as Goal;
    //         saveGoal(newGoal);
    //     }
    // }

    const deleteHabitConfirmation = (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{"Are you sure you want to delete this habit?"}</GText>
        </View>

    );
    const { Dialog: DeleteHabitDialog, openDialog } = useDialog(
        {
            onSave: () => {
                // deleteGoal();
                // navigation.push("AllGoalsScreen");
            },
            content: deleteHabitConfirmation,
            bottomButtons: true,
        });

    const onDelete = () => {
        openDialog()
    }


    const editHabitForm = (
        <View style={styles.container}>
            {DeleteHabitDialog}
            <Input
                label={"Name"}
                initialValue={title}
                charLimit={32}
                placeHolder={"Describe your habit"}
                onChange={setTitle} />
            <View style={styles.row}>
                <Input
                    small
                    numeric
                    label={"Current"}
                    initialValue={"just do it"}
                    charLimit={9}
                    placeHolder={"Current value"}
                    style={styles.currentValue}
                    onChange={setTitle} />
                <Input
                    small
                    initialValue={"just do it"}
                    placeHolder={"Reminder Text"}
                    charLimit={32}
                    style={styles.goalValue}
                    onChange={setTitle} />
            </View>
        </View>
    )

    // const isFormValid = titleValue && titleValue.length > 0 && titleValue.length <= 32 &&
    //     currentValue && currentValue.length > 0 && currentValue.length <= 9 &&
    //     targetValue && targetValue.length > 0 && targetValue.length <= 9 &&
    //     selectedDate && !!selectedUnit?.value

    const { Modal, openModal, closeModal, isOpened } = useModal({
        headerText: "Edit Habit",
        content: editHabitForm,
        onSave: () => { },
        onDelete: onDelete,
        canSave: true
    });


    const openModalHandler = (habit: Habit) => {
        setHabit(habit);
        setTitle(habit.title)
        openModal()
    }


    return {
        EditHabitModal: Modal,
        openEditHabitModal: openModalHandler,
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
    currentValue: {
        marginRight: 15,
        flex: 1
    },
    goalValue: {
        flex: 1
    },
    calendar: {
        marginLeft: 5,
    },
    confirmationContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    confirmation: {
        textAlign: 'center'
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
    targetDate: {
        marginBottom: 15,
    }
});