import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DiaryEntry } from "../model/types";
import { Bullet } from "./Bullet";
import { GText } from "./GText";
import { Colors } from "../util/Colors";

export type OptionType<T> = {
    label: string;
    value: T | string;
};

interface DiaryListProps {
    style?: any,
    children?: any
    items: DiaryEntry[]
};

export const DiaryList = ({ items }: DiaryListProps) => {

    const getContentComponent = (content: string) => (
        <TouchableOpacity onPress={() => { }}>
            <GText italic>{content}</GText>
        </TouchableOpacity>
    );

    const getAddNewComponent = () => (
        <TouchableOpacity onPress={() => { }}>
            <GText style={styles.addNewText}>{"Add new entry"}</GText>
        </TouchableOpacity>
    );

    const getDateComponent = (date: Date) => (
        <GText style={styles.date}>{date.getUTCDate() + '. ' + date.toLocaleString('default', { month: 'long' })}</GText>
    );

    const getDiaryListItems = () => {
        const checkList = []
        items.map(item => checkList.push({
            date: getDateComponent(new Date()),
            content: getContentComponent(item.content)
        }));
        checkList.push(
            {
                date: getDateComponent(new Date()),
                content: getAddNewComponent()
            }
        )
        return checkList;
    }

    const renderItem = (item: any, index: number) => (
        <View key={index} style={styles.listItem}>
            {item.date}
            {item.content}
        </View>
    );

    return (
        <View>
            {getDiaryListItems().map((item, index) => (
                renderItem(item, index)
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    listItem: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center'
    },
    date: {
        color: Colors.grayAlpha(0.8),
        marginRight: 20
    },
    addNewText: {
        color: Colors.grayAlpha(0.8),
    }
});