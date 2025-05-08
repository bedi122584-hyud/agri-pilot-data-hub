
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Rediriger automatiquement vers le tableau de bord
  return <Navigate to="/dashboard" replace />;
};

export default Index;
