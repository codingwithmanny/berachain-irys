'use client'

// Imports
// ========================================================
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Config
// ========================================================
const queryClient = new QueryClient({
  // Prevent refetch on window refresh
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  }
});

// Provider
// ========================================================
export default function Query({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};