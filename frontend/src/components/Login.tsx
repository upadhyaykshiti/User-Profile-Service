

import React, { useState } from 'react';
import { login } from '../services/auth';

export default function Login({
  onLogin,
  onSwitch,
}: {
  onLogin(): void;
  onSwitch(): void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      onLogin();
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-left text-gray-700 font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-left text-gray-700 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your password"
        />
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      <p className="text-sm text-gray-600 mt-4">
        New user?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-blue-600 hover:underline font-semibold"
        >
          Register here
        </button>
      </p>
    </form>
  );
}
