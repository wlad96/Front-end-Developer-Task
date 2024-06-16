"use client";

import React, { useState } from 'react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/context/AuthContext';

const RegisterPage: React.FC = () => {

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { login } = useAuth();

  const handleRegister = (email: string, password: string) => {
    setShowSuccessDialog(true);
    setTimeout(() => {
      login(email);
    }, 2000);
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                  Front-end Developer Task    
              </div>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Sign up
                      </h1>
                      <AuthForm type="register" onSubmit={handleRegister} />
                  </div>
              </div>
          </div>
      </section>
      {showSuccessDialog && (
          <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="modal__wrapper overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 modal__content">
                    <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
                          You have successfully registered!
                        </h3>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;