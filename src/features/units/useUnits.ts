import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Unit } from '../../model/types';

export const useUnits = () => {

    const [goalUnit, setGoalUnit] = useState<Unit | undefined>();

    const { data: units, refetch: refetchAllUnits, isLoading, isError } = useAppQuery(['units'], {
        queryFn: () => api.findAllUnits() as Promise<Unit[]>,
        enabled: false,
    });

    const fetchSaveUnit = async (unit: Unit) => {
        return await api.saveUnit(unit);
    }

    const saveUnit = useMutation(fetchSaveUnit, {
        onSuccess: (result: Unit) => {
            setGoalUnit(result);
            refetchAllUnits()
        }
    });

    const saveUnitHandler = (unit: Unit) => {
        saveUnit.mutate(unit);
    };


    const fetchDeleteUnit = async (unitId: string) => {
        return await api.deleteUnit(unitId);
    }

    const deleteUnit = useMutation(fetchDeleteUnit, {
        onSuccess: () => refetchAllUnits(),
    });

    const deleteUnitHandler = (unitId: string) => {
        deleteUnit.mutate(unitId);
    };

    // console.log("7777")

    return {
        units,
        goalUnit,
        saveUnit: saveUnitHandler,
        deleteUnit: deleteUnitHandler,
        refetchAllUnits,
        isLoading,
        isError,
    };
};
