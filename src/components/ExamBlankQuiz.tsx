import React, { useState } from 'react';
import { BLANK_QUESTIONS } from '../utils/binarySearchTracer';
import { X, CheckCircle2, AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';

interface ExamBlankQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamBlankQuiz: React.FC<ExamBlankQuizProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleSelect = (questionId: string, option: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const toggleHint = (questionId: string) => {
    setShowHints(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const totalQuestions = BLANK_QUESTIONS.length;
  const correctCount = BLANK_QUESTIONS.filter(
    q => selectedAnswers[q.id] === q.correctAnswer
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">
              共通テスト「情報」・情報処理技術者試験 空欄補充演習 (ア)〜(オ)
            </h3>
            <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
              正解: {correctCount} / {totalQuestions}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            問題用紙のプログラム中にある空欄 <strong>(ア)〜(オ)</strong> に当てはまる最も適切なものを選択肢から選んでください。クリックすると即座に判定と解説が表示されます。
          </p>

          <div className="space-y-4">
            {BLANK_QUESTIONS.map(q => {
              const selected = selectedAnswers[q.id];
              const isAnswered = Boolean(selected);
              const isCorrect = selected === q.correctAnswer;
              const isHintOpen = showHints[q.id];

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-xl border transition-all ${
                    !isAnswered
                      ? 'bg-white border-slate-200'
                      : isCorrect
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-rose-50/40 border-rose-300'
                  }`}
                >
                  {/* Question Title */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold font-mono text-xs flex items-center justify-center">
                        {q.blankSymbol}
                      </span>
                      <span className="font-bold text-sm text-slate-900">
                        {q.title}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleHint(q.id)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{isHintOpen ? 'ヒントを閉じる' : 'ヒント'}</span>
                    </button>
                  </div>

                  {/* Hint view */}
                  {isHintOpen && (
                    <div className="mb-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                      <strong>💡 ヒント:</strong> {q.hint}
                    </div>
                  )}

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {q.options.map(opt => {
                      const isThisSelected = selected === opt;
                      const isThisCorrect = opt === q.correctAnswer;

                      let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                        } else if (isThisSelected && !isThisCorrect) {
                          btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 line-through';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleSelect(q.id, opt)}
                          className={`p-2.5 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />
                          )}
                          {isAnswered && isThisSelected && !isThisCorrect && (
                            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 ml-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after answer */}
                  {isAnswered && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs">
                      <div className="flex items-center gap-1 font-bold mb-1">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 正解！
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> 不正解（正解: {q.correctAnswer}）
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            全問正解を目指してアルゴリズムの理屈を押さえましょう
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            完了
          </button>
        </div>
      </div>
    </div>
  );
};
