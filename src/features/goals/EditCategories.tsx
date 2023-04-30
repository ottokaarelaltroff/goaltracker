import { StyleSheet, View } from "react-native";
import { Tag } from "../../components/Tag";
import { Category, Goal } from "../../model/types";
import { Colors, getColorByName } from "../../util/Colors";
import { Icon } from "../../components/Icon";
import { CategoryTags } from "./CategoryTags";
import { GText } from "../../components/GText";
import { InputBar } from "../../components/InputBar";

type EditCategoriesProps = {
    goal: Goal,
}
export const EditCategories = ({ goal }: EditCategoriesProps) => {

    const onRemove = (category: Category) => {

        console.log("remove", category)
        // goal.categories.pop()
    }
    return (
        <View>
            <GText style={styles.label}>{"Categories"}</GText>
            <InputBar>
                {goal?.categories ?
                    <View style={styles.container}>
                        <CategoryTags categories={goal?.categories} onPress={onRemove}></CategoryTags>
                    </View>
                    :
                    <GText bold style={styles.placeholder}>{"Choose one or more"}</GText>}
            </InputBar>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

    },
    placeholder: {
        color: Colors.grayAlpha(0.3),
        fontSize: 18,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },


});