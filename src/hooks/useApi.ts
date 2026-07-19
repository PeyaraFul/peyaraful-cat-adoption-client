import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Cat, Story, AdoptionRequest, User } from '@/types';
import toast from 'react-hot-toast';

const getErrorMessage = (error: any): string => {
  return error?.response?.data?.message || error?.message || 'Something went wrong';
};

// Public Stats
export const usePublicStats = () => {
  return useQuery<{ totalCats: number; totalUsers: number; totalAdoptions: number }>({
    queryKey: ['stats'],
    queryFn: async () => {
      const res = await api.get('/api/stats');
      return res.data;
    }
  });
};

// Cats
export const useCats = (filters?: Record<string, string>) => {
  return useQuery<Cat[]>({
    queryKey: ['cats', filters],
    queryFn: async () => {
      const params = new URLSearchParams(filters).toString();
      const res = await api.get(`/api/cats?${params}`);
      return res.data;
    }
  });
};

export const useCat = (id: string) => {
  return useQuery<Cat>({
    queryKey: ['cat', id],
    queryFn: async () => {
      const res = await api.get(`/api/cats/${id}`);
      return res.data;
    },
    enabled: !!id
  });
};

export const useCreateCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string; age: number; breed: string; photo: string;
      description?: string; location: string; gender?: string;
      healthStatus?: string; vaccinationStatus?: string; temperament?: string;
    }) => {
      const res = await api.post('/api/cats', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cats'] });
      toast.success('Cat listing created successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useUpdateCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Cat> }) => {
      const res = await api.put(`/api/cats/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cats'] });
      queryClient.invalidateQueries({ queryKey: ['cat'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'cats'] });
      toast.success('Cat updated successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useDeleteCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/cats/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cats'] });
      toast.success('Cat deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

// Stories
export const useStories = () => {
  return useQuery<Story[]>({
    queryKey: ['stories'],
    queryFn: async () => {
      const res = await api.get('/api/stories');
      return res.data;
    }
  });
};

export const useTopStories = () => {
  return useQuery<Story[]>({
    queryKey: ['stories', 'top'],
    queryFn: async () => {
      const res = await api.get('/api/stories/top');
      return res.data;
    }
  });
};

export const useCreateStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { catName: string; content: string; image?: string }) => {
      const res = await api.post('/api/stories', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast.success('Story shared successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useDeleteStory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/stories/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories'] });
      toast.success('Story deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

// Adoptions
export const useCreateAdoption = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { catId: string; message?: string }) => {
      const res = await api.post('/api/adoptions', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adoptions'] });
      toast.success('Adoption request sent!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useReceivedRequests = () => {
  return useQuery<AdoptionRequest[]>({
    queryKey: ['adoptions', 'received'],
    queryFn: async () => {
      const res = await api.get('/api/adoptions/received');
      return res.data;
    }
  });
};

export const useSentRequests = () => {
  return useQuery<AdoptionRequest[]>({
    queryKey: ['adoptions', 'sent'],
    queryFn: async () => {
      const res = await api.get('/api/adoptions/sent');
      return res.data;
    }
  });
};

export const useApproveRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/api/adoptions/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adoptions'] });
      toast.success('Adoption request approved!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useRejectRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/api/adoptions/${id}/reject`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adoptions'] });
      toast.success('Adoption request rejected');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

// Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name?: string; phone?: string; location?: string; bio?: string; image?: string }) => {
      const res = await api.put('/api/auth/profile', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      toast.success('Profile updated successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

// Admin
export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const res = await api.get('/api/admin/stats');
      return res.data;
    }
  });
};

export const useAdminUsers = () => {
  return useQuery<User[]>({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const res = await api.get('/api/admin/users');
      return res.data;
    }
  });
};

export const useAdminCats = () => {
  return useQuery<Cat[]>({
    queryKey: ['admin', 'cats'],
    queryFn: async () => {
      const res = await api.get('/api/admin/cats');
      return res.data;
    }
  });
};

export const useAdminAdoptions = (status?: string) => {
  return useQuery<AdoptionRequest[]>({
    queryKey: ['admin', 'adoptions', status],
    queryFn: async () => {
      const params = status ? `?status=${status}` : '';
      const res = await api.get(`/api/admin/adoptions${params}`);
      return res.data;
    }
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/admin/users/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('User deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};

export const useDeleteCatAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/admin/cats/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'cats'] });
      toast.success('Cat deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(getErrorMessage(error));
    }
  });
};
