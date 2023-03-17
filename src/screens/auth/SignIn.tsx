import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../ScreenContainer";
import { Colors } from "../../util/Colors";


export const SignIn = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>SignIn</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});