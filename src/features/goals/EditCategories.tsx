import { StyleSheet, View } from "react-native";
import { GText } from "../../components/GText";
import { InputBar } from "../../components/InputBar";
import { Category, Goal } from "../../model/types";
import { Colors } from "../../util/Colors";
import { CategoryTags } from "./CategoryTags";
import { useCategories } from "./useCategories";
import useGoal from "./useGoal";
import { Icon } from "../../components/Icon";

type EditCategoriesProps = {
    goalId: string,
}
export const EditCategories = ({ goalId }: EditCategoriesProps) => {

    const { goal } = useGoal(goalId);
    const { allCategories, fetchAllCategories } = useCategories(goalId);

    if (!allCategories) {
        fetchAllCategories();
    }

    const onAdd = (category: Category) => {
        console.log("add", category)
    }

    const onRemove = (category: Category) => {
        console.log("remove", category)
    }

    const categoriesToAdd = allCategories?.filter((category) => {
        return !goal?.categories.some(goalCategory => goalCategory.categoryId === category.id);
    }) || [];

    // if (!goal) {
    //     return null;
    // }

    return (
        <View>
            <GText style={styles.label}>{"Categories"}</GText>
            <InputBar style={styles.bar}>
                {goal?.categories
                    ? <CategoryTags categories={goal?.categories} onPress={onRemove}></CategoryTags>
                    : <GText bold style={styles.placeholder}>{"Add or Create"}</GText>}
                <Icon source={require("../../assets/plus.png")} light size={24} onPress={() => { }} />
            </InputBar>
            <View style={styles.selection}>
                <CategoryTags add categories={categoriesToAdd} onPress={onAdd}></CategoryTags>
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