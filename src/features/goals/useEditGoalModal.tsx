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
import { EditCategories } from './EditCategories';
import useGoal from './useGoal';
import { useUnits } from './useUnits';

interface EditGoalModalProps {
    goal: Goal;
    title: string;
    navigation: any
};

export default function useEditGoalModal({ goal, title, navigation }: EditGoalModalProps) {

    const { saveGoal, updateGoal, deleteGoal } = useGoal(goal?.id)
    const { getUnitOptions } = useUnits(goal?.id);
    const [selectedUnit, setSelectedUnit] = useState<OptionType<Unit> | undefined>();
    const [titleValue, setTitleValue] = useState<string | undefined>(goal?.title);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(goal?.targetDate || new Date()));
    const [currentValue, setCurrentValue] = useState<string | undefined>(goal?.currentValue?.toString());
    const [targetValue, setTargetValue] = useState<string | undefined>(goal?.targetValue?.toString());

    const onSave = () => {
        let newUnit = {} as Unit;
        if (typeof selectedUnit.value === 'string') {
            newUnit.name = selectedUnit.value
        } else {
            newUnit = selectedUnit.value
        }

        if (goal) {
            goal.title = titleValue;
            goal.isCompleted = false,
                goal.targetDate = selectedDate;
            goal.currentValue = parseFloat(currentValue) || 0;
            goal.targetValue = parseFloat(targetValue) || 0;
            goal.unit = newUnit;
            updateGoal(goal);
        } else {
            const newGoal = {
                title: titleValue,
                isCompleted: false,
                targetDate: selectedDate,
                currentValue: parseFloat(currentValue) || 0,
                targetValue: parseFloat(targetValue) || 0,
                unit: newUnit
            } as Goal;
            console.log("OTTO save", newGoal)
            saveGoal(newGoal);
        }
    }

    useEffect(() => {
        if (goal && goal.unit) {
            setSelectedUnit({ label: goal?.unit?.name, value: goal?.unit })
        }
    }, [goal])


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
            canSave: true,
            bottomButtons: true,
        });

    const onDelete = () => {
        openDialog()
    }


    const editGoalForm = (
        <View style={styles.container}>
            {DeleteGoalDialog}
            <Input
                label={"Name"}
                initialValue={goal?.title}
                placeHolder={"What goal are you chasing?"}
                onChange={setTitleValue} />
            <View style={styles.row}>
                <Input
                    numeric
                    label={"Current"}
                    initialValue={goal?.currentValue.toString()}
                    placeHolder={"Current value"}
                    style={styles.currentValue}
                    onChange={setCurrentValue} />
                <Input
                    numeric
                    label={"Target"}
                    initialValue={goal?.targetValue.toString()}
                    placeHolder={"Target value"}
                    style={styles.goalValue}
                    onChange={setTargetValue} />
            </View>

            <DropdownInput
                label={"Unit"}
                placeholder={"Insert or Select"}
                options={getUnitOptions()}
                selectedValue={selectedUnit}
                onValueChange={setSelectedUnit}
            />
            <GText style={styles.label}>{"Target Date"}</GText>
            <InputBar style={styles.targetDate}>
                <Icon source={require("../../assets/calendar.png")} light size={24} style={styles.calendar} />
                {/* <TextButton title={selectedDate.toLocaleDateString()} onPress={() => setShowPicker(true)} /> */}
                {selectedDate && <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    // dateFormat={'day month year'}
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

    const { Modal, openModal, closeModal, isOpened } = useModal({ headerText: title, content: editGoalForm, onSave: onSave, onDelete: onDelete });

    return {
        EditGoalModal: Modal,
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