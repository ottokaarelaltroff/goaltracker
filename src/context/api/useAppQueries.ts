import { QueryKey, useQueryClient } from '@tanstack/react-query';



const useAppQueries = () => {
  const queryClient = useQueryClient();

  const appQueries: QueryKey = [
    'allGoals',
    'goal',
    'goalCategories',
    'allCategories',
    'goalHabits',
    'allHabits',
    'goalSteps',
    'units'
  ];

  const reset = () => {
    console.log("remove queries")
    queryClient.resetQueries(appQueries);
    queryClient.clear();
  };

  const init = () => {
    console.log("init queries")
    queryClient.refetchQueries(appQueries);
  }

  return {
    queryClient,
    init,
    reset
  };
}

export default useAppQueries;
