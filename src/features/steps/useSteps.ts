import { useMutation } from '@tanstack/react-query';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Step } from '../../model/types';
import useAllGoals from '../goals/useAllGoals';


export const useSteps = () => {
    const { selectedGoal } = useAllGoals();
    const { data: steps, refetch: refetchGoalSteps, isLoading, isError } = useAppQuery(['goalSteps', selectedGoal?.id], {
        queryFn: () => api.findGoalSteps(selectedGoal.id) as Promise<Step[]>,
        enabled: false,
    });

    const fetchGoalSteps = () => {
        selectedGoal?.id && refetchGoalSteps();
    };

    // SAVE GOAL STEP
    const fetchSaveGoalStep = async (step: Step) => {
        const goalStep = {
            goalId: selectedGoal.id,
            stepId: step.id
        }
        return await api.saveGoalStep(goalStep);
    }

    const saveGoalStep = useMutation(fetchSaveGoalStep, {
        onSuccess: () => {
            fetchGoalSteps();
        },
    });


    // SAVE STEP
    const fetchSaveStep = async (step: Step) => {
        return await api.saveStep(step);
    }

    const saveStep = useMutation(fetchSaveStep, {
        onSuccess: (step: Step) => {
            saveGoalStep.mutate(step)
        },
    });

    const saveStepHandler = (step: Step) => {
        saveStep.mutate(step);
    };


    // UPDATE
    const updateStep = useMutation(fetchSaveStep, {
        onSuccess: () => {
            fetchGoalSteps();
        },
    });

    const updateStepHandler = (step: Step) => {
        updateStep.mutate({ id: step.stepId, title: step.title, isCompleted: step.isCompleted });
    };


    // DELETE
    const fetchDeleteStep = async (stepId: string) => {
        return await api.deleteStep(stepId);
    }

    const deleteStep = useMutation(fetchDeleteStep, {
        onSuccess: () => {
            fetchGoalSteps();
        },
    });

    const deleteStepHandler = (stepId: string) => {
        deleteStep.mutate(stepId);
    };


    return {
        steps,
        fetchGoalSteps,
        saveStep: saveStepHandler,
        updateStep: updateStepHandler,
        deleteStep: deleteStepHandler,
        isLoading,
        isError,
    };
};
