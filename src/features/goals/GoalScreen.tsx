import { Dimensions, Image, StyleSheet, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { GoalPreview } from "./GoalPreview";
import { CategoryTags } from "./CategoryTags";
import { GText } from "../../components/GText";
import { HeadingText } from "../../components/HeadingText";
import { ProgressBar } from "../../components/ProgressBar";
import { Colors } from "../../util/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Divider from "../../components/Divider";
import { Goal } from "../../model/types";

const { width } = Dimensions.get("window");

export const GoalScreen = ({ route }) => {

    const { goal } = route.params;

    const getRemaining = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return goal.targetValue - goal.currentValue;
        }
        return 0;
    }

    const getPercentage = () => {
        if (goal && goal.currentValue && goal.targetValue) {
            return Math.round(goal.currentValue / goal.targetValue * 100);
        }
        return 0;
    }

    const getTargetDateFormatted = () => {
        if (goal.targetDate) {
            const dateString = goal.targetDate;
            const date = new Date(dateString);
            return date.toLocaleDateString("en-GB");
        }
        return '';
    }

    const getRemainingDays = () => {
        const differenceInMilliseconds = Math.abs(new Date().getMilliseconds() - new Date(goal.targetDate).getMilliseconds());
        return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    }

    if (!goal) {
        return null;
    }

    return (
        <ScreenContainer backgroundColor={Colors.secondary}>
            <ScrollView >
                <View style={styles.container}>
                    <View style={styles.categories}>
                        <CategoryTags categories={goal.categories} />
                    </View>
                    <View style={styles.row}>
                        <View style={styles.iconRow}>
                            <Image
                                source={require("../../assets/goal.png")}
                                resizeMode="contain"
                                style={styles.icon} />
                            <HeadingText >{goal.currentValue + " / " + goal.targetValue + ' ' + goal.unit.name}</HeadingText>
                        </View>

                        <GText italic size={12}>{getRemaining() + " " + goal.unit.name + ' to go!'}</GText>
                    </View>
                    <View style={styles.row}>
                        <ProgressBar width={width - 110} percentage={getPercentage()} backgroundColor={Colors.darkGray}></ProgressBar>
                        <GText italic size={12}>{getPercentage() + '%'}</GText>
                    </View>
                    <Divider />
                    <View style={styles.row}>
                        <View style={styles.iconRow}>
                            <Image
                                source={require("../../assets/calendar.png")}
                                resizeMode="contain"
                                style={styles.icon} />
                            <HeadingText >{getTargetDateFormatted()}</HeadingText>
                        </View>
                        <GText italic size={12}>{getRemainingDays() + ' days left!'}</GText>
                    </View>
                    <View style={styles.row}>
                        <ProgressBar width={width - 110} percentage={getPercentage()} backgroundColor={Colors.darkGray} isGoal={false}></ProgressBar>
                        <GText italic size={12}>{getPercentage() + '%'}</GText>
                    </View>
                    <Divider />
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}
    ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between', alignItems: 'center',
        // borderWidth: 2
        marginBottom: 10,
    },
    currentValue: {
        fontSize: 24
    },
    categories: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: Colors.lightGray,
    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    }
});