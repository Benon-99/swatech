export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<boolean>;
    checkAuth: () => Promise<void>;
}
