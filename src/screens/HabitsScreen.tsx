import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "./ScreenContainer";

export const HabitsScreen = ({navigation}) => (
    <ScreenContainer>
        <View>
            <Text>HabitsScreen</Text>
        </View>
    </ScreenContainer>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
    });