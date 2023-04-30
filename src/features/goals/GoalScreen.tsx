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

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export const GoalScreen = ({ route, navigation }: GoalScreenProps) => {

    // const { goal } = route.params;
    const { selectedGoal, setSelectedGoal } = useAllGoals();
    const { goal, setGoalData } = useGoal(selectedGoal?.id);
    const scrollViewRef = useRef<ScrollView>(null);

    const { EditGoalModal, openModal } = useEditGoalModal({ goal: goal });

    const handleScrollTo = () => {
        if (scrollViewRef.current) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            scrollViewRef.current.scrollTo({ y: 1000, animated: true });
        }
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('blur', () => {
                console.log('GoalScreen is exited');
                setSelectedGoal(undefined);
            });
            return unsubscribe;
        }, [navigation])
    );

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
                    {/* <GButton title={'Edit'} onPress={openModal}></GButton> */}
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
        marginTop: 10,
        marginBottom: 20,
    },
});