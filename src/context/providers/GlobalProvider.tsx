import { QueryClient, QueryClientProvider, useQueries } from '@tanstack/react-query';

import UserProvider from "./UserProvider";
import GoalProvider from './GoalProvider';
import useAppQueries from '../api/useAppQueries';

type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: Props) => {

    return (
        <QueryClientProvider client={queryClient} >
            <UserProvider>
                <GoalProvider>
                    {children}
                </GoalProvider>
            </UserProvider>
        </QueryClientProvider>
    );
};

export default GlobalProvider;
