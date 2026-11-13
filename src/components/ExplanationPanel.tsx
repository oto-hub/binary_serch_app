import React from 'react';
import { TraceStep } from '../types/binarySearch';
import { Info, Calculator, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface ExplanationPanelProps {
  currentStep: TraceStep;
  totalSteps: number;
}

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  currentStep,
}) => {
  const {
    lineNumber,
    codeText,
    phase,
    low,
    high,
    mid,
    key,
    description,
    actionSummary,
    comparisonResult,
    midValue,
    array,
  } = currentStep;

  // Badge for phase
  const getPhaseBadge = () => {
    switch (phase) {
      case 'init':
        return { label: '初期化処理', color: 'bg-slate-100 text-slate-700' };
      case 'loop_condition':
        return { label: 'ループ継続判定', color: 'bg-indigo-100 text-indigo-800' };
      case 'branch_check':
        return { label: '大小比較による分岐', color: 'bg-purple-100 text-purple-800' };
      case 'update_high':
        return { label: '左半分へ探索範囲縮小', color: 'bg-amber-100 text-amber-800' };
      case 'update_low':
        return { label: '右半分へ探索範囲縮小', color: 'bg-emerald-100 text-emerald-800' };
      case 'recalc_mid':
        return { label: '中央値の再計算', color: 'bg-blue-100 text-blue-800' };
      case 'post_check':
        return { label: '最終発見判定', color: 'bg-teal-100 text-teal-800' };
      case 'output_found':
        return { label: '探索成功・添字出力', color: 'bg-emerald-100 text-emerald-800 font-bold' };
      case 'output_not_found':
        return { label: '探索失敗・該当なし', color: 'bg-rose-100 text-rose-800 font-bold' };
      default:
        return { label: '実行中', color: 'bg-slate-100 text-slate-700' };
    }
  };

  const badge = getPhaseBadge();

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-900">
            行解説 &amp; アルゴリズムの動作
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${badge.color}`}>
            {badge.label}
          </span>
          <span className="font-mono text-xs font-semibold bg-slate-900 text-white px-2 py-0.5 rounded">
            第 {lineNumber} 行
          </span>
        </div>
      </div>

      {/* Code line quote */}
      <div className="bg-slate-900 text-slate-100 rounded-lg p-2.5 font-mono text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-amber-400 font-bold shrink-0">{lineNumber}行目:</span>
          <span className="font-bold">{codeText}</span>
        </div>
        <span className="text-[11px] text-slate-400 font-sans ml-2 shrink-0">
          {actionSummary}
        </span>
      </div>

      {/* Detailed explanation text */}
      <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-lg border border-slate-100">
        {description}
      </div>

      {/* Comparison details if any */}
      {comparisonResult && (
        <div className="bg-indigo-50/60 rounded-lg p-2.5 border border-indigo-100 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-indigo-950 mb-1">
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>条件式の評価結果</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-slate-800">
            <span>式:</span>
            <code className="bg-white px-1.5 py-0.5 rounded border border-indigo-200 font-bold text-indigo-900">
              {comparisonResult.condition}
            </code>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className={`font-bold ${comparisonResult.evaluated ? 'text-emerald-700' : 'text-rose-700'}`}>
              {comparisonResult.evaluated ? '【真 (True)】' : '【偽 (False)】'}
            </span>
          </div>
          <p className="text-slate-600 mt-1 font-sans text-[11px]">
            {comparisonResult.explanation}
          </p>
        </div>
      )}

      {/* Live Variable Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono text-xs">
        <div className="bg-slate-100/80 p-2 rounded text-center">
          <div className="text-[10px] text-slate-500 font-sans">key (探索値)</div>
          <div className="font-bold text-indigo-600 text-sm mt-0.5 tabular-nums">{key}</div>
        </div>

        <div className="bg-emerald-50/80 p-2 rounded text-center border border-emerald-100">
          <div className="text-[10px] text-emerald-700 font-sans">low (左端)</div>
          <div className="font-bold text-emerald-800 text-sm mt-0.5 tabular-nums">{low}</div>
        </div>

        <div className="bg-indigo-50/80 p-2 rounded text-center border border-indigo-100">
          <div className="text-[10px] text-indigo-700 font-sans">mid (中央)</div>
          <div className="font-bold text-indigo-800 text-sm mt-0.5 tabular-nums">{mid}</div>
        </div>

        <div className="bg-amber-50/80 p-2 rounded text-center border border-amber-100">
          <div className="text-[10px] text-amber-700 font-sans">high (右端)</div>
          <div className="font-bold text-amber-800 text-sm mt-0.5 tabular-nums">{high}</div>
        </div>

        <div className="bg-slate-100/80 p-2 rounded text-center col-span-2 sm:col-span-1">
          <div className="text-[10px] text-slate-500 font-sans">t[mid] (中央値)</div>
          <div className="font-bold text-slate-900 text-sm mt-0.5 tabular-nums">
            {mid >= 0 && mid < array.length ? array[mid] : '-'}
          </div>
        </div>
      </div>

      {/* Final Success or Failure Banner */}
      {phase === 'output_found' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2.5 text-emerald-900">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-sm block">探索成功！添字 {mid} に見つかりました</span>
            配列 t の添字 {mid} の要素 t[{mid}] が key={key} と一致しました。プログラムは「{mid}」を出力して正常終了します。
          </div>
        </div>
      )}

      {phase === 'output_not_found' && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 flex items-start gap-2.5 text-rose-900">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-sm block">探索終了：「該当データなし」</span>
            low={low} &gt; high={high} となり、探索可能な要素が無くなりました。プログラムは「"該当データなし"」を出力して終了します。
          </div>
        </div>
      )}
    </div>
  );
};
