import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput, { OptionType } from '../../components/DropdownInput';
import { Input } from '../../components/Input';
import useModal from '../../context/ui/useModal';
import { Goal, Unit } from '../../model/types';
import { EditCategories } from './EditCategories';
import { useUnits } from './useUnits';
import useGoal from './useGoal';

interface EditGoalModalProps {
    goal: Goal;
    title: string;
};

export default function useEditGoalModal({ goal, title }: EditGoalModalProps) {

    const { saveGoal, updateGoal } = useGoal(goal?.id)
    const [selectedUnit, setSelectedUnit] = useState<OptionType<Unit> | undefined>();
    const [titleValue, setTitleValue] = useState<string | undefined>(goal?.title);
    const [targetDate, setTargetDate] = useState<Date | undefined>(new Date());
    const [currentValue, setCurrentValue] = useState<string | undefined>(goal?.currentValue?.toString());
    const [targetValue, setTargetValue] = useState<string | undefined>(goal?.targetValue?.toString());
    const { getUnitOptions } = useUnits(goal?.id);

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
                goal.targetDate = targetDate;
            goal.currentValue = parseFloat(currentValue) || 0;
            goal.targetValue = parseFloat(targetValue) || 0;
            goal.unit = newUnit;
            updateGoal(goal);
        } else {
            const newGoal = {
                title: titleValue,
                isCompleted: false,
                targetDate: targetDate,
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

    const editGoalForm = (
        <View style={styles.container}>
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
            {/* <DropdownInput
                label={"Due Date"}
                placeholder={"Select"}
                options={options}
                selectedValue={{ label: getDateFormatted(goal?.targetDate), value: goal?.unit }}
                onValueChange={setSelectedValue}
                icon={require("../../assets/calendar.png")}
            /> */}
            <EditCategories goalId={goal?.id} />

        </View>
    )

    const { Modal, openModal, closeModal, isOpened } = useModal({ headerText: title, content: editGoalForm, onSave: onSave, onDelete: () => { } });

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
    }


});