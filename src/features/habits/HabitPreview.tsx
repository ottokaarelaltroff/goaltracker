import { StyleSheet, View } from "react-native";
import { GText } from "../../components/GText";
import { HeadingText } from "../../components/HeadingText";
import { Icon } from "../../components/Icon";
import { Habit } from "../../model/types";
import { Colors } from "../../util/Colors";
import { DaySelection } from "./DaySelection";

type HabitPreviewProps = {
    habit: Habit;
};

export const HabitPreview = ({ habit }: HabitPreviewProps) => {

    if (!habit) {
        return null;
    }

    const days = [
        { label: "Monday", value: habit.monday },
        { label: "Tuesday", value: habit.tuesday },
        { label: "Wednesday", value: habit.wednesday },
        { label: "Thursday", value: habit.thursday },
        { label: "Friday", value: habit.friday },
        { label: "Saturday", value: habit.saturday },
        { label: "Sunday", value: habit.sunday },
    ];

    const getFrequency = () => {
        const frequency = days.filter(day => day.value).length;
        switch (frequency) {
            case 7:
                return "Every Day"
            case 1:
                return "Once a week"
            case 0:
                return "Never"
            default:
                return frequency + " times a week"
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <View style={styles.title}>
                    <HeadingText >{habit.title}</HeadingText>
                    <Icon
                        source={require("../../assets/bell.png")}
                        size={24}
                        style={styles.bell} />
                </View>

                <GText italic style={styles.frequency}>{getFrequency()}</GText>
            </View>
            <View style={styles.secondRow}>
                <DaySelection days={days} disabled />
            </View>
        </View>)
}
    ;

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        marginBottom: 20,
        marginHorizontal: 12,
        paddingHorizontal: 15,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'column'
    },
    firstRow: {
        display: 'flex',
        flexDirection: 'row',
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    secondRow: {
        flex: 3,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    currentValue: {
        fontSize: 24
    },
    frequency: {
        color: Colors.grayAlpha(1)
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
    },
    bell: {
        marginLeft: 10,
    },
});