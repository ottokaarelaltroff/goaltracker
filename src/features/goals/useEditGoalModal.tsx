import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput, { OptionType } from '../../components/DropdownInput';
import { Input } from '../../components/Input';
import useModal from '../../context/ui/useModal';
import { Goal, Unit } from '../../model/types';
import { EditCategories } from './EditCategories';
import { useUnits } from './useUnits';

interface EditGoalModalProps {
    goal: Goal;
    title: string;
};

export default function useEditGoalModal({ goal, title }: EditGoalModalProps) {

    const [selectedUnit, setSelectedUnit] = useState<OptionType<Unit> | undefined>();
    const { units, fetchAllUnits } = useUnits(goal?.id);

    const getUnitOptions = () => {
        if (units) {
            const result = [];
            units.map((unit) => result.push({ label: unit.name, value: unit }))
            return result;
        } else {
            fetchAllUnits();
        }
        return [];
    }

    useEffect(() => {
        if (goal && goal.unit) {
            setSelectedUnit({ label: goal?.unit?.name, value: goal?.unit })
        }
    }, [goal])




    const editGoalForm = (
        <View style={styles.container}>
            <Input label={"Name"} initialValue={goal?.title} placeHolder={"What goal are you chasing?"}></Input>
            <View style={styles.row}>
                <Input numeric label={"Current"} initialValue={goal?.currentValue.toString()} placeHolder={"Current value"} style={styles.currentValue}></Input>
                <Input numeric label={"Goal"} initialValue={goal?.targetValue.toString()} placeHolder={"Goal value"} style={styles.goalValue}></Input>
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

    const { Modal, openModal, closeModal, isOpened } = useModal({ headerText: title, content: editGoalForm, onDelete: () => { } });

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