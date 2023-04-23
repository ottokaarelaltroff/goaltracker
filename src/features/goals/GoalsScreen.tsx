import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../shared/ScreenContainer";
import { Colors } from "../../util/Colors";
import { GoalPreview } from "./GoalPreview";
import { mockGoals } from "./mockData";

export const GoalsScreen = ({ navigation }) => (
    <ScreenContainer>
        <View style={styles.container}>
            {mockGoals && mockGoals.map((goal, index) => (
                <GoalPreview goal={goal} key={index}></GoalPreview>
            ))}
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-start'
    },
});