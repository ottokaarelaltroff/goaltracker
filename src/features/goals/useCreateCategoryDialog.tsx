import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorSelection } from '../../components/ColorSelection';
import { GText } from '../../components/GText';
import { Input } from '../../components/Input';
import { Tag } from '../../components/Tag';
import useDialog from '../../context/ui/useDialog';
import { Colors } from '../../util/Colors';
import { useCategories } from './useCategories';

type Props = {
    goalId?: string,
    // category?: Category
}

export default function useCreateCategoryDialog({ goalId }: Props) {

    const [name, setName] = useState<string>();
    const [color, setColor] = useState<string>(Colors.purple);
    const { saveCategory } = useCategories(goalId);

    const onSave = () => {
        saveCategory && saveCategory({ name: name, color: color })
    };

    const addCategoryForm = (
        <View style={styles.container}>
            <View style={styles.tagContainer}>
                <Tag title={name || 'Preview'} color={color} style={styles.tag}></Tag>
            </View>
            <Input label={"Name"} placeHolder={"Add name"} initialValue={name || ''} color={Colors.primary} style={{ width: '100%' }} onChange={setName}></Input>
            <View>
                <GText style={styles.label}>{"Color"}</GText>
            </View>
            <ColorSelection onSelect={setColor} selectedColor={Colors.purple} />
        </View>
    )

    const { Dialog, openDialog, closeDialog, isOpened } = useDialog(
        {
            onSave: onSave,
            headerText: "Create Category",
            content: addCategoryForm,
            canSave: name && name.length > 0
        });

    return {
        AddCategoryDialog: Dialog,
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
    tagContainer: {
        alignItems: 'center',
    },
    tag: {
        marginVertical: 10
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },



});