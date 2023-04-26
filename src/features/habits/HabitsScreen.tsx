import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../util/Colors";

export const HabitsScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>HabitsScreen</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});