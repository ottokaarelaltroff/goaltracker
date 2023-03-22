import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../shared/ScreenContainer";
import { Colors } from "../../util/Colors";

export const GoalsScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>GoalScreen</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});