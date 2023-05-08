import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon } from "../../components/Icon";
import { Tag } from "../../components/Tag";
import { Category } from "../../model/types";
import { Colors } from "../../util/Colors";

type CategoryTagsProps = {
    categories: Category[],
    onAction?: (category: Category) => void,
    onEdit?: (category: Category) => void,
    add?: boolean,
    wrap?: boolean,
    center?: boolean,
    limit?: number
}
export const CategoryTags = ({ categories, onAction, onEdit, add = false, wrap = true, center = false, limit }: CategoryTagsProps) => {

    const onIconClick = (category: Category) => {
        onAction && onAction(category);
    }

    const onTagClick = (category: Category) => {
        onEdit && onEdit(category);
    }

    return (
        <View style={[styles.container, { flexWrap: wrap ? 'wrap' : 'nowrap' }, { justifyContent: center ? 'center' : 'flex-start' }]}>
            {categories && categories.map((category, index) => {
                if (limit && limit < index) {
                    return null;
                } else if (limit && limit === index) {
                    return (
                        <View style={styles.tagContainer} key={index}>
                            <Tag
                                title={'+' + (categories.length - limit).toString()}
                                color={Colors.grayAlpha(0.5)}
                                style={styles.tag} />
                        </View>
                    );
                } else {
                    return (
                        <View style={styles.tagContainer} key={index}>
                            <TouchableOpacity onPress={() => onTagClick(category)}>
                                <Tag
                                    title={category.name}
                                    color={category.color}
                                    style={[styles.tag, { marginRight: onAction ? 20 : 10 }]} />
                            </TouchableOpacity>

                            {onAction &&
                                <Icon
                                    source={add ? require("../../assets/plus.png") : require("../../assets/minus.png")}
                                    onPress={() => onIconClick(category)}
                                    size={15}
                                    style={styles.icon} />}
                        </View>
                    )
                }
            })}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',

        // alignItems: 'center',
    },
    tagContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    tag: {
        marginVertical: 10,
    },
    icon: {
        position: 'absolute',
        right: 12,
        top: 25,
        tintColor: Colors.lightGray,
        flex: 0
    },

});