import React, { useState } from 'react';
import { TraceTableRow } from '../types/binarySearch';
import { Copy, Check, Table as TableIcon, Download } from 'lucide-react';

interface TraceTableProps {
  rows: TraceTableRow[];
  currentStepIndex: number;
  onSelectStep?: (stepIndex: number) => void;
}

export const TraceTable: React.FC<TraceTableProps> = ({
  rows,
  currentStepIndex,
  onSelectStep,
}) => {
  const [copied, setCopied] = useState(false);

  // Filter rows up to the current step to show progressive execution
  const activeRows = rows.filter(r => r.stepIndex <= currentStepIndex);

  const copyTableAsText = () => {
    const headers = ['回数/状態', '行番号', 'low', 'high', 'mid', 't[mid]', '比較・条件', '更新内容', '探索範囲'];
    const textRows = rows.map(r => [
      r.iterationLabel,
      `行${r.lineNumber}`,
      r.low,
      r.high,
      r.mid,
      r.midValue !== null ? r.midValue : '-',
      r.comparison,
      r.actionNote,
      r.remainingRange,
    ].join('\t'));

    const fullText = [headers.join('\t'), ...textRows].join('\n');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSV = () => {
    const headers = ['状態', '行番号', 'low', 'high', 'mid', 't[mid]', '比較', '更新', '範囲'];
    const csvContent = [
      headers.join(','),
      ...rows.map(r =>
        [
          `"${r.iterationLabel}"`,
          r.lineNumber,
          r.low,
          r.high,
          r.mid,
          r.midValue !== null ? r.midValue : '""',
          `"${r.comparison}"`,
          `"${r.actionNote}"`,
          `"${r.remainingRange}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'binary_search_trace.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <TableIcon className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800">
            トレース表 (変数の推移)
          </h3>
          <span className="text-xs text-slate-500">
            {activeRows.length} / {rows.length} ステージ実行済
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTableAsText}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title="タブ区切りテキストとしてコピー"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'コピー完了' : '表をコピー'}</span>
          </button>

          <button
            onClick={downloadCSV}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            title="CSV形式で保存"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV出力</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-2.5 px-3 whitespace-nowrap">状態 / 回数</th>
              <th className="py-2.5 px-2 text-center whitespace-nowrap">実行行</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap bg-emerald-50/60 text-emerald-800">low</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap bg-amber-50/60 text-amber-800">high</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap bg-indigo-50/60 text-indigo-800">mid</th>
              <th className="py-2.5 px-3 text-center whitespace-nowrap">t[mid]</th>
              <th className="py-2.5 px-3 whitespace-nowrap">条件・比較</th>
              <th className="py-2.5 px-3 whitespace-nowrap">処理内容</th>
              <th className="py-2.5 px-3 whitespace-nowrap">残りの探索範囲</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
            {rows.map((row, idx) => {
              const isPassed = row.stepIndex <= currentStepIndex;
              const isCurrent =
                isPassed &&
                (idx === rows.length - 1 ||
                  rows[idx + 1].stepIndex > currentStepIndex);

              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectStep && onSelectStep(row.stepIndex)}
                  className={`transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-50/80 font-semibold text-indigo-950 ring-1 ring-inset ring-indigo-200'
                      : isPassed
                      ? 'hover:bg-slate-50'
                      : 'opacity-35 bg-slate-50/50'
                  }`}
                >
                  <td className="py-2 px-3 whitespace-nowrap font-sans font-medium text-slate-800">
                    <div className="flex items-center gap-1.5">
                      {isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                      )}
                      <span>{row.iterationLabel}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2 text-center whitespace-nowrap text-slate-500 tabular-nums">
                    行 {row.lineNumber}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-emerald-700 tabular-nums bg-emerald-50/30">
                    {row.low}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-amber-700 tabular-nums bg-amber-50/30">
                    {row.high}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-indigo-700 tabular-nums bg-indigo-50/30">
                    {row.mid}
                  </td>
                  <td className="py-2 px-3 text-center font-bold text-slate-900 tabular-nums">
                    {row.midValue !== null ? row.midValue : '-'}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap font-sans text-slate-600">
                    {row.comparison}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap font-sans text-slate-800">
                    {row.actionNote}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap text-[11px] text-slate-500">
                    {row.remainingRange}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
