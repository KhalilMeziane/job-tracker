import { HttpClient } from "@/lib/httpClient";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationKey: ['auth-register'],
    mutationFn: async (body: { name: string, email: string, password: string }) => {
      const response = await HttpClient().post('/auth/register', body)
      const data = response.data
      return data
    },
  });
}
