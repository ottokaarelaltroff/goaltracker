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
import { Goal, Unit } from '../../model/types';
import { Colors } from '../../util/Colors';
import useGoal from './useGoal';
import { useUnits } from '../units/useUnits';
import useAddUnitDialog from '../units/useAddUnitDialog';
import { EditCategories } from '../categories/EditCategories';
import { useCategories } from '../categories/useCategories';

interface EditGoalModalProps {
    goal: Goal;
    navigation: any
};

export default function useGoalModal({ goal, navigation }: EditGoalModalProps) {

    const { saveGoal, updateGoal, deleteGoal } = useGoal(goal?.id)
    const { setCategoriesToSave } = useCategories(goal?.id);
    const { AddUnitDialog, openAddDialog } = useAddUnitDialog()
    const [selectedUnit, setSelectedUnit] = useState<OptionType<Unit> | undefined>();
    const [titleValue, setTitleValue] = useState<string | undefined>(goal?.title);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(goal?.targetDate || new Date()));
    const [currentValue, setCurrentValue] = useState<string | undefined>(goal?.currentValue?.toString());
    const [targetValue, setTargetValue] = useState<string | undefined>(goal?.targetValue?.toString());
    const { units, deleteUnit, refetchAllUnits } = useUnits();

    const onSave = () => {
        if (goal) {
            goal.title = titleValue;
            goal.isCompleted = false,
                goal.targetDate = selectedDate;
            goal.currentValue = parseFloat(currentValue) || 0;
            goal.targetValue = parseFloat(targetValue) || 0;
            goal.unit = selectedUnit.value;
            updateGoal(goal);
        } else {
            const newGoal = {
                title: titleValue,
                isCompleted: false,
                targetDate: selectedDate,
                currentValue: parseFloat(currentValue) || 0,
                targetValue: parseFloat(targetValue) || 0,
                unit: selectedUnit.value
            } as Goal;
            saveGoal(newGoal);
        }
    }

    const onUnitDelete = (option: OptionType<Unit>) => {
        deleteUnit(option.value.id)
    }

    const getUnitOptions = () => {
        // console.log("OTTO getUnitOptions")
        if (units) {
            const result = [];
            units.map((unit) => result.push({ label: unit.name, value: unit }))
            return result;
        } else {
            refetchAllUnits();
        }
        return [];
    }


    useEffect(() => {

        if (goal && goal.unit) {
            setSelectedUnit({ label: goal?.unit?.name, value: goal?.unit })
        }
    }, [goal])

    useEffect(() => {
        if (units) {
            getUnitOptions();
        }
    }, [units])

    const deleteGoalConfirmation = (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{"Are you sure you want to delete this goal?"}</GText>
        </View>

    );
    const { Dialog: DeleteGoalDialog, openDialog } = useDialog(
        {
            onSave: () => {
                deleteGoal();
                navigation.push("AllGoalsScreen");
            },
            content: deleteGoalConfirmation,
            canSave: selectedUnit !== undefined,
            bottomButtons: true,
        });

    const onDelete = () => {
        openDialog()
    }

    const onClose = () => {
        // setCategoriesToSave(undefined)
    }

    const editGoalForm = (
        <View style={styles.container}>
            {AddUnitDialog}
            {DeleteGoalDialog}
            <Input
                label={"Name"}
                initialValue={goal?.title}
                charLimit={32}
                placeHolder={"What goal are you chasing?"}
                onChange={setTitleValue} />
            <View style={styles.row}>
                <Input
                    small
                    numeric
                    label={"Current"}
                    initialValue={goal?.currentValue.toString()}
                    charLimit={9}
                    placeHolder={"Current value"}
                    style={styles.currentValue}
                    onChange={setCurrentValue} />
                <Input
                    small
                    numeric
                    label={"Target"}
                    initialValue={goal?.targetValue.toString()}
                    placeHolder={"Target value"}
                    charLimit={9}
                    style={styles.goalValue}
                    onChange={setTargetValue} />
            </View>

            <DropdownInput
                label={"Unit"}
                placeholder={"Insert or Select"}
                options={getUnitOptions()}
                selectedValue={selectedUnit}
                onValueChange={setSelectedUnit}
                onAdd={openAddDialog}
                onDelete={onUnitDelete}
            />
            <GText style={styles.label}>{"Target Date"}</GText>
            <InputBar style={styles.targetDate}>
                <Icon source={require("../../assets/calendar.png")} light size={24} style={styles.calendar} />
                {selectedDate && <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => setSelectedDate(date)}
                    textColor={Colors.green}
                    style={{ backgroundColor: Colors.secondary }}
                />}
            </InputBar>

            <EditCategories goalId={goal?.id} />

        </View>
    )

    const isFormValid = titleValue && titleValue.length > 0 && titleValue.length <= 32 &&
        currentValue && currentValue.length > 0 && currentValue.length <= 9 &&
        targetValue && targetValue.length > 0 && targetValue.length <= 9 &&
        selectedDate && !!selectedUnit?.value

    const { Modal, openModal, closeModal, isOpened } = useModal({
        headerText: goal ? "Edit Goal" : "Add Goal",
        content: editGoalForm,
        onSave: onSave,
        onDelete: onDelete,
        onClose: onClose,
        canSave: isFormValid
    });

    return {
        GoalModal: Modal,
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