import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput from '../../components/DropdownInput';
import { Input } from '../../components/Input';
import useModal from '../../context/ui/useModal';
import { Goal } from '../../model/types';
import { InputBar } from '../../components/InputBar';
import { GText } from '../../components/GText';
import { Colors } from '../../util/Colors';
import { CategoryTags } from './CategoryTags';
import { EditCategories } from './EditCategories';

interface EditGoalModalProps {
    goal: Goal;
};

export default function useEditGoalModal({ goal }: EditGoalModalProps) {

    const [selectedValue, setSelectedValue] = useState(null);

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 3', value: 'option3' },
    ];

    const editGoalForm = (
        <View style={styles.container}>
            <Input label={"Name"} initialValue={goal?.title} placeHolder={"What goal are you chasing?"}></Input>
            <View style={styles.row}>
                <Input label={"Current"} initialValue={goal?.currentValue.toString()} placeHolder={"Current value"} style={styles.current}></Input>
                <Input label={"Goal"} initialValue={goal?.targetValue.toString()} placeHolder={"Goal value"}></Input>
            </View>
            <DropdownInput
                label={"Unit"}
                placeholder={"Insert or Select"}
                options={options}
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
            />
            <DropdownInput
                label={"Due Date"}
                placeholder={"Select"}
                options={options}
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
                icon={require("../../assets/calendar.png")}
            />
            <EditCategories goal={goal} />
        </View>
    )

    const { Modal, openModal, closeModal } = useModal({ headerText: 'Edit Goal', content: editGoalForm, onDelete: () => { } });

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
        paddingVertical: 20,

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    current: {
        marginRight: 15,
    },


});