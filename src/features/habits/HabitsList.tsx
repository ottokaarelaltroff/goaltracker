import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Bullet } from "../../components/Bullet";
import { Icon } from "../../components/Icon";
import { TextButton } from "../../components/TextButton";
import { Colors } from "../../util/Colors";
import { useHabits } from "./useHabits";
import { GText } from "../../components/GText";
import { Habit } from "../../model/types";

type HabitsListProps = {
    openModal: (habit: Habit) => void
}
export const HabitsList = ({ openModal }: HabitsListProps) => {

    const { goalHabits, fetchGoalHabits } = useHabits();

    if (goalHabits === undefined) {
        fetchGoalHabits()
    }

    const getHabitListItems = () => {
        const checkList = []
        goalHabits.map(item => checkList.push({
            icon: <Bullet />,
            habit: item
        }));
        checkList.push(
            {
                icon: <Bullet />,
                habit: undefined
            }
        )
        return checkList;
    }

    const openModalHandler = (habit: Habit) => {
        openModal(habit);
    }

    const hasReminder = (habit: Habit) => {
        return habit.monday || habit.tuesday || habit.wednesday || habit.thursday || habit.friday || habit.saturday || habit.sunday;
    }

    return (
        <View>
            {goalHabits !== undefined && getHabitListItems().map((item, index) => (
                <TouchableOpacity style={styles.listItem} key={index} onPress={() => openModalHandler(item.habit)}>
                    {item.icon}
                    {item.habit ?
                        <View style={styles.habit}>
                            <GText size={16} style={styles.text}>{item.habit.title}</GText>
                            {hasReminder(item.habit) && <Icon source={require("../../assets/bell.png")} size={24} style={styles.bell} />}
                        </View>
                        : (<TextButton
                            title={"Add new habit"}
                            size={16}
                            onPress={() => openModalHandler(undefined)}
                            style={[styles.text, styles.addNewText]} />)
                    }
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({

    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    },
    addNewText: {
        color: Colors.grayAlpha(0.5),
    },
    habit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bell: {
        marginLeft: 10,
    },
});