import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { api } from '../../context/api';
import useAppQuery from '../../context/api/useAppQuery';
import { Unit } from '../../model/types';

interface Props {
    goalId?: string,
}
export const useUnits = ({ goalId }: Props) => {

    const [goalUnit, setGoalUnit] = useState<Unit | undefined>();

    const { data: units, refetch: refetchAllUnits, isLoading, isError } = useAppQuery(['units'], {
        queryFn: () => api.findAllUnits() as Promise<Unit[]>,
        enabled: false,
    });

    const fetchAllUnits = async () => {
        await refetchAllUnits();
    };

    const getUnitOptions = () => {
        if (units) {
            const result = [];
            units.map((unit) => result.push({ label: unit.name, value: unit }))
            return result;
        } else {
            refetchAllUnits();
        }
        return [];
    }

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


    return {
        units,
        goalUnit,
        fetchAllUnits,
        getUnitOptions,
        saveUnit: saveUnitHandler,
        deleteUnit: deleteUnitHandler,
        isLoading,
        isError,
    };
};
