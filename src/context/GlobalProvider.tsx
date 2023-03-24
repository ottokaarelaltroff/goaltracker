import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import UserProvider from "./user/UserProvider";

type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: Props) => {
    return (
        <QueryClientProvider client={queryClient} >
            <UserProvider>
                {children}
            </UserProvider>
        </QueryClientProvider>
    );
};

export default GlobalProvider;
