import { StyleSheet, View } from "react-native";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native-gesture-handler";
import { GText } from "../../components/GText";
import { ScreenContainer } from "../../components/ScreenContainer";
import Spinner from "../../components/Spinner";
import { Colors } from "../../util/Colors";
import { GoalPreview } from "./GoalPreview";
import useAllGoals from "./useAllGoals";
import { Goal } from "../../model/types";
import { ScreenHeader } from "../../components/ScreenHeader";

export const AllGoalsScreen = ({ navigation }) => {

    const { allGoals, fetchAllGoals, isLoading, isError, setSelectedGoal } = useAllGoals();

    const onGoalSelect = (goal: Goal) => {
        setSelectedGoal(goal)
        navigation.push("GoalScreen", { goal: goal })
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => onGoalSelect(item)}>
                <GoalPreview goalId={item.id} key={index}></GoalPreview>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer>
            <ScreenHeader title={"My Goals"} fontSize={32} navigation={navigation}></ScreenHeader>
            <View style={styles.container} >
                {isLoading ? <Spinner style={styles.spinner} /> : null}
                {allGoals && <FlatList
                    data={allGoals}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={fetchAllGoals}
                            progressViewOffset={10}
                            tintColor={Colors.lightGray} />
                    } />}
                {isError ? <GText>{"Error loading My Goals!"}</GText> : null}
            </View>
        </ScreenContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start',
        marginVertical: 20,
    },
    spinner: {
        marginTop: 50,
    }
});