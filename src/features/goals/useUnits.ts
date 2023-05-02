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

    const getUnitOptions = () => {
        if (units) {
            const result = [];
            units.map((unit) => result.push({ label: unit.name, value: unit }))
            return result;
        } else {
            fetchAllUnits();
        }
        return [];
    }

    return {
        units,
        fetchAllUnits,
        getUnitOptions,
        isLoading,
        isError,
    };
};
