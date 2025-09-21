"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useLayoutEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { responseUserType } from "../hooks/useGetUser";
import { useUserStore } from "../hooks/useUserStore";

type props = {
  children: React.ReactNode;
  user: responseUserType | null;
};

export function Providers({ children, user }: props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
          },
        },
      })
  );

  const setUser = useUserStore((state) => state.setUser);

  useLayoutEffect(() => {
    setUser(user?.data || null);
  }, [user, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
