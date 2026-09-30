import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Trophy, Swords, RefreshCw, Zap, Users, User } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';
import { audioEngine } from '../../utils/audioEngine';

interface ClassroomBattleViewProps {
  jobs: JobItem[];
}

export const ClassroomBattleView: React.FC<ClassroomBattleViewProps> = ({ jobs }) => {
  const [battleMode, setBattleMode] = useState<'twoPlayer' | 'solo'>('twoPlayer');
  const [currentRound, setCurrentRound] = useState(1);
  const totalRounds = 10;
  const [targetJob, setTargetJob] = useState<JobItem | null>(null);
  const [options, setOptions] = useState<JobItem[]>([]);
  const [redScore, setRedScore] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [roundWinner, setRoundWinner] = useState<'red' | 'blue' | null>(null);
  const [isRoundActive, setIsRoundActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [promptType, setPromptType] = useState<'voice' | 'word' | 'chinese'>('voice');

  const startNewRound = (roundNum: number) => {
    if (roundNum > totalRounds) {
      setGameOver(true);
      setIsRoundActive(false);
      audioEngine.playFanfare();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });
      return;
    }

    const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
    const otherJobs = jobs.filter((j) => j.id !== randomJob.id);
    const shuffledOthers = [...otherJobs].sort(() => 0.5 - Math.random()).slice(0, 3);
    const roundOptions = [randomJob, ...shuffledOthers].sort(() => 0.5 - Math.random());

    const promptTypes: ('voice' | 'word' | 'chinese')[] = ['voice', 'word', 'chinese'];
    const selectedPrompt = promptTypes[Math.floor(Math.random() * promptTypes.length)];

    setTargetJob(randomJob);
    setOptions(roundOptions);
    setPromptType(selectedPrompt);
    setRoundWinner(null);
    setIsRoundActive(true);

    // Speak audio
    setTimeout(() => {
      audioEngine.speak(`Find the: ${randomJob.word}`);
    }, 300);
  };

  const handleStartGame = () => {
    audioEngine.playClick();
    setCurrentRound(1);
    setRedScore(0);
    setBlueScore(0);
    setGameOver(false);
    startNewRound(1);
  };

  useEffect(() => {
    handleStartGame();
  }, [jobs, battleMode]);

  const handlePlayerTap = (player: 'red' | 'blue', selectedJob: JobItem) => {
    if (!isRoundActive || !targetJob) return;

    if (selectedJob.id === targetJob.id) {
      // Correct!
      audioEngine.playCorrect();
      setIsRoundActive(false);
      setRoundWinner(player);

      if (player === 'red') {
        setRedScore((s) => s + 1);
      } else {
        setBlueScore((s) => s + 1);
      }

      setTimeout(() => {
        const nextRound = currentRound + 1;
        setCurrentRound(nextRound);
        startNewRound(nextRound);
      }, 1500);
    } else {
      // Wrong tap
      audioEngine.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controller */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">班级抢答大PK (互动电子白板专区)</h3>
            <div className="text-xs text-slate-500">
              第 {Math.min(currentRound, totalRounds)} / {totalRounds} 回合
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setBattleMode('twoPlayer')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                battleMode === 'twoPlayer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>红蓝双人PK</span>
            </button>
            <button
              onClick={() => setBattleMode('solo')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                battleMode === 'solo'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>单人速答</span>
            </button>
          </div>

          <button
            onClick={handleStartGame}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新对决</span>
          </button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div
          className={`p-4 rounded-3xl border-2 transition-all text-center ${
            roundWinner === 'red'
              ? 'bg-rose-100 border-rose-500 shadow-lg ring-4 ring-rose-200 scale-102'
              : 'bg-rose-50 border-rose-200'
          }`}
        >
          <div className="text-xs font-extrabold text-rose-700 uppercase tracking-wider">
            🔴 红队得分 (Red Team)
          </div>
          <div className="text-4xl font-black text-rose-900 font-mono mt-1">{redScore}</div>
        </div>

        <div
          className={`p-4 rounded-3xl border-2 transition-all text-center ${
            roundWinner === 'blue'
              ? 'bg-blue-100 border-blue-500 shadow-lg ring-4 ring-blue-200 scale-102'
              : 'bg-blue-50 border-blue-200'
          }`}
        >
          <div className="text-xs font-extrabold text-blue-700 uppercase tracking-wider">
            {battleMode === 'twoPlayer' ? '🔵 蓝队得分 (Blue Team)' : '⭐ 历史连对'}
          </div>
          <div className="text-4xl font-black text-blue-900 font-mono mt-1">{blueScore}</div>
        </div>
      </div>

      {!gameOver && targetJob ? (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Target Prompt Box */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-300 shadow-md text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-600" />
              抢答目标：快速点击正确的职业！
            </div>

            <div className="flex flex-col items-center justify-center">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 flex items-center gap-3">
                <span>{targetJob.word}</span>
                <span className="text-2xl text-sky-600">({targetJob.chinese})</span>
              </h2>
              <div className="text-sm font-mono text-slate-500 mt-1">{targetJob.phonetic}</div>
            </div>

            <button
              onClick={() => audioEngine.speak(`Find the: ${targetJob.word}`)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
              <span>重新播报目标单词</span>
            </button>
          </div>

          {/* Interactive Battle Stage */}
          {battleMode === 'twoPlayer' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Red Team Board */}
              <div className="bg-rose-50/70 p-5 rounded-3xl border-2 border-rose-200 space-y-3">
                <div className="flex items-center justify-between font-bold text-rose-800 text-sm pb-2 border-b border-rose-200">
                  <span>🔴 红队抢答区 (左侧或学生A)</span>
                  <span className="text-xs">点击下方卡片</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {options.map((opt) => (
                    <button
                      key={`red-${opt.id}`}
                      onClick={() => handlePlayerTap('red', opt)}
                      disabled={!isRoundActive}
                      className="p-3 bg-white hover:bg-rose-100 border-2 border-rose-200 hover:border-rose-400 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xs transition-transform active:scale-90 cursor-pointer disabled:opacity-50"
                    >
                      <JobIllustration id={opt.id} size="sm" />
                      <span className="text-xs font-extrabold text-slate-800">{opt.word}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blue Team Board */}
              <div className="bg-blue-50/70 p-5 rounded-3xl border-2 border-blue-200 space-y-3">
                <div className="flex items-center justify-between font-bold text-blue-800 text-sm pb-2 border-b border-blue-200">
                  <span>🔵 蓝队抢答区 (右侧或学生B)</span>
                  <span className="text-xs">点击下方卡片</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {options.map((opt) => (
                    <button
                      key={`blue-${opt.id}`}
                      onClick={() => handlePlayerTap('blue', opt)}
                      disabled={!isRoundActive}
                      className="p-3 bg-white hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-xs transition-transform active:scale-90 cursor-pointer disabled:opacity-50"
                    >
                      <JobIllustration id={opt.id} size="sm" />
                      <span className="text-xs font-extrabold text-slate-800">{opt.word}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Solo Mode Board */
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handlePlayerTap('red', opt)}
                  disabled={!isRoundActive}
                  className="p-5 bg-white hover:bg-amber-50 border-2 border-amber-300 hover:border-amber-400 rounded-3xl flex flex-col items-center justify-center gap-2 shadow-sm transition-transform active:scale-90 cursor-pointer disabled:opacity-50"
                >
                  <JobIllustration id={opt.id} size="md" />
                  <span className="text-base font-black text-slate-900">{opt.word}</span>
                  <span className="text-xs text-slate-500">{opt.chinese}</span>
                </button>
              ))}
            </div>
          )}

          {/* Feedback banner */}
          {roundWinner && (
            <div className="text-center font-extrabold text-lg text-emerald-700 bg-emerald-100 p-3 rounded-2xl border border-emerald-300 animate-in zoom-in-95">
              🎉 {roundWinner === 'red' ? '🔴 红队抢先答对！+1分' : '🔵 蓝队抢先答对！+1分'}
            </div>
          )}
        </div>
      ) : (
        /* Game Over Trophy Modal */
        <div className="bg-white rounded-3xl p-8 max-w-md mx-auto text-center border-4 border-amber-300 shadow-2xl space-y-5 animate-in zoom-in-95">
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-5xl shadow-inner border border-amber-200 animate-bounce">
            🏆
          </div>

          <div>
            <h3 className="text-2xl font-black text-slate-900">对决结束！荣誉榜揭晓！</h3>
            <p className="text-sm text-slate-600 mt-1">
              {redScore > blueScore
                ? '🎉 恭喜 🔴 红队 荣获抢答冠军！'
                : blueScore > redScore
                ? '🎉 恭喜 🔵 蓝队 荣获抢答冠军！'
                : '🤝 势均力敌！双方握手言和，都是英语小专家！'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <div>
              <span className="text-xs text-rose-600 font-bold">红队得分</span>
              <div className="text-3xl font-black text-rose-900 font-mono mt-0.5">{redScore}</div>
            </div>
            <div>
              <span className="text-xs text-blue-600 font-bold">蓝队得分</span>
              <div className="text-3xl font-black text-blue-900 font-mono mt-0.5">{blueScore}</div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>再开一局PK</span>
          </button>
        </div>
      )}
    </div>
  );
};
