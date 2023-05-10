import { StyleSheet, View } from "react-native";
import { CheckMark } from "../../components/CheckMark";
import { TextButton } from "../../components/TextButton";
import { Step } from "../../model/types";
import useEditStepDialog from "./useEditStepDialog";
import { useSteps } from "./useSteps";
import { Colors } from "../../util/Colors";
import useAddStepDialog from "./useAddStepDialog";


interface StepsListProps {
    style?: any,
    children?: any
};

export const StepsList = ({ }: StepsListProps) => {
    const { steps, fetchGoalSteps, updateStep } = useSteps();
    const { EditStepDialog, openEditDialog } = useEditStepDialog();
    const { AddStepDialog, openAddDialog } = useAddStepDialog();

    if (steps === undefined) {
        fetchGoalSteps()
    }

    const toggleCheckMark = (step: Step) => {
        step.isCompleted = !step.isCompleted
        updateStep(step)
    }

    const getCheckListItems = () => {
        const checkList = []
        steps.map(item => checkList.push({
            icon: <CheckMark isChecked={item.isCompleted} onClick={() => toggleCheckMark(item)} />,
            step: <TextButton title={item.title} size={16} style={styles.text} onPress={() => openEditDialog(item)} />
        }));
        checkList.push(
            {
                icon: <CheckMark />,
                step: <TextButton title={"Add new step"} size={16} onPress={openAddDialog} style={[styles.text, styles.addNewText]} />
            }
        )
        return checkList;
    }

    return (
        <View>
            {EditStepDialog}
            {AddStepDialog}
            {steps !== undefined && getCheckListItems().map((item, index) => (
                <View style={styles.listItem} key={index}>
                    {item.icon}
                    {item.step}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    },
    addNewText: {
        color: Colors.grayAlpha(0.5),
    }
});