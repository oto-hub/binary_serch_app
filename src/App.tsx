import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DEFAULT_ARRAY, generateBinarySearchTrace } from './utils/binarySearchTracer';
import { ArrayVisualizer } from './components/ArrayVisualizer';
import { CodeViewer } from './components/CodeViewer';
import { TraceTable } from './components/TraceTable';
import { ExecutionControls } from './components/ExecutionControls';
import { ExplanationPanel } from './components/ExplanationPanel';
import { OriginalImageModal } from './components/OriginalImageModal';
import { ExamBlankQuiz } from './components/ExamBlankQuiz';
import {
  Binary,
  Layers,
  HelpCircle,
  FileImage,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [array, setArray] = useState<number[]>(DEFAULT_ARRAY);
  const [keyToSearch, setKeyToSearch] = useState<number>(38);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showAnswers, setShowAnswers] = useState<boolean>(true);

  // Modals
  const [isOriginalImageModalOpen, setIsOriginalImageModalOpen] = useState<boolean>(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState<boolean>(false);

  // Generate trace steps and trace table rows
  const { steps, tableRows } = useMemo(() => {
    return generateBinarySearchTrace(array, keyToSearch);
  }, [array, keyToSearch]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Playback timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(300, 1400 / playbackSpeed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  // Step controls
  const handleTogglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleGoToEnd = () => {
    setIsPlaying(false);
    setCurrentStepIndex(steps.length - 1);
  };

  const handleChangeKey = (newKey: number) => {
    setIsPlaying(false);
    setKeyToSearch(newKey);
    setCurrentStepIndex(0);
  };

  const handleUpdateArray = (newArray: number[]) => {
    setIsPlaying(false);
    setArray(newArray);
    setCurrentStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Contract (1 row, 3 zones: Brand - Nav links - Primary action) */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Wordmark / Title */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Binary className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-slate-900">
                二分探索 (binarySearch) トレース可視化
              </span>
              <span className="text-xs text-slate-500 hidden md:inline ml-2">
                共通テスト・情報処理技術者試験擬似言語
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation / Quick tool triggers */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setIsOriginalImageModalOpen(true)}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <FileImage className="w-4 h-4 text-slate-400" />
              <span>原題画像 (赤ペン回答)</span>
            </button>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>空欄演習 (ア)〜(オ)</span>
            </button>

            <button
              onClick={() => {
                setArray([...DEFAULT_ARRAY]);
                setKeyToSearch(38);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-xs text-slate-500"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>初期状態に戻す</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>空欄 (ア)〜(オ) の解説</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Top Banner Notice */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>
              添付画像にある <code className="font-mono font-bold text-slate-900">○binarySearch()</code> の擬似言語アルゴリズムを忠実にトレース実行しています。
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
            <span>初期配列: {'{14, 16, 21, 22, 24, 37, 38, 41}'}</span>
            <span aria-hidden="true">·</span>
            <span>手書き回答: high ← 7 (要素数 - 1)</span>
          </div>
        </div>

        {/* 1. Array Visualizer (The Core Stage) */}
        <ArrayVisualizer
          currentStep={currentStep}
          array={array}
          keyToSearch={keyToSearch}
        />

        {/* 2. Execution Controls (Scrub slider, play/pause, presets, custom key) */}
        <ExecutionControls
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          isPlaying={isPlaying}
          playbackSpeed={playbackSpeed}
          keyToSearch={keyToSearch}
          currentArray={array}
          onSetStepIndex={setCurrentStepIndex}
          onTogglePlay={handleTogglePlay}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          onReset={handleReset}
          onGoToEnd={handleGoToEnd}
          onChangeSpeed={setPlaybackSpeed}
          onChangeKey={handleChangeKey}
          onUpdateArray={handleUpdateArray}
        />

        {/* 3. Two-Column Split: Detailed Explanation & Trace Table on Left, Authentic Code Viewer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Column (7 cols): Explanation & Trace Table */}
          <div className="lg:col-span-7 space-y-5">
            {/* Real-time Line & Variables Explanation */}
            <ExplanationPanel
              currentStep={currentStep}
              totalSteps={steps.length}
            />

            {/* Comprehensive Trace Table */}
            <TraceTable
              rows={tableRows}
              currentStepIndex={currentStepIndex}
              onSelectStep={stepIdx => {
                setIsPlaying(false);
                setCurrentStepIndex(stepIdx);
              }}
            />
          </div>

          {/* Right Column (5 cols): Authentic Pseudocode with line highlighting */}
          <div className="lg:col-span-5 sticky top-20">
            <CodeViewer
              currentLine={currentStep.lineNumber}
              showAnswers={showAnswers}
              onToggleShowAnswers={() => setShowAnswers(!showAnswers)}
              onOpenOriginalImage={() => setIsOriginalImageModalOpen(true)}
              onOpenQuiz={() => setIsQuizModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t border-slate-200 bg-white py-5 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="font-semibold text-slate-700">二分探索（バイナリサーチ）学習シミュレーター</span>
            <span className="mx-2">·</span>
            <span>時間計算量: O(log N)</span>
            <span className="mx-2">·</span>
            <span>空間計算量: O(1)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>情報処理技術者試験 / 共通テスト「情報I」対応</span>
          </div>
        </div>
      </footer>

      {/* Original Image Modal */}
      <OriginalImageModal
        isOpen={isOriginalImageModalOpen}
        onClose={() => setIsOriginalImageModalOpen(false)}
      />

      {/* Quiz Modal */}
      <ExamBlankQuiz
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
}
