

import React, { useState } from 'react';
import { register } from '../services/auth';

export default function Register({ onSwitch }: { onSwitch(): void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await register(email, password);
      setMsg('Registered successfully — please log in.');
    } catch (err: any) {
      setMsg(err?.response?.data?.error || 'Registration failed');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-left text-gray-700 font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-left text-gray-700 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-pink-500 outline-none"
          placeholder="Enter your password"
        />
      </div>

      {msg && <div className="text-sm text-green-600">{msg}</div>}

      <button
        type="submit"
        className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
      >
        Register
      </button>

      <p className="text-sm text-gray-600 mt-4">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          className="text-pink-600 hover:underline font-semibold"
        >
          Back to Login
        </button>
      </p>
    </form>
  );
}
