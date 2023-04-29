import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Collapse } from "../../components/Collapse";
import { DiaryList } from "../../components/DiaryList";
import Divider from "../../components/Divider";
import { HabitsList } from "../../components/HabitsList";
import { ProgressSection } from "../../components/ProgressSection";
import { ScreenContainer } from "../../components/ScreenContainer";
import { StepsList } from "../../components/StepsList";
import { mockData } from "../../unused/mockData";
import { Colors } from "../../util/Colors";
import { CategoryTags } from "./CategoryTags";
import { Goal } from "../../model/types";

interface Params {
    goal: Goal;
};

interface RouteProps {
    params: Params;
};

interface GoalScreenProps {
    route: RouteProps;
};

export const GoalScreen = ({ route }: GoalScreenProps) => {

    const { goal } = route.params;

    const getRemaining = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return goal.targetValue - goal.currentValue;
        }
        return 0;
    }

    const getPercentage = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return Math.round(goal.currentValue / goal.targetValue * 100);
        }
        return 0;
    }

    const getTargetDateFormatted = () => {
        if (goal.targetDate) {
            const dateString = goal.targetDate;
            const date = new Date(dateString);
            return date.toLocaleDateString("en-GB");
        }
        return '';
    }

    const getRemainingDays = () => {
        const differenceInMilliseconds = Math.abs(new Date().getMilliseconds() - new Date(goal.targetDate).getMilliseconds());
        return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }

    if (!goal || !goal.habits || !goal.steps) {
        return null;
    }

    return (
        <ScreenContainer backgroundColor={Colors.secondary}>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.categories}>
                        <CategoryTags categories={goal.categories} />
                    </View>
                    <ProgressSection
                        title={goal.currentValue + " / " + goal.targetValue + ' ' + goal.unit.name}
                        altText={getRemaining() + " " + goal.unit.name + ' to go!'}
                        icon={require("../../assets/goal.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={getPercentage()}
                    />
                    <Divider />
                    <ProgressSection
                        title={getTargetDateFormatted()}
                        altText={getRemainingDays() + ' days left!'}
                        icon={require("../../assets/calendar.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={getPercentage()}
                        isGoal={false}
                    />
                    <Divider />
                    <Collapse title={"Steps I need to take"}>
                        <StepsList items={goal.steps} />
                    </Collapse>
                    <Collapse title={"Habits I need to follow"}>
                        <HabitsList items={goal.habits} />
                    </Collapse>
                    <Collapse title={"Dear Diary..."}>
                        <DiaryList items={mockData.diaryEntries} />
                    </Collapse>
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}
    ;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginVertical: 20,
        marginHorizontal: 10,
    },
    categories: {
        alignItems: 'center',
        marginVertical: 10,
    },
});