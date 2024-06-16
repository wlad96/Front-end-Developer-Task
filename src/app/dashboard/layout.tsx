"use client";

import { Inter } from "next/font/google";
import "./../globals.css";
import { AppProps } from 'next/app';
import { AuthProvider, useAuth } from '@/context/AuthContext';



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const { user, logout } = useAuth();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="minHeight-100">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Front-end Developer Task</span>
                    </div>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <p className="self-center text-1l mr-5 font-semibold whitespace-nowrap dark:text-white">{user}</p>
                        <button
                            type="button"
                            onClick={logout}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Logout
                        </button>
                    </div>
                </div>
            </nav>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    </section>
  );
}
