import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";


export const CreateAccountScreen = ({ navigation }) => (
    <ScreenContainer>
        <View>
            <Text style={styles.text}>CreateAccount</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
});