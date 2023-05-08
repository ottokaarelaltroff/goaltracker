import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { InputBar } from "../../components/InputBar";
import { Category } from "../../model/types";
import { Colors } from "../../util/Colors";
import { CategoryTags } from "./CategoryTags";
import useAddCategoryDialog from "./useAddCategoryDialog";
import { useCategories } from "./useCategories";
import useGoal from "./useGoal";
import useEditCategoryDialog from "./useEditCategoryDialog";

type EditCategoriesProps = {
    goalId: string,
}
export const EditCategories = ({ goalId }: EditCategoriesProps) => {

    const { goal } = useGoal(goalId);
    const { goalCategories, allCategories, fetchAllCategories, deleteGoalCategory, saveGoalCategory } = useCategories(goalId);
    const { AddCategoryDialog, openAddDialog } = useAddCategoryDialog({ goalId: goalId });
    const { EditCategoryDialog, openEditDialog } = useEditCategoryDialog({ goalId: goalId });

    if (!allCategories) {
        fetchAllCategories();
    }

    const getCategoriesToAdd = () => allCategories?.filter((category) => {
        return !selectedCategories?.some(goalCategory => goalCategory.categoryId === category.id);
    });

    const [selectedCategories, setSelectedCategories] = useState<Category[]>(goalCategories || undefined);
    const [categoriesToAdd, setCategoriesToAdd] = useState<Category[]>(getCategoriesToAdd() || undefined);


    const addGoalCategory = (category: Category) => {
        console.log("OTTO add", category)
        saveGoalCategory(category);
        setSelectedCategories([...selectedCategories || [], category]);
        const updatedCategoriesToAdd = categoriesToAdd.filter(c => c.id !== category.id);
        setCategoriesToAdd(updatedCategoriesToAdd);
    }

    const removeGoalCategory = (category: Category) => {
        console.log("OTTO removeCategory", category)
        deleteGoalCategory(category);
        const updatedSelectedCategories = selectedCategories.filter(c => c.id !== category.id);
        setSelectedCategories(updatedSelectedCategories);
        setCategoriesToAdd([...categoriesToAdd || [], category]);
    }

    const onCategoryEdit = (category: Category) => {
        openEditDialog(category);
    }

    useEffect(() => {
        if (goal && goalCategories !== undefined && goalCategories.length > 0) {
            setSelectedCategories(goalCategories)
        }
    }, [goal, goalCategories])

    useEffect(() => {
        if (allCategories) {
            setCategoriesToAdd(getCategoriesToAdd())
        }
    }, [allCategories])

    return (
        <View style={{}}>
            {AddCategoryDialog}
            {EditCategoryDialog}
            <GText style={styles.label}>{"Categories"}</GText>
            <InputBar style={styles.bar}>
                <View style={styles.selected}>
                    {selectedCategories
                        // ? <GText bold style={styles.placeholder}>{"Add or Create"}</GText>
                        ? <CategoryTags categories={selectedCategories} onAction={removeGoalCategory} onEdit={onCategoryEdit}></CategoryTags>
                        : <GText bold style={styles.placeholder}>{"Add or Create"}</GText>}
                </View>
                <View style={styles.plusIcon}>
                    <Icon source={require("../../assets/plus.png")} light size={24} onPress={openAddDialog} />
                </View>

            </InputBar>
            <View style={styles.selection}>
                <CategoryTags add categories={categoriesToAdd} onAction={addGoalCategory} onEdit={onCategoryEdit}></CategoryTags>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    placeholder: {
        color: Colors.grayAlpha(0.3),
        fontSize: 18,
        marginVertical: 5,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
    selection: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    selected: {
        flex: 8
    },
    bar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    plusIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 5,
    }


});