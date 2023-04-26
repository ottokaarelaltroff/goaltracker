import { useQuery, UseQueryResult } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';

type UseAxiosReturnType<T> = UseQueryResult<T, Error>;

const useAxios = <T = any>(
  url: string,
  method: AxiosRequestConfig['method'] = 'get',
  body: AxiosRequestConfig['data'] = null
): UseAxiosReturnType<T> => {
  const fetchData = async () => {
    const response = await axios({
      method,
      url,
      data: body
    });
    return response.data;
  };

  return useQuery<T, Error>(url, fetchData);
};

export default useAxios;