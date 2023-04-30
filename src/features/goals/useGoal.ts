import { Goal } from '../../model/types';
import { useGoalCategories } from './useGoalCategories';
import { useSteps } from './useSteps';
import useAllGoals from './useAllGoals';
import { useHabits } from '../habits/useHabits';
import { useEffect, useState } from 'react';

export default function useGoal(goalId?: string) {
    const { allGoals } = useAllGoals();
    const { categories, fetchGoalCategories, isLoading } = useGoalCategories(goalId);
    const { habits, fetchGoalHabits } = useHabits(goalId);
    const { steps, fetchGoalSteps } = useSteps(goalId);

    const [goal, setGoal] = useState<Goal | undefined>();

    const setGoalCategories = () => {
        if (categories) {
            goal.categories = categories;
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

    if (allGoals) {
        if (!goal) {
            setGoal(allGoals.filter(goal => goal.id === goalId).find(g => g));
        }
    }

    useEffect(() => {
        if (goal) {
            setGoalCategories();
        }
    }, [goal, categories])

    return {
        goal: goal,
        setGoalData: setGoalData,
        setGoalCategories: setGoalCategories,
    };
}
