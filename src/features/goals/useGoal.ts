import { Goal } from '../../model/types';
import { useCategories } from './useCategories';
import { useSteps } from './useSteps';
import useAllGoals from './useAllGoals';
import { useHabits } from '../habits/useHabits';
import { useEffect, useState } from 'react';

export default function useGoal(goalId?: string) {
    const { allGoals } = useAllGoals();
    const { goalCategories, fetchGoalCategories } = useCategories(goalId);
    const { habits, fetchGoalHabits } = useHabits(goalId);
    const { steps, fetchGoalSteps } = useSteps(goalId);

    const [goal, setGoal] = useState<Goal | undefined>();

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

    if (allGoals) {
        if (goalId && !goal) {
            setGoal(allGoals.filter(goal => goal.id === goalId).find(g => g));
        }
    }

    useEffect(() => {
        if (goal) {
            setGoalCategories();
        }
    }, [goal, goalCategories])

    return {
        goal: goal,
        setGoalData: setGoalData,
        setGoalCategories: setGoalCategories,
    };
}
