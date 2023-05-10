import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../components/Input';
import useDialog from '../../context/ui/useDialog';
import { Colors } from '../../util/Colors';
import { useSteps } from './useSteps';

export default function useAddStepDialog() {

    const [title, setTitle] = useState<string | undefined>('');
    const { saveStep } = useSteps();

    const onSave = () => {
        saveStep({ title: title, isCompleted: false })
        setTitle('');
    };

    const addStepForm = (
        <View style={styles.container}>
            <Input
                label={"Title"}
                placeHolder={"Add title"}
                charLimit={32}
                initialValue={title || ''}
                color={Colors.primary}
                style={styles.input}
                onChange={setTitle} />
        </View>
    )

    const { Dialog, openDialog, closeDialog, isOpened } = useDialog(
        {
            onSave: onSave,
            headerText: "Add Step",
            content: addStepForm,
            canSave: title && title.length > 0 && title.length <= 32
        });

    return {
        AddStepDialog: Dialog,
        openAddDialog: openDialog,
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