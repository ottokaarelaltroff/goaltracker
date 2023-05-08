import React, { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from '../util/Colors';
import { GText } from './GText';
import { Icon } from './Icon';
import { Step, Unit } from '../model/types';

export type OptionType<T> = {
  label: string;
  value: T;
};

type AllowedDropDownType = Unit | Step;

type Props<T> = {
  label: string;
  placeholder: string;
  options: OptionType<T>[];
  selectedValue: OptionType<T> | undefined;
  onValueChange: (value: OptionType<T> | undefined) => void;
  onDelete?: (value: OptionType<T> | undefined) => void;
  onAdd?: () => void;
  icon?: any
};

const DropdownInput = <T extends AllowedDropDownType>({ label, placeholder, options, selectedValue, onValueChange, onAdd, onDelete, icon }: Props<T>) => {

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

  const renderOption = (option: OptionType<T>, index: number) => (
    <View style={styles.optionContainer} key={index}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => handleSelectValue(option)}
      >
        <GText bold style={styles.optionText}>{option.label}</GText>
      </TouchableOpacity>
      <Icon source={require("../assets/delete.png")} size={24} onPress={() => onDelete(option)} />
    </View>

  );

  return (
    <>
      <View style={[styles.container]}>
        <GText style={styles.label}>{label}</GText>
        <View style={styles.touchableContainer}>
          {icon && <Icon source={icon} style={styles.icon}></Icon>}
          <TouchableOpacity onPress={toggleModal} style={styles.touchable}>
            <GText style={styles.unitValue} bold size={18}>
              {value?.label}
            </GText>
            <View style={styles.caret} >
              <Icon source={require("../assets/caret-down.png")} size={24} light onPress={toggleModal} ></Icon>
            </View>

          </TouchableOpacity>
          <View style={styles.plusIcon}>
            <Icon source={require("../assets/plus.png")} light size={24} onPress={onAdd} />
          </View>
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
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
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
  touchableContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  unitValue: {
    flex: 8,
    color: Colors.light,
    paddingLeft: 15,
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
    flex: 1,
  },
  plusIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    marginRight: 5,
  },
  touchable: {
    flex: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }

});
