import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
  SlidersHorizontal,
  RotateCw,
  Search,
} from 'lucide-react';
import { PRESET_CASES, DEFAULT_ARRAY } from '../utils/binarySearchTracer';

interface ExecutionControlsProps {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  playbackSpeed: number;
  keyToSearch: number;
  currentArray: number[];
  onSetStepIndex: (index: number) => void;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onGoToEnd: () => void;
  onChangeSpeed: (speed: number) => void;
  onChangeKey: (newKey: number) => void;
  onUpdateArray: (newArray: number[]) => void;
}

export const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  currentStepIndex,
  totalSteps,
  isPlaying,
  playbackSpeed,
  keyToSearch,
  currentArray,
  onSetStepIndex,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onGoToEnd,
  onChangeSpeed,
  onChangeKey,
  onUpdateArray,
}) => {
  const [customKeyInput, setCustomKeyInput] = useState<string>(keyToSearch.toString());
  const [showArrayEditor, setShowArrayEditor] = useState<boolean>(false);
  const [arrayInputText, setArrayInputText] = useState<string>(currentArray.join(', '));
  const [arrayError, setArrayError] = useState<string | null>(null);

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customKeyInput.trim(), 10);
    if (!isNaN(val)) {
      onChangeKey(val);
    }
  };

  const handleApplyCustomArray = () => {
    try {
      const parts = arrayInputText
        .split(/[,\s]+/)
        .map(s => s.trim())
        .filter(s => s.length > 0)
        .map(s => parseInt(s, 10));

      if (parts.some(isNaN)) {
        setArrayError('半角数字をカンマ区切りで入力してください');
        return;
      }
      if (parts.length < 2) {
        setArrayError('要素数は2個以上必要です');
        return;
      }
      if (parts.length > 15) {
        setArrayError('要素数は最大15個まで推奨です');
        return;
      }

      // Check if sorted
      const isSorted = parts.every((v, i) => i === 0 || v >= parts[i - 1]);
      if (!isSorted) {
        // Auto-sort with user notice
        parts.sort((a, b) => a - b);
        setArrayInputText(parts.join(', '));
      }

      setArrayError(null);
      onUpdateArray(parts);
      setShowArrayEditor(false);
    } catch {
      setArrayError('入力形式を確認してください');
    }
  };

  const handleResetToDefaultArray = () => {
    setArrayInputText(DEFAULT_ARRAY.join(', '));
    setArrayError(null);
    onUpdateArray([...DEFAULT_ARRAY]);
    setShowArrayEditor(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
      {/* Upper row: Playback transport & slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span>ステップ実行制御</span>
            <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
              ステップ {currentStepIndex + 1} / {totalSteps}
            </span>
          </div>

          {/* Speed switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
            {[0.5, 1, 2, 3].map(speed => (
              <button
                key={speed}
                onClick={() => onChangeSpeed(speed)}
                className={`px-2 py-0.5 rounded font-medium transition-colors ${
                  playbackSpeed === speed
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Scrub slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={totalSteps - 1}
            value={currentStepIndex}
            onChange={e => onSetStepIndex(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none"
          />
        </div>

        {/* Buttons transport */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={onReset}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="最初に戻る"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStepIndex <= 0}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="1ステップ戻る"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onTogglePlay}
            className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-colors shadow-xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>一時停止</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>自動再生</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="1ステップ進む"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onGoToEnd}
            disabled={currentStepIndex >= totalSteps - 1}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="最後まで実行"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Lower row: Search Key Input & Presets */}
      <div className="pt-3 border-t border-slate-100 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-slate-700">
            探索値 (key) の指定とプリセット
          </span>

          <button
            onClick={() => setShowArrayEditor(!showArrayEditor)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showArrayEditor ? '配列編集を閉じる' : '配列を変更する'}</span>
          </button>
        </div>

        {/* Custom Key form */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleKeySubmit} className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-[200px]">
              <input
                type="number"
                value={customKeyInput}
                onChange={e => setCustomKeyInput(e.target.value)}
                placeholder="探索する値"
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono font-bold rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors shrink-0"
            >
              設定して探索
            </button>
          </form>

          <span className="text-xs text-slate-400 hidden sm:inline">またはクイック選択:</span>
        </div>

        {/* Presets Grid */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PRESET_CASES.map(preset => {
            const isSelected = keyToSearch === preset.key;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setCustomKeyInput(preset.key.toString());
                  onChangeKey(preset.key);
                }}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all text-left ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                title={preset.description}
              >
                key={preset.key}
                <span className="ml-1 text-[10px] opacity-80 font-sans">
                  {preset.key === 38
                    ? '(画像の例)'
                    : preset.expectedResult === 'found'
                    ? `[添字${preset.expectedIndex}]`
                    : '[該当なし]'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Optional Array Editor */}
        {showArrayEditor && (
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                配列 t の要素をカスタマイズ (昇順に自動ソートされます)
              </span>
              <button
                onClick={handleResetToDefaultArray}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RotateCw className="w-3 h-3" />
                <span>デフォルトに戻す</span>
              </button>
            </div>

            <input
              type="text"
              value={arrayInputText}
              onChange={e => setArrayInputText(e.target.value)}
              className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="例: 14, 16, 21, 22, 24, 37, 38, 41"
            />

            {arrayError && (
              <p className="text-xs text-rose-600 font-medium">{arrayError}</p>
            )}

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowArrayEditor(false)}
                className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-800"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={handleApplyCustomArray}
                className="px-3 py-1 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded"
              >
                配列を反映する
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
