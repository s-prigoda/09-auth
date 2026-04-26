import { useAuthStore } from '@/lib/store/authStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const logoutRequest = async () => {
  await axios.post('/api/auth/logout', {}, { withCredentials: true });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      clearAuth();
      queryClient.removeQueries({ queryKey: ['me'] });
    },
  });
};
