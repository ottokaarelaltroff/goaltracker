import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DropdownInput, { OptionType } from '../../components/DropdownInput';
import { Input } from '../../components/Input';
import useModal from '../../context/ui/useModal';
import { Category, Goal, Unit } from '../../model/types';
import { EditCategories } from './EditCategories';
import { useUnits } from './useUnits';
import { GButton } from '../../components/GButton';
import useDialog from '../../context/ui/useDialog';

interface AddCategoryDialogProps {
    // category: Category;
    // title: string;
};

export default function useAddCategoryDialog() {

    const addCategoryForm = (
        <View style={styles.container}>
            <Input label={"Name"} initialValue={"goal?.title"} placeHolder={"What goal are you chasing?"}></Input>


        </View>
    )

    const { Dialog, openDialog, closeDialog, isOpened } = useDialog({ headerText: "Add Category", content: addCategoryForm });

    return {
        AddCategoryDialog: Dialog,
        openDialog,
        closeDialog,
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
    current: {
        marginRight: 15,
    },


});