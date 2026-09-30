import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, RefreshCw, Lightbulb, CheckCircle2, RotateCcw } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';
import { audioEngine } from '../../utils/audioEngine';

interface LetterTile {
  id: string;
  char: string;
}

interface SpellingTrainViewProps {
  jobs: JobItem[];
}

export const SpellingTrainView: React.FC<SpellingTrainViewProps> = ({ jobs }) => {
  const [jobIdx, setJobIdx] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<LetterTile[]>([]);
  const [availableLetters, setAvailableLetters] = useState<LetterTile[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);

  const currentJob = jobs[jobIdx];
  const targetChars = currentJob.spellingWord.split('');

  const initWord = (idx: number) => {
    const job = jobs[idx];
    const letters: LetterTile[] = job.spellingWord.split('').map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
    }));

    // Shuffle letters
    const shuffled = [...letters].sort(() => 0.5 - Math.random());
    setAvailableLetters(shuffled);
    setPlacedLetters([]);
    setIsCompleted(false);
    setHintUsed(false);

    // Pronounce the word
    setTimeout(() => {
      audioEngine.speak(job.word);
    }, 300);
  };

  useEffect(() => {
    initWord(jobIdx);
  }, [jobIdx]);

  const handlePickLetter = (tile: LetterTile) => {
    if (isCompleted) return;
    audioEngine.playLetter();
    audioEngine.speak(tile.char.toLowerCase());

    const nextPlaced = [...placedLetters, tile];
    const nextAvailable = availableLetters.filter((t) => t.id !== tile.id);

    setPlacedLetters(nextPlaced);
    setAvailableLetters(nextAvailable);

    // Check if whole word is assembled
    if (nextPlaced.length === targetChars.length) {
      const spelled = nextPlaced.map((t) => t.char).join('');
      if (spelled === currentJob.spellingWord) {
        // SUCCESS!
        setIsCompleted(true);
        audioEngine.playCorrect();
        setTimeout(() => {
          audioEngine.speak(currentJob.word);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        }, 400);
      } else {
        // Spelling mistake
        audioEngine.playWrong();
      }
    }
  };

  const handleRemoveLetter = (tile: LetterTile) => {
    if (isCompleted) return;
    audioEngine.playClick();

    setPlacedLetters((prev) => prev.filter((t) => t.id !== tile.id));
    setAvailableLetters((prev) => [...prev, tile]);
  };

  const handleResetCurrent = () => {
    audioEngine.playClick();
    initWord(jobIdx);
  };

  const handleHint = () => {
    if (isCompleted) return;
    audioEngine.playClick();
    setHintUsed(true);

    // Find the next expected character
    const currentLength = placedLetters.length;
    if (currentLength < targetChars.length) {
      const nextNeededChar = targetChars[currentLength];
      const matchInAvailable = availableLetters.find((t) => t.char === nextNeededChar);
      if (matchInAvailable) {
        handlePickLetter(matchInAvailable);
      }
    }
  };

  const handleNextJob = () => {
    audioEngine.playFlip();
    const next = (jobIdx + 1) % jobs.length;
    setJobIdx(next);
  };

  const handlePrevJob = () => {
    audioEngine.playFlip();
    const prev = (jobIdx - 1 + jobs.length) % jobs.length;
    setJobIdx(prev);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl font-bold">
            🚂
          </span>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">字母拼写小火车</h3>
            <div className="text-xs text-slate-500">
              把乱序字母组装成正确的职业单词车厢！
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleHint}
            disabled={isCompleted}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
            title="获得下一个字母提示"
          >
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>字母提示</span>
          </button>

          <button
            onClick={handleResetCurrent}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置字母</span>
          </button>
        </div>
      </div>

      {/* Main Train Track Station */}
      <div className="bg-gradient-to-b from-sky-100/60 via-amber-50/40 to-emerald-50/50 rounded-3xl p-6 sm:p-8 border-2 border-sky-200 shadow-lg relative overflow-hidden">
        {/* Job Picture & Pronounce Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-sky-200/60">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-2xl p-2 border-2 border-sky-300 shadow-sm flex items-center justify-center">
              <JobIllustration id={currentJob.id} size="sm" className="w-16 h-16" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900">{currentJob.word}</span>
                <span className="text-lg font-bold text-sky-600">({currentJob.chinese})</span>
              </div>
              <div className="text-xs font-mono text-slate-500">{currentJob.phonetic}</div>
            </div>
          </div>

          <button
            onClick={() => audioEngine.speak(currentJob.word)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>听单词发音</span>
          </button>
        </div>

        {/* The Train with Letter Carriages */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-600 flex items-center gap-1">
            <span>🚃 目标车厢卡槽 (点击字母卡片填入)：</span>
          </div>

          {/* Train Head + Empty / Filled Slots */}
          <div className="overflow-x-auto pb-4 pt-2">
            <div className="flex items-center gap-2 min-w-max">
              {/* Locomotive / Train Engine */}
              <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-2 text-white shadow-md border-2 border-rose-300 flex flex-col items-center justify-center shrink-0">
                <span className="text-3xl">🚂</span>
                <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">EXPRESS</span>
              </div>

              {/* Connector Pin */}
              <div className="w-3 h-1 bg-slate-400 rounded-full shrink-0" />

              {/* Letter Slots */}
              {targetChars.map((expectedChar, index) => {
                const filledTile = placedLetters[index];
                const isCorrectSlot = filledTile && filledTile.char === expectedChar;
                const isWrongSlot = filledTile && filledTile.char !== expectedChar;

                return (
                  <React.Fragment key={index}>
                    <button
                      onClick={() => filledTile && handleRemoveLetter(filledTile)}
                      disabled={isCompleted}
                      className={`w-14 h-16 sm:w-16 sm:h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 relative shrink-0 ${
                        filledTile
                          ? isCompleted || isCorrectSlot
                            ? 'bg-emerald-400 text-white font-black text-2xl sm:text-3xl shadow-md border-2 border-emerald-500'
                            : 'bg-rose-400 text-white font-black text-2xl sm:text-3xl shadow-md border-2 border-rose-500 animate-shake'
                          : 'bg-white/80 border-2 border-dashed border-sky-300 text-slate-300 font-bold text-sm'
                      }`}
                    >
                      {filledTile ? (
                        <>
                          <span>{filledTile.char}</span>
                          <span className="text-[9px] uppercase opacity-75 mt-0.5 font-sans">
                            {index + 1}
                          </span>
                        </>
                      ) : (
                        <span className="text-slate-400 font-mono">?</span>
                      )}

                      {/* Small train wheels below */}
                      <div className="absolute -bottom-2 inset-x-2 flex justify-between">
                        <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-300 shadow-2xs" />
                        <span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-300 shadow-2xs" />
                      </div>
                    </button>
                    {index < targetChars.length - 1 && (
                      <div className="w-2 h-1 bg-slate-300 rounded-full shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        {/* Railway tracks visual */}
        <div className="h-3 w-full bg-amber-900/20 rounded-full my-4 flex items-center justify-around px-2">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1 h-3 bg-amber-900/40 rounded-xs" />
          ))}
        </div>

        {/* Available Scrambled Letter Tiles */}
        <div className="mt-6 pt-4 border-t border-sky-200/60">
          <div className="text-xs font-bold text-slate-600 mb-3">
            📦 待装车字母库 (请按顺序点击拼出单词)：
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {availableLetters.length > 0 ? (
              availableLetters.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handlePickLetter(tile)}
                  className="w-12 h-14 sm:w-14 sm:h-16 bg-white hover:bg-amber-100 text-slate-800 hover:text-amber-950 font-black text-2xl rounded-2xl shadow-md border-2 border-amber-300 flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                  {tile.char}
                </button>
              ))
            ) : isCompleted ? (
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>拼写完全正确！呜呜呜——小火车出发咯！🚂💨</span>
              </div>
            ) : (
              <div className="text-xs text-rose-600 font-semibold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                还有字母顺序不对哦，点击红色车厢可以退回重选！
              </div>
            )}
          </div>
        </div>

        {/* Success Navigation Footer */}
        {isCompleted && (
          <div className="mt-6 bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-md flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <div className="font-extrabold text-slate-900 text-base">
                  拼写大明星！你拼出了：{currentJob.word}！
                </div>
                <div className="text-xs text-slate-500">
                  例句："{currentJob.sentence}"
                </div>
              </div>
            </div>

            <button
              onClick={handleNextJob}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              拼写下一辆小火车 ➔
            </button>
          </div>
        )}
      </div>

      {/* Switch between all 9 jobs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {jobs.map((job, idx) => (
          <button
            key={job.id}
            onClick={() => setJobIdx(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              idx === jobIdx
                ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-300'
                : 'bg-white hover:bg-sky-50 border-slate-200 text-slate-600'
            }`}
          >
            {job.word}
          </button>
        ))}
      </div>
    </div>
  );
};
