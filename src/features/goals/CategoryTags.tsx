import { StyleSheet, View } from "react-native";
import { Tag } from "../../components/Tag";
import { Category } from "../../model/types";
import { Colors, getColorByName } from "../../util/Colors";
import { Icon } from "../../components/Icon";
import { TouchableOpacity } from "react-native-gesture-handler";

type CategoryTagsProps = {
    categories: Category[],
    onPress?: (category: Category) => void
}
export const CategoryTags = ({ categories, onPress }: CategoryTagsProps) => (
    <View style={styles.container}>
        {categories && categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.tagContainer} onPress={() => onPress(category)}>
                <Tag
                    title={category.name}
                    color={getColorByName(category.color)}
                    style={styles.tag} />
                {onPress &&
                    <Icon
                        source={require("../../assets/minus.png")}
                        onPress={() => onPress(category)}
                        style={styles.icon} />}
            </TouchableOpacity>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    tag: {
        marginRight: 20,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 8,
        tintColor: Colors.lightGray,
        width: 20,
        flex: 0
    }

});