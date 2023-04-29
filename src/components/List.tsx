import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

interface ListProps {
    style?: any,
    items: any[],
    renderItem: ({ item, index }: {
        item: any;
        index: any;
    }) => JSX.Element
};


export const List = ({ style, items, renderItem }: ListProps) => {

    return (
        <View style={[styles.container, style]}>
            {items && <FlatList
                data={items}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
            />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },


});