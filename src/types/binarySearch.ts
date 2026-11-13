/**
 * Types for Binary Search Trace & Visualization
 */

export interface TraceStep {
  stepIndex: number;
  lineNumber: number;
  codeText: string;
  loopCount: number; // 0 for pre-loop / post-loop, 1..N for while iterations
  phase: 'init' | 'loop_condition' | 'branch_check' | 'update_high' | 'update_low' | 'recalc_mid' | 'post_check' | 'output_found' | 'output_not_found';
  
  // Variables at this step
  low: number;
  high: number;
  mid: number;
  key: number;
  
  // Array state
  array: number[];
  
  // Evaluation details
  midValue: number | null;
  comparisonResult?: {
    condition: string;
    evaluated: boolean;
    explanation: string;
  };
  
  // Human readable explanation in Japanese
  description: string;
  actionSummary: string;
  
  // Active search range [low, high]
  activeRange: {
    start: number;
    end: number;
    valid: boolean;
  };
}

export interface TraceTableRow {
  id: string;
  stepIndex: number;
  iterationLabel: string; // e.g. "初期化", "1回目", "2回目", "ループ終了後"
  lineNumber: number;
  low: number;
  high: number;
  mid: number;
  midValue: number | null;
  comparison: string;
  actionNote: string;
  remainingRange: string;
}

export interface PresetCase {
  id: string;
  label: string;
  key: number;
  description: string;
  expectedResult: 'found' | 'not_found';
  expectedIndex?: number;
}

export interface BlankQuestion {
  id: string;
  blankSymbol: string; // e.g. "(ア)"
  title: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  hint: string;
}
