import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import { Colors } from "../../util/Colors";
import LoginForm from "./LoginForm";

export const CreateAccountScreen = ({ navigation }) => (
    <ScreenContainer>
        <ScreenHeader title={"Sign Up"} fontSize={24} canGoBack={true} navigation={navigation} backgroundColor={Colors.secondary}>
        </ScreenHeader>
        <ScrollView>
            <View style={styles.container}>
                <LoginForm isRegister />
            </View>
        </ScrollView>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    header: {

        textAlign: 'center',
        marginBottom: 20
    }
});