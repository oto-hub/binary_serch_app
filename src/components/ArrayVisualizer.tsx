import React from 'react';
import { TraceStep } from '../types/binarySearch';
import { ArrowDown, Check, X, Search, Sparkles } from 'lucide-react';

interface ArrayVisualizerProps {
  currentStep: TraceStep;
  array: number[];
  keyToSearch: number;
}

export const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({
  currentStep,
  array,
  keyToSearch,
}) => {
  const { low, high, mid, phase } = currentStep;
  const isFound = phase === 'output_found' || (phase === 'loop_condition' && currentStep.midValue === keyToSearch && low <= high);
  const isNotFound = phase === 'output_not_found';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            配列 t の状態と探索範囲
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            要素数: {array.length} (添字 0 〜 {array.length - 1})
          </h2>
        </div>

        {/* Current Key Indicator */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
          <Search className="w-4 h-4 text-indigo-600" />
          <span className="text-xs text-slate-600">探索キー (key):</span>
          <span className="text-sm font-bold font-mono text-indigo-600 tabular-nums">
            {keyToSearch}
          </span>
        </div>
      </div>

      {/* Array Elements Visualizer */}
      <div className="overflow-x-auto pb-4 pt-6">
        <div className="min-w-[620px] flex justify-center">
          <div className="grid grid-flow-col auto-cols-fr gap-2 w-full max-w-3xl">
            {array.map((value, idx) => {
              const isLow = idx === low && low <= high;
              const isHigh = idx === high && low <= high;
              const isMid = idx === mid && low <= high;
              const inRange = idx >= low && idx <= high;
              const isTargetMatch = idx === mid && value === keyToSearch && (isFound || phase === 'post_check');

              // Badge styling
              let cellBg = 'bg-slate-50 border-slate-200 text-slate-400 opacity-40';
              if (inRange) {
                cellBg = 'bg-white border-slate-300 text-slate-800 shadow-xs';
              }
              if (isMid && inRange) {
                cellBg = 'bg-indigo-50/80 border-indigo-400 text-indigo-950 ring-2 ring-indigo-500/20 shadow-sm';
              }
              if (isTargetMatch) {
                cellBg = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-4 ring-emerald-500/20 shadow-md';
              }

              return (
                <div key={idx} className="flex flex-col items-center">
                  {/* Pointers above cell (low / mid / high markers) */}
                  <div className="h-10 flex flex-col items-center justify-end mb-1.5 w-full">
                    {/* Multi-pointer collision handling */}
                    <div className="flex items-center gap-0.5 text-[11px] font-bold font-mono tracking-tight">
                      {isLow && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                          low
                        </span>
                      )}
                      {isMid && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white shadow-xs">
                          mid
                        </span>
                      )}
                      {isHigh && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                          high
                        </span>
                      )}
                    </div>
                    {(isLow || isMid || isHigh) && (
                      <ArrowDown className={`w-3.5 h-3.5 mt-0.5 ${
                        isTargetMatch ? 'text-emerald-600' : isMid ? 'text-indigo-600' : isLow ? 'text-emerald-600' : 'text-amber-600'
                      }`} />
                    )}
                  </div>

                  {/* Main Value Cell */}
                  <div
                    className={`relative w-full aspect-square max-w-[80px] rounded-lg border-2 flex flex-col items-center justify-center transition-all duration-200 ${cellBg}`}
                  >
                    {/* Index chip */}
                    <span className="absolute top-1 left-1.5 text-[10px] font-mono text-slate-400">
                      t[{idx}]
                    </span>

                    {/* Array Value */}
                    <span className="text-xl font-bold font-mono tabular-nums mt-1.5">
                      {value}
                    </span>

                    {/* Target Found Icon */}
                    {isTargetMatch && (
                      <span className="absolute -top-2 -right-2 bg-emerald-500 text-white p-0.5 rounded-full shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  {/* Bottom Index Label */}
                  <div className="mt-1.5 text-xs font-mono font-medium text-slate-500">
                    添字: {idx}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Range Status Bar & Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
        {/* Left: Active Search Range Details */}
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80">
          <div className="text-xs font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
            <span>現在の探索範囲</span>
            <span className="font-mono text-xs">
              {low <= high ? `残り ${Math.max(0, high - low + 1)} 要素` : '範囲なし'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600">low =</span>
              <span className="font-bold text-slate-900 tabular-nums">{low}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <span className="text-slate-600">mid =</span>
              <span className="font-bold text-indigo-700 tabular-nums">{mid}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600">high =</span>
              <span className="font-bold text-slate-900 tabular-nums">{high}</span>
            </div>
          </div>

          {/* Subtext about range */}
          <div className="mt-2 text-xs text-slate-600">
            {low <= high ? (
              <span>
                添字 <span className="font-mono font-bold text-slate-900">{low}</span> から{' '}
                <span className="font-mono font-bold text-slate-900">{high}</span> までを探索中
              </span>
            ) : (
              <span className="text-rose-600 font-semibold flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> low &gt; high となり探索範囲が存在しません
              </span>
            )}
          </div>
        </div>

        {/* Right: Active Comparison Box */}
        <div className={`rounded-lg p-3 border transition-colors ${
          isFound
            ? 'bg-emerald-50/90 border-emerald-300'
            : isNotFound
            ? 'bg-rose-50/90 border-rose-300'
            : 'bg-indigo-50/50 border-indigo-200'
        }`}>
          <div className="text-xs font-semibold text-slate-500 mb-1 flex items-center justify-between">
            <span>中央値 t[mid] と key の比較</span>
            {isFound && (
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 一致しました！
              </span>
            )}
          </div>

          {mid >= 0 && mid < array.length && low <= high ? (
            <div>
              <div className="flex items-center gap-2 font-mono text-base font-bold my-1">
                <span className="text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200">
                  t[{mid}] = {array[mid]}
                </span>
                <span className="text-slate-500">
                  {array[mid] === keyToSearch ? '==' : array[mid] > keyToSearch ? '>' : '<'}
                </span>
                <span className="text-indigo-900 bg-white px-2 py-0.5 rounded border border-indigo-200">
                  key = {keyToSearch}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                {array[mid] === keyToSearch ? (
                  <span className="text-emerald-800 font-medium">
                    中央値と一致しました！ループ条件 (t[mid] ≠ key) が偽となり探索完了です。
                  </span>
                ) : array[mid] > keyToSearch ? (
                  <span>
                    中央値 ({array[mid]}) &gt; key ({keyToSearch}) のため、探す値は左側にあります。
                    <strong className="text-amber-800 font-semibold ml-1">high ← mid - 1</strong>
                  </span>
                ) : (
                  <span>
                    中央値 ({array[mid]}) &lt; key ({keyToSearch}) のため、探す値は右側にあります。
                    <strong className="text-emerald-800 font-semibold ml-1">low ← mid + 1</strong>
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div className="py-2 text-xs text-slate-500">
              {isNotFound ? (
                <span className="text-rose-700 font-medium">
                  探索範囲がすべて尽きました。目的の値 {keyToSearch} は配列にありませんでした。
                </span>
              ) : (
                <span>範囲外または初期化中</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
