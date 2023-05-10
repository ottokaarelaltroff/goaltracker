import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Bullet } from "../../components/Bullet";
import { Icon } from "../../components/Icon";
import { TextButton } from "../../components/TextButton";
import { Colors } from "../../util/Colors";
import { useHabits } from "./useHabits";
import { GText } from "../../components/GText";
import { Habit } from "../../model/types";
import useEditHabitModal from "./useEditHabitModal";

// type HabitsListProps = {
//     openEditHabitModal: (habit: Habit) => void
// }
export const HabitsList = () => {

    const { habits, fetchGoalHabits } = useHabits();
    const { EditHabitModal, openEditHabitModal, isOpened } = useEditHabitModal();

    if (habits === undefined) {
        fetchGoalHabits()
    }

    const getHabitListItems = () => {
        const checkList = []
        habits.map(item => checkList.push({
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
        openEditHabitModal(habit);
    }

    return (
        <View>
            {EditHabitModal}
            {habits !== undefined && getHabitListItems().map((item, index) => (
                <TouchableOpacity style={styles.listItem} key={index} onPress={() => openModalHandler(item.habit)}>
                    {item.icon}
                    {item.habit ?
                        <View style={styles.habit}>
                            <GText size={16} style={styles.text}>{item.habit.title}</GText>
                            <Icon source={require("../../assets/bell.png")} size={24} style={styles.bell} />
                        </View>
                        : <TextButton title={"Add new habit"} size={16} onPress={() => openModalHandler(undefined)} style={[styles.text, styles.addNewText]} />
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