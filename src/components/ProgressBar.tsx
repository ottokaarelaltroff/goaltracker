import { StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";

interface ProgressBarProps {
    width: number,
    percentage: number;
};


export const ProgressBar = ({ width, percentage }: ProgressBarProps) => {

    const color = percentage > 50 ? Colors.green : Colors.orange;

    const barStyle = () => ({
        width: width,
    })

    const fillWidth = () => (
        percentage > 0 ? percentage / 100 * width : 0
    )

    const fillStyle = () => ({
        width: fillWidth(),
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