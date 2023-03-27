import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';

type ApiResponse<T> = {
    data: T;
};

type UseHttpServiceOptions<T> = UseQueryOptions<ApiResponse<T>, Error, ApiResponse<T>> & {
    axiosOptions?: AxiosRequestConfig;
};

const useHttpService = <T = unknown>(
    queryKey: QueryKey,
    endpoint: string,

    options: UseHttpServiceOptions<T> = {}
) => {
    const { axiosOptions = {}, ...queryOptions } = options;

    return useQuery<ApiResponse<T>, Error>(
        [queryKey, endpoint, axiosOptions],
        async () => {
            const response = await axios({
                url: endpoint,
                ...axiosOptions,
            });
            return { data: response.data };
        },

        queryOptions
    );
};

export default useHttpService;