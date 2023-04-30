import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../util/Colors";
import { ScreenHeader } from "../../components/ScreenHeader";

export const HabitsScreen = ({ navigation }) => (
    <ScreenContainer>
        <ScreenHeader title={"My Habits"} fontSize={32} navigation={navigation}></ScreenHeader>
        <View style={styles.buttons}>
            <Text style={styles.text}>HabitsScreen</Text>
        </View>
    </ScreenContainer>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});