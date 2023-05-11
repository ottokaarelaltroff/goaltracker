import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import { GText } from '../../components/GText';
import { Icon } from '../../components/Icon';
import { Input } from '../../components/Input';
import { InputBar } from '../../components/InputBar';
import useDialog from '../../context/ui/useDialog';
import useModal from '../../context/ui/useModal';
import { Habit } from '../../model/types';
import { Colors } from '../../util/Colors';
import { Collapsible } from '../../components/Collapsible';
import { DaySelection } from './DaySelection';
import { useHabits } from './useHabits';

export default function useHabitModal() {

    const {
        allHabits,
        goalHabits,
        fetchAllHabits,
        saveHabit,
        updateHabit,
        deleteHabit,
        deleteGoalHabit,
        saveGoalHabit,
        fetchGoalHabits
    } = useHabits();
    const [habit, setHabit] = useState<Habit | undefined>();
    const [title, setTitle] = useState<string | undefined>();
    const [reminderText, setReminderText] = useState<string | undefined>("just do it");
    const [isReminder, setIsReminder] = useState<boolean | undefined>(true);
    const [monday, setMonday] = useState<boolean | undefined>(false);
    const [tuesday, setTuesday] = useState<boolean | undefined>(false);
    const [wednesday, setWednesday] = useState<boolean | undefined>(false);
    const [thursday, setThursday] = useState<boolean | undefined>(false);
    const [friday, setFriday] = useState<boolean | undefined>(false);
    const [saturday, setSaturday] = useState<boolean | undefined>(false);
    const [sunday, setSunday] = useState<boolean | undefined>(false);
    const [canSelect, setCanSelect] = useState<boolean | undefined>(true);
    const [reminderTime, setReminderTime] = useState<Date | undefined>(new Date());


    if (allHabits === undefined) {
        fetchAllHabits();
    }

    if (goalHabits === undefined) {
        fetchGoalHabits();
    }

    const reset = () => {
        setTitle(undefined);
        setReminderTime(new Date());
        setMonday(false);
        setTuesday(false);
        setWednesday(false);
        setThursday(false);
        setFriday(false);
        setSaturday(false);
        setSunday(false);
    }

    const onSave = () => {
        if (habit) {
            const updatedHabit = {
                id: habit.habitId || habit.id,
                title: title,
                reminderTime: reminderTime,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
            }
            updateHabit(updatedHabit);
        } else {
            const newHabit = {
                title: title,
                reminderTime: reminderTime,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
            }
            saveHabit(newHabit);
        }
        reset();
    }

    const getDeleteHabitConfirmation = () => (
        <View style={styles.confirmationContainer}>
            <GText style={styles.confirmation}>{habit?.habitId ?
                "Are you sure you want to remove this habit from your goal?" :
                "Are you sure you want to delete this habit permanently?"}</GText>
            {habit?.habitId && <GText style={styles.confirmation}>{"PS! This will not delete the Habit entirely."}</GText>}
        </View>

    );

    const { Dialog: DeleteHabitDialog, openDialog } = useDialog(
        {
            onSave: () => {
                if (habit?.habitId) {
                    deleteGoalHabit(habit.id)
                } else {
                    deleteHabit(habit.id);
                }
                closeModal();
                reset();
            },
            content: getDeleteHabitConfirmation(),
            bottomButtons: true,
        });

    const onDelete = () => {
        openDialog()
    }


    const days = [
        { label: "Monday", value: monday, toggle: setMonday },
        { label: "Tuesday", value: tuesday, toggle: setTuesday },
        { label: "Wednesday", value: wednesday, toggle: setWednesday },
        { label: "Thursday", value: thursday, toggle: setThursday },
        { label: "Friday", value: friday, toggle: setFriday },
        { label: "Saturday", value: saturday, toggle: setSaturday },
        { label: "Sunday", value: sunday, toggle: setSunday },
    ];

    const onExistingHabitSelect = (habit: Habit) => {
        saveGoalHabit(habit);
        closeModal();
        reset();
    }

    const hasReminder = (habit: Habit) => {
        return habit.monday || habit.tuesday || habit.wednesday || habit.thursday || habit.friday || habit.saturday || habit.sunday;
    }

    const exists = (habit: Habit) => {
        return goalHabits && !!goalHabits.find((goalHabit) => goalHabit.habitId === habit.id)
    }

    const ExistingHabitsSelection = (
        <View>
            <GText bold size={24} style={styles.subHeader}>{"Choose existing:"}</GText>

            {allHabits && allHabits.map((habit, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onExistingHabitSelect(habit)}
                    disabled={exists(habit)}>
                    <InputBar style={styles.habitBar}>
                        <View style={styles.habit}>
                            <GText
                                size={18}
                                style={exists(habit) ? { color: Colors.grayAlpha(0.5) } : {}}>
                                {habit.title}
                            </GText>
                            {hasReminder(habit) &&
                                <Icon
                                    source={require("../../assets/bell.png")}
                                    size={24}
                                    style={[styles.bell, exists(habit) ? { opacity: 0.4 } : {}]} />}
                        </View>
                    </InputBar>
                </TouchableOpacity>
            ))}

            <GText bold size={24} style={styles.subHeader}>{"or create new:"}</GText>
        </View>
    );

    const editHabitForm = (
        <View style={styles.container}>
            {habit && DeleteHabitDialog}
            {!habit && allHabits && allHabits.length > 0 && canSelect && ExistingHabitsSelection}
            <Input
                label={"Name"}
                initialValue={title}
                charLimit={32}
                placeHolder={"Describe your habit"}
                onChange={setTitle} />
            <GText style={styles.label}>{"Reminder Days"}</GText>
            <DaySelection days={days} style={styles.daySelection} />
            <View style={styles.reminderLabelRow}>
                <View style={styles.reminderLabelColumn}>
                    <GText style={styles.label}>{"Reminder Time"}</GText>
                    <GText style={styles.label}>{"Notification to work on the habit"}</GText>
                </View>
                <View style={styles.toggleContainer}>
                    <Icon source={require("../../assets/bell.png")} />
                    <Switch
                        trackColor={{ false: Colors.darkGreen, true: Colors.neonGreen }}
                        thumbColor={Colors.light}
                        onValueChange={setIsReminder}
                        value={isReminder}
                    />
                </View>
            </View>

            <Collapsible isOpen={isReminder}>
                <View style={styles.row}>
                    <InputBar style={styles.timeSelection}>
                        <Icon source={require("../../assets/clock.png")} light size={24} style={styles.clock} />
                        {reminderTime && <DateTimePicker
                            value={reminderTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => setReminderTime(date)}
                            textColor={Colors.green}
                            style={{ backgroundColor: Colors.darkGray }}
                        />}
                    </InputBar>

                    <Input
                        small
                        initialValue={reminderText}
                        charLimit={16}
                        placeHolder={"Reminder Text"}
                        style={styles.reminderText}
                        onChange={setReminderText} />
                </View>
            </Collapsible>

        </View>
    )

    const isFormValid = title && title.length > 0 && title.length <= 32

    const { Modal, openModal, closeModal, isOpened } = useModal({
        headerText: habit ? "Edit Habit" : "Add Habit",
        content: editHabitForm,
        onSave: onSave,
        onDelete: habit && onDelete,
        canSave: isFormValid,
    });


    const openModalHandler = (habit?: Habit, canSelect: boolean = true) => {
        setCanSelect(canSelect);
        setHabit(habit);
        if (habit) {
            setTitle(habit.title);
            setReminderTime(new Date(habit.reminderTime || new Date()));
            setMonday(habit.monday);
            setTuesday(habit.tuesday);
            setWednesday(habit.wednesday);
            setThursday(habit.thursday);
            setFriday(habit.friday);
            setSaturday(habit.saturday);
            setSunday(habit.sunday);
        } else {
            reset();
        }
        openModal();
    }


    return {
        EditHabitModal: Modal,
        openHabitModal: openModalHandler,
        closeModal,
        isOpened
    };
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    reminderText: {
        flex: 1,
    },
    goalValue: {
        flex: 1
    },
    clock: {
        marginLeft: 5,
    },
    confirmationContainer: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
    },
    confirmation: {
        textAlign: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 15,
        marginBottom: 5,
        color: Colors.grayAlpha(0.8)
    },
    timeSelection: {
        marginRight: 10,
        flex: 0,
        height: 60,
        // minWidth: 170
    },
    reminderLabelRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    reminderLabelColumn: {
        display: 'flex',
        flex: 3
    },
    toggleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
    },
    subHeader: {
        marginBottom: 25,
        marginTop: 20,
    },
    habitBar: {
        marginBottom: 10,
    },
    habit: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bell: {
        marginLeft: 10,
    },
    daySelection: {
        marginBottom: 35,
        marginTop: 10,
    }

});