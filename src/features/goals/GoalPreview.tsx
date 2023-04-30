import { StyleSheet, View } from "react-native";
import { GText } from "../../components/GText";
import { HeadingText } from "../../components/HeadingText";
import { ProgressBar } from "../../components/ProgressBar";
import { Colors } from "../../util/Colors";
import { CategoryTags } from "./CategoryTags";
import useGoal from "./useGoal";

type GoalPreviewProps = {
    goalId: string;
};

export const GoalPreview = ({ goalId }: GoalPreviewProps) => {

    const { goal } = useGoal(goalId);

    const getPercentage = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return goal.currentValue / goal.targetValue * 100;
        }
        return 0;
    }

    if (!goal) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <CategoryTags categories={goal.categories} />
                <GText bold style={styles.currentValue}>{goal.currentValue + ' ' + goal.unit.name}</GText>
            </View>
            <View style={styles.row}>
                <HeadingText >{goal.title}</HeadingText>
                <GText >{"/ " + goal.targetValue + ' ' + goal.unit.name}</GText>
            </View>
            <View style={styles.row}>
                <ProgressBar percentage={getPercentage()}></ProgressBar>
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
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 2
    },
    currentValue: {
        fontSize: 24
    }
});