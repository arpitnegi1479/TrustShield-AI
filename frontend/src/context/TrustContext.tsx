import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { AnalyzeRequest, TrustAnalysisResult } from '../types';

interface TrustState {
  input: AnalyzeRequest;
  result: TrustAnalysisResult | null;
  loading: boolean;
  error: string | null;
  simulationResult: TrustAnalysisResult | null;
  simulationLoading: boolean;
}

type TrustAction =
  | { type: 'SET_INPUT'; payload: Partial<AnalyzeRequest> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RESULT'; payload: TrustAnalysisResult }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SIMULATION'; payload: TrustAnalysisResult }
  | { type: 'SET_SIMULATION_LOADING'; payload: boolean }
  | { type: 'RESET' };

const initialState: TrustState = {
  input: {
    userId: '',
    amount: 0,
    deviceType: 'mobile',
    location: '',
    loginHour: 12,
    useCase: 'payment',
  },
  result: null,
  loading: false,
  error: null,
  simulationResult: null,
  simulationLoading: false,
};

function trustReducer(state: TrustState, action: TrustAction): TrustState {
  switch (action.type) {
    case 'SET_INPUT':
      return { ...state, input: { ...state.input, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_RESULT':
      return { ...state, result: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_SIMULATION':
      return { ...state, simulationResult: action.payload, simulationLoading: false };
    case 'SET_SIMULATION_LOADING':
      return { ...state, simulationLoading: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const TrustContext = createContext<{
  state: TrustState;
  dispatch: Dispatch<TrustAction>;
} | null>(null);

export const TrustProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(trustReducer, initialState);
  return (
    <TrustContext.Provider value={{ state, dispatch }}>
      {children}
    </TrustContext.Provider>
  );
};

export const useTrust = () => {
  const context = useContext(TrustContext);
  if (!context) throw new Error('useTrust must be used within TrustProvider');
  return context;
};