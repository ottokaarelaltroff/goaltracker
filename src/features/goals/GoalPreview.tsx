import { Dimensions, StyleSheet, View } from "react-native";
import { GText } from "../../components/GText";
import { HeadingText } from "../../components/HeadingText";
import { ProgressBar } from "../../components/ProgressBar";
import { Colors } from "../../util/Colors";
import { GoalTags } from "./GoalTags";


const { width } = Dimensions.get("window");

export const GoalPreview = ({ goal }) => {

    const percentage = goal.currentValue / goal.targetValue * 100;

    return (<View style={styles.container}>
        <View style={styles.row}>
            <GoalTags categories={goal.categories} />
            <GText bold style={styles.currentValue}>{goal.currentValue + ' ' + goal.unit}</GText>
        </View>
        <View style={styles.row}>
            <HeadingText >{goal.title}</HeadingText>
            <GText >{"/ " + goal.targetValue + ' ' + goal.unit}</GText>
        </View>
        <View style={styles.row}>
            <ProgressBar width={width - 30} percentage={percentage}></ProgressBar>
            {/* <HeadingText >{"Buy a New Car"}</HeadingText> */}
        </View>

    </View>)
}
    ;

const styles = StyleSheet.create({
    container: {
        width: width - 20,
        height: 120,
        backgroundColor: Colors.secondary,
        borderRadius: 20,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between', alignItems: 'center',
        // borderWidth: 2
    },
    currentValue: {
        fontSize: 24
    }
});