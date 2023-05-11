import { useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { OptionType } from "../../components/DropdownInput";
import { GText } from "../../components/GText";
import { Icon } from "../../components/Icon";
import { Colors } from "../../util/Colors";

export const LanguageSelector = () => {

    const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>("ENG");
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [value, setValue] = useState<OptionType<string>>({ label: selectedLanguage, value: selectedLanguage });

    const options = [
        { label: "ENG", value: "ENG" },
        { label: "EST", value: "EST" },
        { label: "RU", value: "RU" },
    ];

    const toggleModal = () => {
        setIsOpened(!isOpened);
    };

    const handleSelectValue = (option: OptionType<string>) => {
        setValue(option)
        setSelectedLanguage(option.value)
        toggleModal();
    };

    const renderOption = (option: OptionType<string>, index: number) => (
        <View style={styles.optionContainer} key={index}>
            <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelectValue(option)}
            >
                <GText bold style={styles.optionText}>{option.label}</GText>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchable} onPress={toggleModal}>
                <GText size={16} style={styles.selectedLanguage}>{selectedLanguage}</GText>
                <Icon source={require("../../assets/caret-down.png")} light size={24} />
            </TouchableOpacity>
            <Modal visible={isOpened} transparent={true}>
                <TouchableOpacity
                    style={styles.modalBackground}
                    onPress={toggleModal}>
                    <View style={styles.modal}>
                        <ScrollView>
                            {options.map((option, index) => renderOption(option, index))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    touchable: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedLanguage: {
        marginRight: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blackAlpha(0.5)
    },
    modal: {
        width: '80%',
        maxHeight: '80%',
        flex: 0,
        backgroundColor: Colors.secondary,
        borderRadius: 25,
        padding: 10,
    },
    option: {
        flex: 1,
        padding: 15,
        color: Colors.light,
    },
    optionText: {
        color: Colors.light
    },
    optionContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 1,
        borderColor: Colors.grayAlpha(0.3)
    },
});