import { Image, StyleSheet, View } from "react-native";
import { Colors } from "../util/Colors";
import { HeadingText } from "./HeadingText";
import { ProgressBar } from "./ProgressBar";
import { GText } from "./GText";

interface ProgressSectionProps {
    icon?: any,
    title: string,
    altText?: string,
    percentage: number;
    backgroundColor?: string;
    isGoal?: boolean
    width?: number,
};


export const ProgressSection = ({ icon, title, altText, percentage, backgroundColor = Colors.primary, isGoal = true, width }: ProgressSectionProps) => {

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconRow}>
                    {icon && <Image
                        source={icon}
                        resizeMode="contain"
                        style={styles.icon} />}
                    <HeadingText >{title}</HeadingText>
                </View>
                {altText && <GText italic size={12}>{altText}</GText>}
            </View>
            <View style={styles.row}>
                <ProgressBar percentage={percentage} backgroundColor={Colors.darkGray} isGoal={isGoal}></ProgressBar>
                <GText italic size={12} style={styles.altText}>{percentage + '%'}</GText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 10,
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
    },
    altText: {
        marginLeft: 10,
    }
});