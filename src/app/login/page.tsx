'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/providers/AuthProvider';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaCat } from 'react-icons/fa';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (user) return null;

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await api.post('/api/auth/google', {
        credential: credentialResponse.credential,
      });
      await login(res.data.token);
      toast.success('Logged in successfully!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <FaCat className="text-3xl text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Sign in to Peyaraful Cat Adoption</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              shape="rectangular"
              size="large"
              width="300"
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Find your purrfect companion today!
        </p>
      </div>
    </div>
  );
}
