import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface ProgressBarProps {
    percentage: number;
    backgroundColor?: string;
    isGoal?: boolean
};


export const ProgressBar = ({ percentage, backgroundColor = Colors.primary, isGoal = true }: ProgressBarProps) => {

    const fillColor = percentage > 50 ? isGoal ? Colors.green : Colors.lightRed : isGoal ? Colors.orange : Colors.lightBlue;

    const barStyle = () => ({
        backgroundColor: backgroundColor,

    })

    const fillStyle = () => ({
        flex: percentage > 0 ? percentage / 100 : 0,
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    bar: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        height: 12,
        backgroundColor: Colors.primary,
        borderRadius: 5
    },
});