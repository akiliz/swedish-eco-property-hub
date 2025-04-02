
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api';

export const useApi = () => {
  const fetchProperties = async () => {
    const response = await fetch(`${API_URL}/properties`);
    return response.json();
  };

  const createProperty = async (propertyData: any) => {
    const response = await fetch(`${API_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    return response.json();
  };

  return {
    fetchProperties,
    createProperty,
  };
};
