import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Step, Unit } from '../../model/types';


export const useUnits = (goalId: string) => {
    const { data: units, refetch, isLoading, isError } = useAppQuery(['units'], {
        queryFn: () => api.findAllUnits() as Promise<Unit[]>,
        enabled: false,
    });

    const fetchAllUnits = async () => {
        await refetch();
    };

    return {
        units,
        fetchAllUnits,
        isLoading,
        isError,
    };
};
