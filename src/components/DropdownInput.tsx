import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from '../util/Colors';
import { GText } from './GText';
import { Icon } from './Icon';
import { Step, Unit } from '../model/types';

export type OptionType<T> = {
  label: string;
  value: T | string;
};

type AllowedDropDownType = Unit | Step;

type Props<T> = {
  label: string;
  placeholder: string;
  options: OptionType<T>[];
  selectedValue: OptionType<T> | undefined;
  onValueChange: (value: OptionType<T> | undefined) => void;
  icon?: any
};

const DropdownInput = <T extends any>({ label, placeholder, options, selectedValue, onValueChange, icon }: Props<T>) => {

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [value, setValue] = useState<OptionType<T>>(selectedValue);

  const toggleModal = () => {
    setIsOpened(!isOpened);
  };

  const handleSelectValue = (value: OptionType<T>) => {
    setValue(value)
    onValueChange(value);
    toggleModal();
  };

  const onChangeText = (text: string) => {
    const newOption = { label: text, value: text }
    setValue(newOption)
    onValueChange(newOption);
  }

  const renderOption = (option: OptionType<T>, index: number) => (
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
            onChangeText={onChangeText}
            value={value?.label}
          />
          <TouchableOpacity onPress={toggleModal}>
            <Icon source={require("../assets/caret-down.png")} style={styles.caret} onPress={toggleModal} ></Icon>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isOpened} transparent={true}>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={toggleModal}
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
  }
});
