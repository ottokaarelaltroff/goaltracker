import { QueryClient, QueryClientProvider } from 'react-query';

import UserProvider from "./user/UserProvider";

type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: Props) => {
    return (
        <UserProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </UserProvider>
    );
};

export default GlobalProvider;
