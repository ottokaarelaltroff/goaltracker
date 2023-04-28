import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface ProgressBarProps {
    width: number,
    percentage: number;
    backgroundColor?: string;
    isGoal?: boolean
};


export const ProgressBar = ({ width, percentage, backgroundColor = Colors.primary, isGoal = true }: ProgressBarProps) => {

    const fillColor = percentage > 50 ? isGoal ? Colors.green : Colors.lightRed : isGoal ? Colors.orange : Colors.lightBlue;

    const barStyle = () => ({
        width: width,
        backgroundColor: backgroundColor,
    })

    const fillWidth = () => (
        percentage > 0 ? percentage / 100 * width : 0
    )

    const fillStyle = () => ({
        width: fillWidth(),
        backgroundColor: fillColor,
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