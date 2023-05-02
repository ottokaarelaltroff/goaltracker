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

type EditCategoriesProps = {
    goalId: string,
}
export const EditCategories = ({ goalId }: EditCategoriesProps) => {

    const { goal } = useGoal(goalId);
    const { allCategories, fetchAllCategories } = useCategories(goalId);
    const { AddCategoryDialog, openDialog } = useAddCategoryDialog({ category: undefined });

    if (!allCategories) {
        fetchAllCategories();
    }

    const getCategoriesToAdd = () => allCategories?.filter((category) => {
        return !selectedCategories?.some(goalCategory => goalCategory.categoryId === category.id);
    });

    const [selectedCategories, setSelectedCategories] = useState<Category[]>(goal?.categories || undefined);
    const [categoriesToAdd, setCategoriesToAdd] = useState<Category[]>(getCategoriesToAdd() || undefined);


    const addCategory = (category: Category) => {
        setSelectedCategories([...selectedCategories || [], category]);
        const updatedCategoriesToAdd = categoriesToAdd.filter(c => c.id !== category.id);
        setCategoriesToAdd(updatedCategoriesToAdd);
    }

    const removeCategory = (category: Category) => {
        const updatedSelectedCategories = selectedCategories.filter(c => c.id !== category.id);
        setSelectedCategories(updatedSelectedCategories);
        setCategoriesToAdd([...categoriesToAdd || [], category]);
    }

    useEffect(() => {
        if (goal && goal.categories !== undefined && goal.categories.length > 0 && !selectedCategories) {
            setSelectedCategories(goal.categories)
        }
    }, [goal])

    useEffect(() => {
        if (allCategories && !categoriesToAdd) {
            console.log("useEffect");
            setCategoriesToAdd(getCategoriesToAdd())
        }
    }, [allCategories])

    return (
        <View style={{}}>
            {AddCategoryDialog}
            <GText style={styles.label}>{"Categories"}</GText>
            <InputBar style={styles.bar}>
                {selectedCategories
                    ? <CategoryTags categories={selectedCategories} onPress={removeCategory}></CategoryTags>
                    : <GText bold style={styles.placeholder}>{"Add or Create"}</GText>}
                <Icon source={require("../../assets/plus.png")} light size={24} onPress={openDialog} />
            </InputBar>
            <View style={styles.selection}>
                <CategoryTags add categories={categoriesToAdd} onPress={addCategory}></CategoryTags>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    placeholder: {
        color: Colors.grayAlpha(0.3),
        fontSize: 18,
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
    bar: {
        justifyContent: 'space-between'
    }


});