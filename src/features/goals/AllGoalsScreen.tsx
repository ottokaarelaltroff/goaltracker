import { StyleSheet, View } from "react-native";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native-gesture-handler";
import { GText } from "../../components/GText";
import { ScreenContainer } from "../../components/ScreenContainer";
import Spinner from "../../components/Spinner";
import { Colors } from "../../util/Colors";
import { GoalPreview } from "./GoalPreview";
import useAllGoals from "./useAllGoals";

export const AllGoalsScreen = ({ navigation }) => {

    const { allGoals, fetchAllGoals, isLoading, isError } = useAllGoals();

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => navigation.push("GoalScreen", { goal: item })}>
                <GoalPreview goalId={item.id} key={index}></GoalPreview>
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer>
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