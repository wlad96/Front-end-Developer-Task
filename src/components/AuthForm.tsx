"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface AuthFormProps {
  type: 'register' | 'login';
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if(type === 'register') {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    }

    if (type === 'login' && email === 'incorrect@email.com') {
      setError('Incorrect email');
      return;
    }
    if (type === 'login' && password === 'incorrect-password') {
      setError('Incorrect password');
      return;
    }
    onSubmit(email, password);
  };

  return (
    <>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="E-mail" 
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input 
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Password" 
                />
            </div>
            {type === 'register' && (
                <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Confirm password" 
                    />
                </div>
            )}
            {error && (
                <div className="error-alert p-4 mb-4 text-sm rounded-lg" role="alert">
                    {error}
                </div>
            )}
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                {type === 'register' ? 'Sign up' : 'Sign in'}
            </button>
            {type === 'register' ? (
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    I have an account. <Link href={'/sign-in'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
                </p>
                ) : (
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <Link href={'/sign-up'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
            )}
        </form>
   </>
  );
};

export default AuthForm;