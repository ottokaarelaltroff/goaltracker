import { StyleSheet, View } from "react-native";
import { GButton } from "../../components/GButton";
import { GText } from "../../components/GText";
import { HeaderText } from "../../components/HeaderText";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../util/Colors";

export const LandingScreen = ({ navigation }) => {
    return (
        <ScreenContainer>
            <View style={styles.container}>
                <HeaderText title="GoalTracker"></HeaderText>
                <GText italic style={styles.slogan}>{"Track your habits and goals like never before."}</GText>
                <GButton title={"Sign In"} onPress={() => navigation.push('SignIn')} style={styles.button} borderColor={Colors.green}></GButton>
                <GButton title={"Create Account"} onPress={() => navigation.push('CreateAccount')} style={styles.button} borderColor={Colors.lightBlue}></GButton>
            </View>
        </ScreenContainer>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        marginTop: 10,
    },
    slogan: {
        width: '60%',
        textAlign: 'center',
        marginVertical: 15,
        color: Colors.grayAlpha(0.8)
    }
});