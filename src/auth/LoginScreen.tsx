import { StyleSheet, Text, TextInput, View } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";
import LoginForm from "./LoginForm";

export const LoginScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>SignIn</Text>
            <LoginForm />
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});