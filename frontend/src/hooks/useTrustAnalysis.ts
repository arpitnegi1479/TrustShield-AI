import { useTrust } from '../context/TrustContext';
import { analyzeUser, simulateTrust } from '../lib/api';
import { AnalyzeRequest } from '../types';

export const useTrustAnalysis = () => {
  const { state, dispatch } = useTrust();
  const analyze = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const result = await analyzeUser(state.input);
      dispatch({ type: 'SET_RESULT', payload: result });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'An error occurred' });
    }
  };
  const simulate = async (modified: Partial<AnalyzeRequest>) => {
    dispatch({ type: 'SET_SIMULATION_LOADING', payload: true });
    try {
      const result = await simulateTrust({ baseRequest: state.input, modifiedParams: modified });
      dispatch({ type: 'SET_SIMULATION', payload: result });
    } catch (error: any) {
      // handle
    }
  };
  return {
    analyze,
    simulate,
    loading: state.loading,
    result: state.result,
    simulationLoading: state.simulationLoading,
    simulationResult: state.simulationResult
  };
};