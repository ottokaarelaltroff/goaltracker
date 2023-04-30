import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../util/Colors";
import { GText } from "./GText";

interface CollapseProps {
    title: string,
    backgroundColor?: string;
    children?: any,
    handleScroll?: any
};

export const Collapse = ({ title, backgroundColor = Colors.secondary, children, handleScroll }: CollapseProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggle = () => {
        isCollapsed && handleScroll()
        setIsCollapsed(!isCollapsed);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };

    const content = isCollapsed ? null : (
        <View style={styles.content}>
            {children}
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <TouchableOpacity onPress={handleToggle} style={styles.header} activeOpacity={1}>
                <GText bold size={18}>{title}</GText>
                <AntDesign name={isCollapsed ? 'down' : 'up'} size={24} color={Colors.lightGray} />
            </TouchableOpacity>
            {content}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'column',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.secondary
    },
    content: {
        marginTop: 15,
    },
});