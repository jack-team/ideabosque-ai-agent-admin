import { createContext } from 'react';
import type { FlowContextTypes, CanvasContextTypes } from './types';

export const FlowContext = createContext({} as FlowContextTypes);
export const CanvasContext = createContext({} as CanvasContextTypes);