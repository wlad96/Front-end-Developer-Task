"use client";

import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import OTPForm from '@/components/OTPForm';
import { useAuth } from '@/context/AuthContext';

const SignIn: React.FC = () => {
  const { login } = useAuth();
  const [step, setStep] = useState<'login' | 'otp'>('login');
  const [email, setEmail] = useState('');

  const handleLogin = (email: string, password: string) => {
    setTimeout(() => {
      setEmail(email);
      setStep('otp');
    }, 1000);
  };

  const handleOTP = (otp: string) => {
    setTimeout(() => {
      login(email);
    }, 1000);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Front-end Developer Task    
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    {step === 'login' ? (
                        <>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <AuthForm type="login" onSubmit={handleLogin} />
                        </>
                    ) : (
                        <OTPForm onSubmit={handleOTP} email={email} />
                    )}
                </div>
            </div>
        </div>
    </section>
  );
};

export default SignIn;