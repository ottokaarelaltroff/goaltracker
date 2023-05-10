import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Habit } from "../../model/types";
import { Bullet } from "../../components/Bullet";
import { GText } from "../../components/GText";

interface HabitsListProps {
    style?: any,
    children?: any
    items: Habit[]
};

export const HabitsList = ({ items }: HabitsListProps) => {

    const getHabitListItems = () => {
        const checkList = []
        items.map(item => checkList.push({
            icon: <Bullet />,
            habit: item
        }));
        return checkList;
    }

    return (
        <View>
            {items && getHabitListItems().map((item, index) => (
                <TouchableOpacity onPress={() => { }} key={index}>
                    <View style={styles.listItem}>
                        {item.icon}
                        <GText style={styles.text}>{item.habit.title}</GText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    }
});