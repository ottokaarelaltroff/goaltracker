import { useMutation } from '@tanstack/react-query';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Habit } from '../../model/types';
import useAllGoals from '../goals/useAllGoals';


export const useHabits = () => {
    const { selectedGoal } = useAllGoals();

    // FIND ALL GOALHABITS
    const { data: goalHabits, refetch: refetchGoalHabits, isLoading, isError } = useAppQuery(['goalHabits', selectedGoal?.id], {
        queryFn: () => api.findGoalHabits(selectedGoal.id) as Promise<Habit[]>,
        enabled: false,
    });

    const fetchGoalHabits = () => {
        selectedGoal?.id && refetchGoalHabits();
    };

    // FIND ALL HABITS
    const { data: allHabits, refetch: refetchAllHabits, isLoading: isLoadingAllHabits, isError: isErrorAllHabits } = useAppQuery(['allHabits', selectedGoal?.id], {
        queryFn: () => api.findAllHabits() as Promise<Habit[]>,
    });

    const fetchAllHabits = () => {
        refetchAllHabits();
    };


    // SAVE GOAL HABIT
    const fetchSaveGoalHabit = async (habit: Habit) => {
        const goalHabit = {
            goalId: selectedGoal.id,
            habitId: habit.id
        }
        return await api.saveGoalHabit(goalHabit);
    }

    const saveGoalHabit = useMutation(fetchSaveGoalHabit, {
        onSuccess: () => {
            fetchGoalHabits();
        },
    });

    const saveGoalHabitHandler = (habit: Habit) => {
        saveHabit.mutate(habit);
    };



    // SAVE HABIT
    const fetchSaveHabit = async (habit: Habit) => {
        return await api.saveHabit(habit);
    }

    const saveHabit = useMutation(fetchSaveHabit, {
        onSuccess: (habit: Habit) => {
            if (selectedGoal) {
                saveGoalHabit.mutate(habit)
            }
            fetchAllHabits();
        },
    });

    const saveHabitHandler = (habit: Habit) => {
        saveHabit.mutate(habit);
    };



    // UPDATE HABIT
    const updateHabit = useMutation(fetchSaveHabit, {
        onSuccess: () => {
            fetchGoalHabits();
            fetchAllHabits();
        },
    });

    const updateHabitHandler = (habit: Habit) => {
        updateHabit.mutate(habit);
    };



    // DELETE HABIT
    const fetchDeleteHabit = async (habitId: string) => {
        return await api.deleteHabit(habitId);
    }

    const deleteHabit = useMutation(fetchDeleteHabit, {
        onSuccess: () => {
            fetchGoalHabits();
            fetchAllHabits();
        },
    });

    const deleteHabitHandler = (habitId: string) => {
        deleteHabit.mutate(habitId);
    };


    return {
        allHabits,
        goalHabits,
        fetchAllHabits,
        fetchGoalHabits,
        isLoading,
        isError,
        saveHabit: saveHabitHandler,
        updateHabit: updateHabitHandler,
        deleteHabit: deleteHabitHandler,
        saveGoalHabit: saveGoalHabitHandler,
        isLoadingAllHabits,
        isErrorAllHabits
    };
};
