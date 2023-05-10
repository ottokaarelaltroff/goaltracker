import { useEffect, useState } from "react";
import { LayoutAnimation, View } from "react-native";

interface CollapseProps {
    isOpen: boolean,
    children?: any,
};

export const Collapsible = ({ isOpen, children }: CollapseProps) => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleToggle = () => {
        setIsCollapsed(!isOpen);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    };


    useEffect(() => {
        handleToggle()
    }, [isOpen])

    return (
        <View>
            {!isCollapsed && children}
        </View>
    );
};

