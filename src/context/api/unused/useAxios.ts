import { useEffect, useState } from "react";
import axios from "axios";

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface FetchProps {
    method: HttpMethod;
    url: string;
    body: any;
}

const useFetch = ({method, url, body}: FetchProps) => {
  const [isLoading, setIsLoading] = useState<boolean | undefined>(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios({
          method: method,
          url: url,
          data: body
        });
        const data = await response?.data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { isLoading, data, error };
};

export default useFetch;