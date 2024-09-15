"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess('Password reset successfully');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while resetting the password');
    } finally {
      setLoading(false);
      }
    };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 shadow-lg rounded-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <h3 className="text-gray-800 dark:text-white text-2xl font-bold">Reset Password</h3>
            <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">Enter your new password</p>
          </div>

          <div className="mb-6">
            <label className="text-gray-800 dark:text-gray-200 text-sm block mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-gray-800 dark:text-gray-200 text-sm block mb-2">Confirm Password</label>
            <input
              type="password"
              required  
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;