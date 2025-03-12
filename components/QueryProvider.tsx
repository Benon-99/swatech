"use client"

// This file is deprecated. Please use @/components/providers/QueryProvider instead
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function QueryProvider({children}:{children:React.ReactNode}) {
    console.warn('Using deprecated QueryProvider. Please update import to use @/components/providers/QueryProvider');
    return(
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}