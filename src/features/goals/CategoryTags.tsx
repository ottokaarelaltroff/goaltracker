import { StyleSheet, View } from "react-native";
import { Tag } from "../../components/Tag";
import { Category } from "../../model/types";
import { getColorByName } from "../../util/Colors";

type CategoryTagsProps = {
    categories: Category[]
}
export const CategoryTags = ({ categories }: CategoryTagsProps) => (
    <View style={styles.container}>
        {categories && categories.map((category, index) => (
            <Tag title={category.name} color={getColorByName(category.color)} key={index}></Tag>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

});