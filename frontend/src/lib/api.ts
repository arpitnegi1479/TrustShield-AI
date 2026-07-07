import axios from 'axios';
import { nanoid } from 'nanoid';
import { AnalyzeRequest, SimulateRequest, TrustAnalysisResult } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  config.headers['X-Request-ID'] = nanoid();
  return config;
});

export async function analyzeUser(req: AnalyzeRequest): Promise<TrustAnalysisResult> {
  const response = await api.post('/api/analyze', req);
  return response.data;
}

export async function simulateTrust(req: SimulateRequest): Promise<TrustAnalysisResult> {
  const response = await api.post('/api/simulate', req);
  return response.data;
}