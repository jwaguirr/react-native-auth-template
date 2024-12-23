// src/hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as auth from '../api/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: session, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: auth.getStoredAuth,
    staleTime: 60000,
    retry: false
  });
  
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      auth.login(email, password),
    onSuccess: (data) => {
      console.log('Login mutation successful');
      queryClient.setQueryData(['session'], data);
    },
    onError: (error) => {
      console.error('Login mutation error:', error);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: auth.logout,
    onSuccess: () => {
      console.log('Logout successful');
      queryClient.setQueryData(['session'], null);
    }
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      auth.register(email, password),
    onSuccess: (data) => {
      queryClient.setQueryData(['session'], data);
    },
  });


  return {
    session,
    isLoading,
    isAuthenticated: !!session?.accessToken,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
  };
};