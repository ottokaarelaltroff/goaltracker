import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorSelection } from '../../components/ColorSelection';
import { GText } from '../../components/GText';
import { Input } from '../../components/Input';
import { Tag } from '../../components/Tag';
import useDialog from '../../context/ui/useDialog';
import { Category } from '../../model/types';
import { Colors } from '../../util/Colors';
import { useCategories } from './useCategories';

type Props = {
    goalId?: string,
}

export default function useEditCategoryDialog({ goalId }: Props) {


    const [category, setCategory] = useState<Category | undefined>();
    const [name, setName] = useState<string | undefined>('');
    const [color, setColor] = useState<string>();
    const { updateCategory, deleteCategory } = useCategories(goalId);

    const onSave = () => {
        updateCategory({ id: category.categoryId || category.id, name: name, color: color })
    };

    const onDelete = () => {
        deleteCategory(category.categoryId || category.id)
    };

    const changeName = (value: string) => {
        setName(value)
        category.name = value;
    };

    const changeColor = (value: string) => {
        setColor(value)
        category.color = value;
    };

    const editCategoryForm = (
        <View style={styles.container}>
            <View style={styles.tagContainer}>
                <Tag title={name || 'Preview'} color={color || Colors.purple} style={styles.tag}></Tag>
            </View>
            <Input label={"Name"} placeHolder={"Add name"} initialValue={name} color={Colors.primary} style={{ width: '100%' }} onChange={changeName}></Input>
            <View>
                <GText style={styles.label}>{"Color"}</GText>
            </View>
            <ColorSelection onSelect={changeColor} selectedColor={color || Colors.purple} />
        </View>
    )


    const { Dialog, openDialog, closeDialog, isOpened } = useDialog(
        {
            onSave: onSave,
            onDelete: onDelete,
            headerText: "Edit Category",
            content: editCategoryForm,
            canSave: category?.name && category?.name.length > 0
        });

    const onOpen = (cat: Category) => {
        setCategory(cat)
        if (cat.name && cat.color) {
            setName(cat.name)
            setColor(cat.color)
        }
        openDialog()
    }

    return {
        EditCategoryDialog: Dialog,
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