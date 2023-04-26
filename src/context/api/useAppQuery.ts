import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export default function useAppQuery<TData, Error>(
    queryKey: QueryKey,
    options: UseQueryOptions<TData, Error>,
): UseQueryResult<TData, Error> {
    return useQuery({ queryKey, ...options });
}
