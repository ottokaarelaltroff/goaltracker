import { StyleSheet, Text, TextInput, View, Button, Image, Touchable, Insets, Dimensions } from "react-native";
import { ScreenContainer } from "../shared/ScreenContainer";
import { Colors } from "../util/Colors";
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ProgressBarProps {
    width: number,
    percentage: number;
};


export const ProgressBar = ({ width, percentage }: ProgressBarProps) => {

    const color = percentage > 50 ? Colors.green : Colors.orange;

    const barStyle = () => ({
        width: width - 20,
    })

    const fillStyle = () => ({
        width: percentage / 100 * width - 20,
        backgroundColor: color,
    })
    return (
        <View style={styles.container}>
            <View style={[styles.bar, barStyle()]}>
                <View style={[styles.bar, fillStyle()]}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bar: {
        height: 12,
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
});