import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export interface AnalysisRequest {
  serviceType: 'vendor-selection' | 'market-research' | 'competitor-analysis' | 'build-vs-buy' | 'rfp-intelligence';
  companyName?: string;
  industry?: string;
  technology?: string;
  keywords?: string[];
  additionalParams?: Record<string, any>;
}

export interface AnalysisResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  results?: any;
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export const analysisAPI = {
  // Submit analysis request
  submitAnalysis: async (data: AnalysisRequest): Promise<AnalysisResponse> => {
    const response = await apiClient.post(`/analyze/${data.serviceType}`, data);
    return response.data;
  },

  // Get analysis status
  getAnalysisStatus: async (analysisId: string): Promise<AnalysisResponse> => {
    const response = await apiClient.get(`/analysis/${analysisId}`);
    return response.data;
  },

  // Get analysis results
  getAnalysisResults: async (analysisId: string): Promise<any> => {
    const response = await apiClient.get(`/analysis/${analysisId}/results`);
    return response.data;
  },
};

export const healthAPI = {
  // Health check
  checkHealth: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient;
