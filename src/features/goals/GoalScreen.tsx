import { StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { GoalPreview } from "./GoalPreview";

export const GoalScreen = ({ route }) => {

    const { goal } = route.params;

    return (
        <ScreenContainer>
            <View style={styles.container}>
                <GoalPreview goalId={goal} key={1}></GoalPreview>
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