import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DiaryEntry } from "../model/types";
import { Bullet } from "./Bullet";
import { GText } from "./GText";

interface DiaryListProps {
    style?: any,
    children?: any
    items: DiaryEntry[]
};

export const DiaryList = ({ items }: DiaryListProps) => {

    const getDiaryListItems = () => {
        const checkList = []
        items.map(item => checkList.push({
            icon: <Bullet />,
            diaryEntry: item
        }));
        return checkList;
    }

    return (
        <View>
            {getDiaryListItems().map((item, index) => (
                <TouchableOpacity onPress={() => { }} key={index}>
                    <View style={styles.listItem}>
                        {item.icon}
                        <GText style={styles.text}>{item.diaryEntry.content}</GText>
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