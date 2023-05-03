import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { GButton } from "../../components/GButton";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { Goal } from "../../model/types";
import { Colors } from "../../util/Colors";
import { GoalPreview } from "./GoalPreview";
import useAllGoals from "./useAllGoals";
import useEditGoalModal from "./useEditGoalModal";

export const AllGoalsScreen = ({ navigation }) => {

    const { allGoals, fetchAllGoals, isLoading, isError, setSelectedGoal } = useAllGoals();
    const { EditGoalModal, openModal } = useEditGoalModal({ goal: undefined, title: 'Add Goal', navigation: navigation });

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
            {EditGoalModal}
            <ScreenHeader title={"My Goals"} fontSize={32} navigation={navigation}>
                <Icon source={require("../../assets/plus.png")} light onPress={openModal} />
            </ScreenHeader>
            <View style={styles.container} >
                {isLoading ? <Spinner style={styles.spinner} /> :
                    allGoals ?
                        <View style={styles.goalList}>
                            <FlatList
                                data={allGoals}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isLoading}
                                        onRefresh={fetchAllGoals}
                                        progressViewOffset={10}
                                        tintColor={Colors.lightGray} />
                                } />
                        </View>
                        : (
                            <View style={styles.addGoalButton}>
                                <GButton title="Add your first Goal" onPress={openModal} icon={require("../../assets/plus.png")} />
                            </View>
                        )}
                {isError ? <GText>{"Error loading My Goals!"}</GText> : null}
            </View>
        </ScreenContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        marginVertical: 20,
    },
    spinner: {
        marginTop: 50,
    },
    addGoalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    goalList: {
        justifyContent: 'flex-start',
        flex: 1,
    }
});