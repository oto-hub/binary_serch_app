import React from 'react';
import { X, ExternalLink, HelpCircle } from 'lucide-react';

interface OriginalImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalImageModal: React.FC<OriginalImageModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              添付された原題プログラム画像
            </h3>
            <span className="text-xs text-slate-500">
              (手書きの赤字・空欄解答入り)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Content */}
        <div className="p-4 overflow-y-auto flex-1 flex flex-col items-center bg-slate-100">
          <div className="bg-white p-2 rounded-xl shadow-xs border border-slate-200 max-w-full">
            <img
              src="/public/assets/aistudio/image_65f299b0.png"
              alt="二分探索の元プログラム画像"
              className="max-h-[60vh] object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="mt-4 p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 w-full space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              <span>原題と手書きメモの照合</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>
                <strong>(ア)</strong> <code className="font-mono text-rose-600 font-bold">tの要素数 - 1</code>（手書きの赤字「7」＝ 8 - 1）
              </li>
              <li>
                <strong>(イ)</strong> <code className="font-mono text-rose-600 font-bold">(low ≦ high) and (t[mid] ≠ key)</code>（whileループ継続条件）
              </li>
              <li>
                <strong>(ウ)</strong> <code className="font-mono text-rose-600 font-bold">t[mid] &gt; key</code>（左側を探索する分岐条件）
              </li>
              <li>
                <strong>(エ)</strong> <code className="font-mono text-rose-600 font-bold">mid - 1</code>（highの更新）
              </li>
              <li>
                <strong>(オ)</strong> <code className="font-mono text-rose-600 font-bold">mid + 1</code>（lowの更新）
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            当アプリはこのコードの実行ステップを完全再現しています
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
