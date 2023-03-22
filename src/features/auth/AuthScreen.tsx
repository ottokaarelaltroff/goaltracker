import { Button, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../shared/ScreenContainer";
import { Colors } from "../../util/Colors";

export const AuthScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>Welcome to GoalTracker</Text>
            <Button title={"Sign In"} onPress={() => navigation.push('SignIn')}></Button>
            <Button title={"Create Account"} onPress={() => navigation.push('CreateAccount')}></Button>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});