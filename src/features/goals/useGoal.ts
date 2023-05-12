import { useEffect } from 'react';
import { Goal } from '../../model/types';
import { useHabits } from '../habits/useHabits';
import useAllGoals from './useAllGoals';
import { useSteps } from '../steps/useSteps';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { useCategories } from '../categories/useCategories';

export default function useGoal(goalId?: string) {
    const { fetchAllGoals } = useAllGoals();
    const { goalCategories, fetchGoalCategories, saveNewGoalCategory, categoriesToSave, setCategoriesToSave } = useCategories(goalId);
    const { goalHabits, fetchGoalHabits } = useHabits();
    const { steps, fetchGoalSteps } = useSteps();

    useEffect(() => {

        console.log("OTTO categoriesToSave", categoriesToSave)
    }, [categoriesToSave])

    const { data: goal, refetch: refetchGoal } = useAppQuery(['goal', goalId], {
        queryFn: () => api.findGoal(goalId) as Promise<Goal>,
        enabled: false,
    });

    if (!goal && goalId) {
        refetchGoal();
    }

    const setGoalCategories = () => {
        if (goalCategories) {
            goal.categories = goalCategories;
        } else {
            fetchGoalCategories();
        }
    }

    const setGoalData = () => {
        if (goalHabits) {
            goal.habits = goalHabits;
        } else {
            fetchGoalHabits();
        }
        if (steps) {
            goal.steps = steps;
        } else {
            fetchGoalSteps();
        }
    }

    const fetchUpdateGoal = async (goal: Goal) => {
        const copy = goal;
        delete copy.categories;
        delete copy.steps;
        delete copy.habits;
        return await api.saveGoal(goal);
    }

    const updateGoal = useMutation(fetchUpdateGoal, {
        onSuccess: refetchGoal && fetchAllGoals
    });

    const updateGoalHandler = (goal: Goal) => {
        updateGoal.mutate(goal);
    };

    const fetchSaveGoal = async (goal: Goal) => {
        return await api.saveGoal(goal);
    }

    const saveGoal = useMutation(fetchSaveGoal, {
        onSuccess: (goal: Goal) => {
            console.log("OTTO SAVE THESE", categoriesToSave)
            if (categoriesToSave && categoriesToSave.length > 0) {
                categoriesToSave.map((category) => saveNewGoalCategory(category.id, goal.id))
            }
            setCategoriesToSave(undefined);
            fetchAllGoals()
        }
    });

    const saveGoalHandler = (goal: Goal) => {
        saveGoal.mutate(goal);
    };


    const fetchDeleteGoal = async () => {
        return await api.deleteGoal(goalId);
    }

    const deleteGoal = useMutation(fetchDeleteGoal, {
        onSuccess: fetchAllGoals
    });

    const deleteGoalHandler = () => {
        if (goalId) {
            deleteGoal.mutate();
        }
    };


    useEffect(() => {
        if (goal) {
            setGoalCategories();
        }
    }, [goal, goalCategories])

    return {
        goal,
        setGoalData,
        setGoalCategories,
        updateGoal: updateGoalHandler,
        saveGoal: saveGoalHandler,
        deleteGoal: deleteGoalHandler,
    };
}
