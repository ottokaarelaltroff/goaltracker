import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from '../../components/Input';
import useDialog from '../../context/ui/useDialog';
import { Colors } from '../../util/Colors';
import { useUnits } from './useUnits';

type Props = {
    goalId?: string,
}

export default function useAddUnitDialog({ goalId }: Props) {

    const [name, setName] = useState<string>();
    const { saveUnit } = useUnits({ goalId });

    const onSave = () => {
        saveUnit && saveUnit({ name: name })
        setName('');
    };

    const addUnitForm = (
        <View style={styles.container}>
            <Input
                label={"Name"}
                placeHolder={"Add name"}
                initialValue={name || ''}
                color={Colors.primary}
                style={styles.input}
                onChange={setName} />
        </View>
    )

    const { Dialog, openDialog, closeDialog, isOpened } = useDialog(
        {
            onSave: onSave,
            headerText: "Create Unit",
            content: addUnitForm,
            canSave: name && name.length > 0 && name.length <= 16
        });

    return {
        AddUnitDialog: Dialog,
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