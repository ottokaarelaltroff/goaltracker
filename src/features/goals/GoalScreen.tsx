import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CollapsibleDropdown } from "../../components/CollapsibleDropdown";
import Divider from "../../components/Divider";
import { ProgressSection } from "../../components/ProgressSection";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { TextButton } from "../../components/TextButton";
import { Goal } from "../../model/types";
import { Colors } from "../../util/Colors";
import { getRemainingDays, getTargetDateFormatted } from "../../util/Util";
import { CategoryTags } from "../categories/CategoryTags";
import { useCategories } from "../categories/useCategories";
import useEditCategoryDialog from "../categories/useEditCategoryDialog";
import { HabitsList } from "../habits/HabitsList";
import useHabitModal from "../habits/useHabitModal";
import { StepsList } from "../steps/StepsList";
import useAllGoals from "./useAllGoals";
import useGoal from "./useGoal";
import useGoalModal from "./useGoalModal";

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

export const GoalScreen = ({ navigation }: GoalScreenProps) => {

    const { selectedGoal, setSelectedGoal } = useAllGoals();
    const { goal, setGoalData } = useGoal(selectedGoal?.id);
    const { goalCategories } = useCategories(selectedGoal?.id);
    const { EditCategoryDialog, openEditDialog } = useEditCategoryDialog({ goalId: selectedGoal?.id });
    const scrollViewRef = useRef<ScrollView>(null);
    const { EditHabitModal, openHabitModal } = useHabitModal();
    const { GoalModal: EditGoalModal, openModal } = useGoalModal({ goal: goal, navigation: navigation });

    const handleScrollTo = () => {
        if (scrollViewRef.current) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            scrollViewRef.current.scrollTo({ y: 1000, animated: true });
        }
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                // setTimeout(() => {
                //     setSelectedGoal(undefined);
                // }, 500)
            });
            return unsubscribe;
        }, [navigation])
    );

    const getRemainingValueText = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            const remainingValue = goal.targetValue - goal.currentValue;
            if (remainingValue > 0) {
                return remainingValue + " " + goal.unit.name + ' to go!';
            } else {
                return Math.abs(remainingValue) + " " + goal.unit.name + ' over!';
            }
        }
        return '';
    }

    const getRemainingDaysText = () => {
        if (goal && goal.targetDate) {
            const remainingDays = getRemainingDays(goal.targetDate);
            if (remainingDays >= 0) {
                return remainingDays + ' days left!';
            } else {
                return Math.abs(remainingDays) + ' days overdue!';
            }
        }
        return '';
    }

    const getValueCompletionPercentage = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return Math.round(goal.currentValue / goal.targetValue * 100);
        }
        return 0;
    }

    const getDateCompletionPercentage = () => {
        if (goal && goal.targetDate && goal.createdAt) {
            const daysSinceCreated = Math.abs(getRemainingDays(goal.createdAt));
            const daysRemaining = getRemainingDays(goal.targetDate);
            if (daysRemaining <= 0) {
                return 100;
            }
            return Math.round(daysSinceCreated / (daysSinceCreated + daysRemaining) * 100);
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
            {EditCategoryDialog}
            {EditHabitModal}
            <ScrollView ref={scrollViewRef}>
                <View style={styles.container}>
                    <View style={styles.categories}>
                        <CategoryTags categories={goalCategories} center onEdit={(category) => openEditDialog(category)} />
                    </View>
                    <ProgressSection
                        title={goal.currentValue + " / " + goal.targetValue + ' ' + goal.unit.name}
                        altText={getRemainingValueText()}
                        icon={require("../../assets/goal.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={getValueCompletionPercentage()}
                    />
                    <Divider />
                    <ProgressSection
                        title={getTargetDateFormatted(goal?.targetDate)}
                        altText={getRemainingDaysText()}
                        icon={require("../../assets/calendar.png")}
                        backgroundColor={Colors.darkGray}
                        percentage={getDateCompletionPercentage()}
                        isGoal={false}
                    />
                    <Divider />
                    <CollapsibleDropdown title={"Steps I need to take"} handleScroll={handleScrollTo}>
                        <StepsList />
                    </CollapsibleDropdown>
                    <CollapsibleDropdown title={"Habits I need to follow"} handleScroll={handleScrollTo}>
                        <HabitsList openModal={openHabitModal} />
                    </CollapsibleDropdown>
                    {/* <CollapsibleDropdown title={"Dear Diary..."} handleScroll={handleScrollTo}>
                        <DiaryList items={mockData.diaryEntries} />
                    </CollapsibleDropdown> */}
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20
    },
});