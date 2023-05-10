import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../components/Input';
import useDialog from '../../context/ui/useDialog';
import { Colors } from '../../util/Colors';
import { Step } from '../../model/types';
import { useSteps } from './useSteps';

export default function useEditStepDialog() {

    const [step, setStep] = useState<Step | undefined>();
    const [title, setTitle] = useState<string | undefined>('');
    const { updateStep, deleteStep } = useSteps();

    const onSave = () => {
        step.title = title;
        updateStep && updateStep(step)
        setTitle('');
    };


    const onDelete = () => {
        deleteStep(step.stepId)
    };

    const editStepForm = (
        <View style={styles.container}>
            <Input
                label={"Title"}
                placeHolder={"Add title"}
                initialValue={title || ''}
                color={Colors.primary}
                style={styles.input}
                onChange={setTitle} />
        </View>
    )

    const { Dialog, openDialog, closeDialog, isOpened } = useDialog(
        {
            onSave: onSave,
            onDelete: onDelete,
            headerText: "Edit Step",
            content: editStepForm,
            canSave: title && title.length > 0 && title.length <= 32
        });

    const onOpen = (step: Step) => {
        setStep(step)
        if (step.title) {
            setTitle(step.title)
        }
        openDialog()
    }

    return {
        EditStepDialog: Dialog,
        openEditDialog: onOpen,
        closeDialog,
        isOpened
    };
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        width: '100%'
    },
    input: {
        width: '100%'
    },



});