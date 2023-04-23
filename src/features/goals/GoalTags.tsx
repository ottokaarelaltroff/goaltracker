import { StyleSheet, View } from "react-native";
import { Tag } from "../../components/Tag";

export const GoalTags = ({ categories }) => (
    <View style={styles.container}>
        {categories && categories.map((category, index) => (
            <Tag title={category.title} color={category.color} key={index}></Tag>
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },

});