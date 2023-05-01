import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Tag } from "../../components/Tag";
import { Category } from "../../model/types";
import { Colors, getColorByName } from "../../util/Colors";
import { Icon } from "../../components/Icon";

type CategoryTagsProps = {
    categories: Category[],
    onPress?: (category: Category) => void,
    add?: boolean
}
export const CategoryTags = ({ categories, onPress, add = false }: CategoryTagsProps) => {

    const onClick = (category: Category) => {
        onPress && onPress(category);
    }

    return (
        <View style={styles.container}>
            {categories && categories.map((category, index) => (
                <View key={index} style={styles.z}>
                    <View style={styles.tagContainer}>
                        <Tag
                            title={category.name}
                            color={getColorByName(category.color)}
                            style={styles.tag} />
                        {onPress &&
                            <Icon
                                source={add ? require("../../assets/plus.png") : require("../../assets/minus.png")}
                                onPress={() => onClick(category)}
                                size={15}
                                style={styles.icon} />}
                    </View>
                </View>
            ))}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    tag: {
        marginRight: 20,
        marginVertical: 10,
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 25,
        tintColor: Colors.lightGray,
        flex: 0
    },
    z: {
        zIndex: 3000,
    }

});