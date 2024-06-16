"use client";

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import CurrencyTable from '@/components/CurrencyTable';


const DashboardPage: React.FC = () => {

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-semibold whitespace-nowrap dark:text-white text-center mt-10">Currencies</h1>
        <CurrencyTable />
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;