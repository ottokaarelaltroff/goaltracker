import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GText } from "../../components/GText";
import { Colors } from "../../util/Colors";

interface DayOption {
    label: string,
    value: boolean,
    toggle?: (value: boolean) => void
}
interface DaySelectionProps {
    days?: DayOption[],
    style?: any,
};

export const DaySelection = ({ style, days, }: DaySelectionProps) => {

    return (
        <View style={[style, styles.container]}>
            {days.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.day, { backgroundColor: option.value ? Colors.darkYellow : Colors.darkGray }]}
                    onPress={() => option.toggle(!option.value)}>
                    <GText bold size={20} style={styles.text}>{option.label.substring(0, 2)}</GText>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    day: {
        width: 45,
        height: 50,
        borderRadius: 12,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
        marginTop: 10,
    },
    text: {
        color: Colors.white
    }



});