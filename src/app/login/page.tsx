'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/providers/AuthProvider';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { FaCat, FaUser } from 'react-icons/fa';

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);

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

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    try {
      const res = await api.post('/api/auth/demo');
      await login(res.data.token);
      toast.success('Logged in as Demo User!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Demo login failed.');
    } finally {
      setDemoLoading(false);
    }
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

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
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

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-400">or</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={demoLoading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow transition-colors disabled:opacity-50"
          >
            <FaUser />
            {demoLoading ? 'Signing in...' : 'Demo Login'}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Demo: demo@user.com / Demo User
            </p>
          </div>

          <div className="text-center">
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
