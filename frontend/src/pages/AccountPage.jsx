import React from 'react';
import { useAuth } from '/src/context/AuthContext.jsx'; // Absolute path
import { useQuery } from '@tanstack/react-query';
import { getMe } from '/src/api/userApi.js'; // Absolute path
import Background from '/src/components/Background.jsx'; // Absolute path
import BackToHomeButton from '/src/components/BackToHomeButton.jsx'; // Absolute path

function AccountPage() {
  const { logout, user } = useAuth();

  // Use React Query to fetch data from the protected /users/me endpoint
  const {
    data: profile,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <BackToHomeButton />
      <Background />
      <div className="form-card">
        <h1 className="text-center">My Account</h1>
        
        <div className="mt-6 text-left">
          <p className="mb-2">
            <span className="font-semibold text-gray-400">Status:</span>
            <span className="ml-2 text-emerald-400">Logged In</span>
          </p>

          <p className="mb-2">
            <span className="font-semibold text-gray-400">Your Email:</span>
            <span className="ml-2">{user?.email}</span>
          </p>

          <h2 className="text-lg font-semibold mt-6 mb-2 border-b border-gray-700 pb-1">
            Data from Protected API:
          </h2>
          {isLoading && <p className="text-gray-400">Loading profile data...</p>}
          {isError && <p className="error-text">Error: {error.message}</p>}
          {profile && (
            <pre className="p-4 bg-gray-900/70 rounded-lg text-sm overflow-auto">
              {JSON.stringify(profile, null, 2)}
            </pre>
          )}
        </div>

        <button onClick={logout} className="btn-primary w-full mt-6">
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;