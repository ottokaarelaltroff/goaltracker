import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { LayoutAnimation, StyleSheet, UIManager, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Collapse } from "../../components/Collapse";
import { DiaryList } from "../../components/DiaryList";
import Divider from "../../components/Divider";
import { HabitsList } from "../../components/HabitsList";
import { ProgressSection } from "../../components/ProgressSection";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { StepsList } from "../../components/StepsList";
import { TextButton } from "../../components/TextButton";
import { Goal } from "../../model/types";
import { mockData } from "../../unused/mockData";
import { Colors } from "../../util/Colors";
import { CategoryTags } from "./CategoryTags";
import useAllGoals from "./useAllGoals";
import useEditGoalModal from "./useEditGoalModal";
import useGoal from "./useGoal";
import { getRemainingDays, getTargetDateFormatted } from "../../util/Util";
import { useCategories } from "./useCategories";

interface Params {
    goal: Goal;
};

interface RouteProps {
    params: Params;
};

interface GoalScreenProps {
    route: RouteProps;
    navigation: any
};

// UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const GoalScreen = ({ navigation }: GoalScreenProps) => {

    const { selectedGoal, setSelectedGoal } = useAllGoals();
    const { goal, setGoalData } = useGoal(selectedGoal?.id);
    const { goalCategories } = useCategories(selectedGoal?.id);
    const scrollViewRef = useRef<ScrollView>(null);

    const { EditGoalModal, openModal } = useEditGoalModal({ goal: goal, title: 'Edit Goal' });

    const handleScrollTo = () => {
        if (scrollViewRef.current) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            scrollViewRef.current.scrollTo({ y: 1000, animated: true });
        }
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                // setSelectedGoal(undefined);
            });
            return unsubscribe;
        }, [navigation])
    );

    const getRemainingValue = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return goal.targetValue - goal.currentValue;
        }
        return 0;
    }

    const getCompletionPercentage = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return Math.round(goal.currentValue / goal.targetValue * 100);
        }
        return 0;
    }

    if (!goal) {
        return <Spinner />;
    }

    if (!goal.habits || !goal.steps) {
        setGoalData();
    }

    return (
        <ScreenContainer backgroundColor={Colors.secondary}>
            <ScreenHeader title={goal?.title} fontSize={24} canGoBack={true} navigation={navigation}>
                <TextButton title={"Edit"} onPress={openModal}></TextButton>
            </ScreenHeader>
            {EditGoalModal}
            <ScrollView ref={scrollViewRef}>
                <View style={styles.container}>
                    <View style={styles.categories}>
                        <CategoryTags categories={goalCategories} />
                    </View>
                    <ProgressSection
                        title={goal.currentValue + " / " + goal.targetValue + ' ' + goal.unit.name}
                        altText={getRemainingValue() + " " + goal.unit.name + ' to go!'}
                        icon={require("../../assets/goal.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={getCompletionPercentage()}
                    />
                    <Divider />
                    <ProgressSection
                        title={getTargetDateFormatted(goal?.targetDate)}
                        altText={getRemainingDays(goal.targetDate) + ' days left!'}
                        icon={require("../../assets/calendar.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={34}
                        isGoal={false}
                    />
                    <Divider />
                    <Collapse title={"Steps I need to take"} handleScroll={handleScrollTo}>
                        <StepsList items={goal.steps} />
                    </Collapse>
                    <Collapse title={"Habits I need to follow"} handleScroll={handleScrollTo}>
                        <HabitsList items={goal.habits} />
                    </Collapse>
                    <Collapse title={"Dear Diary..."} handleScroll={handleScrollTo}>
                        <DiaryList items={mockData.diaryEntries} />
                    </Collapse>
                </View>
            </ScrollView>
        </ScreenContainer>
    )
};

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
        marginBottom: 10,
    },
});