import axios from 'axios';
import { DetectionResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds for image processing
});

export const detectImage = async (file: File): Promise<DetectionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<DetectionResponse>('/detect/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const checkHealth = async (): Promise<{ message: string; status: string }> => {
  const response = await apiClient.get('/');
  return response.data;
};