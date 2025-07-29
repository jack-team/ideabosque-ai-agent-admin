import { createContext } from 'react';
import type { FlowCanvasContextTypes, FlowCanvasInnerContextTypes } from './types';

export const FlowCanvasContext = createContext({} as FlowCanvasContextTypes);
export const FlowCanvasInnerContext = createContext({} as FlowCanvasInnerContextTypes);