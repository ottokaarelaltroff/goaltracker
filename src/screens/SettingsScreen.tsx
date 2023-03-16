import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "./ScreenContainer";

export const SettingsScreen = ({navigation}) => (
    <ScreenContainer>
        <View>
            <Text>SettingsScreen</Text>
        </View>
    </ScreenContainer>
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
    });