import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, HelpCircle, CheckCircle2, XCircle, Sparkles, RefreshCw, Trophy, Flame } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';
import { audioEngine } from '../../utils/audioEngine';

interface RiddleGameViewProps {
  jobs: JobItem[];
}

export const RiddleGameView: React.FC<RiddleGameViewProps> = ({ jobs }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffledJobs, setShuffledJobs] = useState<JobItem[]>([]);
  const [options, setOptions] = useState<JobItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Initialize riddle game
  const initGame = () => {
    audioEngine.playClick();
    const shuffled = [...jobs].sort(() => 0.5 - Math.random());
    setShuffledJobs(shuffled);
    setCurrentIdx(0);
    setStreak(0);
    setScore(0);
    setIsFinished(false);
    loadQuestion(0, shuffled);
  };

  const loadQuestion = (index: number, jobList: JobItem[]) => {
    const current = jobList[index];
    if (!current) {
      setIsFinished(true);
      return;
    }

    // Pick 3 distractors
    const otherJobs = jobs.filter((j) => j.id !== current.id);
    const distractors = [...otherJobs].sort(() => 0.5 - Math.random()).slice(0, 3);
    const roundOptions = [current, ...distractors].sort(() => 0.5 - Math.random());

    setOptions(roundOptions);
    setSelectedId(null);
    setIsAnswered(false);
    setIsCorrect(false);

    // Speak clue audio
    setTimeout(() => {
      audioEngine.speak(`Who am I? ${current.riddleClue}`);
    }, 400);
  };

  useEffect(() => {
    initGame();
  }, [jobs]);

  const targetJob = shuffledJobs[currentIdx];

  const handleSelectOption = (option: JobItem) => {
    if (isAnswered) return;

    setSelectedId(option.id);
    setIsAnswered(true);

    if (option.id === targetJob.id) {
      // Correct
      audioEngine.playCorrect();
      audioEngine.speak(`Yes! I am a ${targetJob.word}!`);
      setIsCorrect(true);
      setStreak((s) => s + 1);
      setScore((sc) => sc + 100 + streak * 20);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } else {
      // Wrong
      audioEngine.playWrong();
      audioEngine.speak(`Not quite, try to think: ${targetJob.chinese}`);
      setIsCorrect(false);
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    audioEngine.playClick();
    const nextIdx = currentIdx + 1;
    if (nextIdx >= shuffledJobs.length) {
      setIsFinished(true);
      audioEngine.playFanfare();
      confetti({
        particleCount: 150,
        spread: 90,
      });
    } else {
      setCurrentIdx(nextIdx);
      loadQuestion(nextIdx, shuffledJobs);
    }
  };

  const handleSpeakClue = () => {
    audioEngine.playClick();
    if (targetJob) {
      audioEngine.speak(`Who am I? ${targetJob.riddleClue}`);
    }
  };

  if (!targetJob && !isFinished) return null;

  return (
    <div className="space-y-6">
      {/* Header HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
            🕵️
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">我是谁？听音猜谜大挑战</h3>
            <div className="text-xs text-slate-500">
              第 {currentIdx + 1} 题 / 共 {shuffledJobs.length} 题
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          {streak > 1 && (
            <div className="flex items-center gap-1 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-xl border border-rose-200 animate-bounce">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>{streak} 连胜！</span>
            </div>
          )}

          <div className="bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
            <span>⭐ 得分:</span>
            <span className="font-mono text-base">{score}</span>
          </div>

          <button
            onClick={initGame}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新开始</span>
          </button>
        </div>
      </div>

      {!isFinished ? (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Riddle Clue Card */}
          <div className="bg-gradient-to-br from-white to-purple-50/60 rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-lg relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Mystery Character Shadow / Avatar */}
              <div className="relative shrink-0">
                <div
                  className={`w-32 h-32 rounded-3xl flex items-center justify-center border-4 transition-all duration-300 ${
                    isAnswered && isCorrect
                      ? 'bg-emerald-50 border-emerald-300 scale-105 shadow-lg'
                      : 'bg-slate-100 border-purple-200 shadow-inner'
                  }`}
                >
                  {isAnswered && isCorrect ? (
                    <JobIllustration id={targetJob.id} size="lg" />
                  ) : (
                    <div className="text-center">
                      <HelpCircle className="w-14 h-14 text-purple-400 mx-auto animate-pulse" />
                      <span className="text-xs font-extrabold text-purple-600 tracking-wider">
                        WHO AM I?
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Clue Text & Voice Button */}
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                  <Sparkles className="w-3.5 h-3.5" />
                  听听神秘提示 (Listen to the Clue)
                </div>

                <div className="text-lg sm:text-xl font-bold text-slate-800 leading-snug">
                  "{targetJob.riddleClue}"
                </div>

                <div className="text-sm text-slate-600 bg-white/70 p-2.5 rounded-xl border border-purple-100">
                  💡 中文线索：{targetJob.chineseClue}
                </div>

                <button
                  onClick={handleSpeakClue}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>再听一遍英文提示</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Choices Grid */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option) => {
              const isSelected = selectedId === option.id;
              const isOptionCorrect = option.id === targetJob.id;

              let btnStyle = 'bg-white hover:bg-sky-50 border-2 border-slate-200 shadow-sm';
              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 shadow-md ring-4 ring-emerald-200';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-100 border-2 border-rose-400 text-rose-950';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                  className={`p-4 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${btnStyle}`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <JobIllustration id={option.id} size="md" />
                  </div>
                  <div className="text-center">
                    <div className="text-base sm:text-lg font-extrabold text-slate-900">
                      {option.word}
                    </div>
                    <div className="text-xs text-slate-500">{option.chinese}</div>
                  </div>

                  {isAnswered && isOptionCorrect && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 正确答案
                    </span>
                  )}
                  {isAnswered && isSelected && !isOptionCorrect && (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-700 bg-white px-2 py-0.5 rounded-full border border-rose-300">
                      <XCircle className="w-3.5 h-3.5" /> 再接再厉
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Bar & Next Button */}
          {isAnswered && (
            <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-md flex items-center justify-between animate-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{isCorrect ? '🎉' : '💪'}</span>
                <div>
                  <div className="font-bold text-slate-800 text-sm">
                    {isCorrect ? '太棒了！答对了！' : `别灰心，正确职业是：${targetJob.word} (${targetJob.chinese})`}
                  </div>
                  <div className="text-xs text-slate-500">
                    "{targetJob.sentence}"
                  </div>
                </div>
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95"
              >
                {currentIdx + 1 >= shuffledJobs.length ? '查看总成绩 🏆' : '下一题 ➔'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Final Result */
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto text-center border-4 border-amber-300 shadow-xl space-y-5 animate-in zoom-in-95">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-amber-200 animate-bounce">
            🎖️
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">猜谜大挑战圆满完成！</h3>
            <p className="text-sm text-slate-600 mt-1">你的听力与职业辨析能力太厉害了！</p>
          </div>

          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <div className="text-xs text-slate-500">最终总得分</div>
            <div className="text-4xl font-black text-amber-900 font-mono mt-1">{score}</div>
          </div>

          <button
            onClick={initGame}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>再挑战一次</span>
          </button>
        </div>
      )}
    </div>
  );
};
