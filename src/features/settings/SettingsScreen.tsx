import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../shared/ScreenContainer";
import { Colors } from "../../util/Colors";

export const SettingsScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>SettingsScreen</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});