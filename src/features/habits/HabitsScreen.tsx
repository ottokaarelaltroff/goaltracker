import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native";
import { GButton } from "../../components/GButton";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import Spinner from "../../components/Spinner";
import { Colors } from "../../util/Colors";
import { HabitPreview } from "./HabitPreview";
import useHabitModal from "./useHabitModal";
import { useHabits } from "./useHabits";

export const HabitsScreen = ({ navigation }) => {

    const { allHabits, isLoadingAllHabits, fetchAllHabits, isErrorAllHabits } = useHabits();
    const { EditHabitModal, openEditHabitModal } = useHabitModal();

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => openEditHabitModal(item)}>
                <HabitPreview habit={item} key={index} />
            </TouchableOpacity>
        );
    };

    return (
        <ScreenContainer>
            {EditHabitModal}
            <ScreenHeader title={"My Habits"} fontSize={32} navigation={navigation}>
                <Icon
                    light
                    source={require("../../assets/plus.png")}
                    onPress={() => openEditHabitModal(undefined, false)} />
            </ScreenHeader>
            <View style={styles.container} >
                {isLoadingAllHabits ? <Spinner style={styles.spinner} /> :
                    allHabits ?
                        <View style={styles.habitList}>
                            <FlatList
                                data={allHabits}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isLoadingAllHabits}
                                        onRefresh={fetchAllHabits}
                                        progressViewOffset={10}
                                        tintColor={Colors.lightGray} />
                                } />
                        </View>
                        : (
                            <View style={styles.addGoalButton}>
                                <GButton title="Add your first Habit" onPress={() => { }} icon={require("../../assets/plus.png")} />
                            </View>
                        )}
                {isErrorAllHabits ? <GText>{"Error loading My Goals!"}</GText> : null}
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
    addGoalButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        marginTop: 50,
    },
    habitList: {
        justifyContent: 'flex-start',
        flex: 1,
    },
});