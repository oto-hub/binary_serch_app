import React from 'react';
import { Eye, EyeOff, FileText, HelpCircle } from 'lucide-react';
import { CODE_LINES } from '../utils/binarySearchTracer';

interface CodeViewerProps {
  currentLine: number;
  showAnswers: boolean;
  onToggleShowAnswers: () => void;
  onOpenOriginalImage: () => void;
  onOpenQuiz: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  currentLine,
  showAnswers,
  onToggleShowAnswers,
  onOpenOriginalImage,
  onOpenQuiz,
}) => {
  // Render line text with boxed blanks or answers
  const renderLineContent = (text: string) => {
    // Blank (ア)
    if (text.includes('(ア)')) {
      return (
        <span>
          {'  high ← '}
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-700 bg-white px-2 py-0.5 rounded text-xs font-mono">
            <span className="text-slate-500 font-bold">(ア)</span>
            {showAnswers ? (
              <span className="text-rose-600 font-bold">tの要素数 - 1</span>
            ) : (
              <span className="text-slate-400 font-serif italic">［ 空欄 (ア) ］</span>
            )}
          </span>
          {showAnswers && (
            <span className="ml-2 font-bold text-rose-500 text-xs font-mono">
              [= 7]
            </span>
          )}
        </span>
      );
    }

    // Blank (イ)
    if (text.includes('(イ)')) {
      return (
        <span>
          {'  while( '}
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-700 bg-white px-2 py-0.5 rounded text-xs font-mono">
            <span className="text-slate-500 font-bold">(イ)</span>
            {showAnswers ? (
              <span className="text-rose-600 font-bold">(low ≦ high) and (t[mid] ≠ key)</span>
            ) : (
              <span className="text-slate-400 font-serif italic">［ 空欄 (イ) ］</span>
            )}
          </span>
          {' )'}
        </span>
      );
    }

    // Blank (ウ)
    if (text.includes('(ウ)')) {
      return (
        <span>
          {'    if( '}
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-700 bg-white px-2 py-0.5 rounded text-xs font-mono">
            <span className="text-slate-500 font-bold">(ウ)</span>
            {showAnswers ? (
              <span className="text-rose-600 font-bold">t[mid] &gt; key</span>
            ) : (
              <span className="text-slate-400 font-serif italic">［ 空欄 (ウ) ］</span>
            )}
          </span>
          {' )'}
        </span>
      );
    }

    // Blank (エ)
    if (text.includes('(エ)')) {
      return (
        <span>
          {'      high ← '}
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-700 bg-white px-2 py-0.5 rounded text-xs font-mono">
            <span className="text-slate-500 font-bold">(エ)</span>
            {showAnswers ? (
              <span className="text-rose-600 font-bold">mid - 1</span>
            ) : (
              <span className="text-slate-400 font-serif italic">［ 空欄 (エ) ］</span>
            )}
          </span>
        </span>
      );
    }

    // Blank (オ)
    if (text.includes('(オ)')) {
      return (
        <span>
          {'      low ← '}
          <span className="inline-flex items-center gap-1.5 border-2 border-slate-700 bg-white px-2 py-0.5 rounded text-xs font-mono">
            <span className="text-slate-500 font-bold">(オ)</span>
            {showAnswers ? (
              <span className="text-rose-600 font-bold">mid + 1</span>
            ) : (
              <span className="text-slate-400 font-serif italic">［ 空欄 (オ) ］</span>
            )}
          </span>
        </span>
      );
    }

    return text;
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-slate-100 shadow-md flex flex-col h-full overflow-hidden">
      {/* Code Header Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
          <span className="text-xs font-medium text-slate-300 ml-2 font-mono">
            binarySearch.txt (出題プログラム)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleShowAnswers}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="空欄 (ア)〜(オ) の解答表示切り替え"
          >
            {showAnswers ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showAnswers ? '解答を隠す' : '解答を表示'}</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            title="空欄補充の演習問題を開く"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>空欄演習</span>
          </button>

          <button
            onClick={onOpenOriginalImage}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            title="元画像を表示"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">元画像</span>
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div className="p-3 overflow-y-auto max-h-[580px] font-mono text-xs leading-6 selection:bg-indigo-500/30">
        {CODE_LINES.map(({ line, text }) => {
          const isCurrent = line === currentLine;

          return (
            <div
              key={line}
              className={`flex items-start rounded px-2 py-0.5 transition-colors ${
                isCurrent
                  ? 'bg-amber-400/20 text-white border-l-2 border-amber-400 font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              {/* Line Number */}
              <span
                className={`w-7 shrink-0 text-right pr-3 select-none text-[11px] tabular-nums ${
                  isCurrent ? 'text-amber-400 font-bold' : 'text-slate-600'
                }`}
              >
                {line}
              </span>

              {/* Execution pointer marker */}
              <span className="w-4 shrink-0 text-amber-400 select-none">
                {isCurrent ? '▶' : ''}
              </span>

              {/* Line Code Content */}
              <span className="whitespace-pre flex-1">
                {renderLineContent(text)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
        <span>現在実行行: {currentLine > 0 ? `第 ${currentLine} 行` : '待機中'}</span>
        <span className="text-slate-500">共通テスト「情報」/ 情報処理技術者試験準拠</span>
      </div>
    </div>
  );
};
