import { useEffect } from 'react';
import { Goal } from '../../model/types';
import { useHabits } from '../habits/useHabits';
import useAllGoals from './useAllGoals';
import { useCategories } from './useCategories';
import { useSteps } from './useSteps';

import { useMutation } from '@tanstack/react-query';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';

export default function useGoal(goalId?: string) {
    const { fetchAllGoals } = useAllGoals();
    const { goalCategories, fetchGoalCategories } = useCategories(goalId);
    const { habits, fetchGoalHabits } = useHabits(goalId);
    const { steps, fetchGoalSteps } = useSteps(goalId);

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
        if (habits) {
            goal.habits = habits;
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
        return await api.updateGoal(goal);
    }

    const updateGoal = useMutation(fetchUpdateGoal, {
        onSuccess: refetchGoal && fetchAllGoals
    });

    const updateGoalHandler = (goal: Goal) => {
        updateGoal.mutate(goal);
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
        updateGoal: updateGoalHandler
    };
}
