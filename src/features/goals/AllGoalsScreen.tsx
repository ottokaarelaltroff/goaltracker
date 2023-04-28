import { StyleSheet, View } from "react-native";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native-gesture-handler";
import { GText } from "../../components/GText";
import useAllGoals from "./useAllGoals";
import { ScreenContainer } from "../../components/ScreenContainer";
import { GoalPreview } from "./GoalPreview";
import useStorage from "../../storage/useStorage";

export const AllGoalsScreen = ({ navigation }) => {

    const { allGoals, fetchAllGoals, isLoading, isError } = useAllGoals();
    const { getItem } = useStorage();

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.push("GoalScreen", { goal: item })}>
                <GoalPreview goalId={item.id} key={index}></GoalPreview>
            </TouchableOpacity>
        );
    };

    const token = async () => {
        const tok = await getItem('token')
        console.log("OTTO token", tok)
    }

    token()
    return (
        <ScreenContainer>
            <View style={styles.container} >
                {allGoals && <FlatList
                    data={allGoals}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={fetchAllGoals} />
                    } />}
                {isLoading ? <GText>{"Loading..."}</GText> : null}
                {isError ? <GText>{"Error loading My Goals!"}</GText> : null}
            </View>
        </ScreenContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start'
    },
});