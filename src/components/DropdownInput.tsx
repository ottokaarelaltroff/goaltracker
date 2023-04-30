import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from '../util/Colors';
import { GText } from './GText';
import { Icon } from './Icon';

type OptionType = {
  label: string;
  value: any;
};

type Props = {
  label: string;
  placeholder: string;
  options: OptionType[];
  selectedValue: OptionType | null;
  onValueChange: (value: OptionType | null) => void;
  icon?: any
};

const DropdownInput: React.FC<Props> = ({
  label,
  placeholder,
  options,
  selectedValue,
  onValueChange,
  icon
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [value, setValue] = useState(selectedValue?.label);

  const handleToggleModal = () => {
    setIsOpened(!isOpened);
  };

  const handleSelectValue = (value: OptionType) => {
    setValue(value.value)
    onValueChange(value);
    handleToggleModal();
  };

  const renderOption = (option: OptionType, index: number) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleSelectValue(option)}
      key={index}
    >
      <GText bold style={styles.optionText}>{option.label}</GText>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={[styles.container]}>
        <GText style={styles.label}>{label}</GText>
        <View style={styles.inputContainer}>
          {icon && <Icon source={icon} style={styles.icon}></Icon>}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.grayAlpha(0.3)}
            onChangeText={setValue}
            value={value}
          />
          <TouchableOpacity onPress={handleToggleModal}>
            <Icon source={require("../assets/caret-down.png")} style={styles.caret} onPress={handleToggleModal} ></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isOpened} transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={handleToggleModal}
        >
          <View style={styles.modal}>
            <ScrollView>
              {options.map((option, index) => renderOption(option, index))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

    </>
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  field: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
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
    padding: 15,
    color: Colors.light,
    borderBottomWidth: 1,
    borderColor: Colors.grayAlpha(0.3)
  },
  optionText: {
    color: Colors.light
  },
  container: {
    flex: 1,
    height: 80,
    // borderWidth: 2
    marginBottom: 15,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.secondary,
    borderRadius: 25,
  },
  input: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    color: Colors.light,
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 25,
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    color: Colors.grayAlpha(0.8)
  },

  icon: {
    tintColor: Colors.lightGray,
    marginLeft: 15,
  },
  caret: {
    tintColor: Colors.lightGray,
    width: 20,
    marginRight: 20,
    // borderWidth: 2,
  }
});
