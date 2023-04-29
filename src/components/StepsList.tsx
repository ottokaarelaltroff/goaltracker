import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Step } from "../model/types";
import { CheckMark } from "./CheckMark";
import { GText } from "./GText";

interface StepsListProps {
    style?: any,
    children?: any
    items: Step[]
};

export const StepsList = ({ items }: StepsListProps) => {

    const getCheckListItems = () => {
        const checkList = []
        items.map(item => checkList.push({
            icon: <CheckMark isChecked={item.isCompleted} />,
            step: item
        }));
        return checkList;
    }

    return (
        <View>
            {getCheckListItems().map((item, index) => (
                <TouchableOpacity onPress={() => { }} key={index}>
                    <View style={styles.listItem}>
                        {item.icon}
                        <GText style={styles.text}>{item.step.title}</GText>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    text: {
        marginLeft: 10,
    }
});