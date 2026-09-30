import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy, Star, Sparkles, Volume2 } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';
import { audioEngine } from '../../utils/audioEngine';

interface MemoryCard {
  uid: string;
  jobId: string;
  type: 'word' | 'picture';
  job: JobItem;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameViewProps {
  jobs: JobItem[];
}

export const MemoryGameView: React.FC<MemoryGameViewProps> = ({ jobs }) => {
  const [difficulty, setDifficulty] = useState<6 | 9>(6);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<MemoryCard[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Initialize game board
  const setupGame = (pairCount: 6 | 9) => {
    audioEngine.playClick();
    const selectedJobs = [...jobs].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    const newCards: MemoryCard[] = [];

    selectedJobs.forEach((job) => {
      // Word card
      newCards.push({
        uid: `${job.id}-word-${Math.random()}`,
        jobId: job.id,
        type: 'word',
        job,
        isFlipped: false,
        isMatched: false,
      });
      // Picture card
      newCards.push({
        uid: `${job.id}-pic-${Math.random()}`,
        jobId: job.id,
        type: 'picture',
        job,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    newCards.sort(() => 0.5 - Math.random());
    setCards(newCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setGameWon(false);
    setTime(0);
    setTimerActive(true);
  };

  useEffect(() => {
    setupGame(difficulty);
  }, [difficulty]);

  useEffect(() => {
    let interval: number;
    if (timerActive && !gameWon) {
      interval = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameWon]);

  const handleCardClick = (card: MemoryCard) => {
    if (isLocked || card.isFlipped || card.isMatched) return;

    audioEngine.playFlip();

    const updatedCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);

      const [first, second] = newFlipped;

      if (first.jobId === second.jobId) {
        // MATCH!
        setTimeout(() => {
          audioEngine.playCorrect();
          audioEngine.speak(first.job.word);

          setCards((prev) =>
            prev.map((c) =>
              c.jobId === first.jobId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
          const newMatched = matchedPairs + 1;
          setMatchedPairs(newMatched);

          if (newMatched === difficulty) {
            // GAME WON!
            setGameWon(true);
            setTimerActive(false);
            audioEngine.playFanfare();
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
            });
          }
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          audioEngine.playWrong();
          setCards((prev) =>
            prev.map((c) =>
              c.uid === first.uid || c.uid === second.uid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  const calculateStars = () => {
    const perfectMoves = difficulty;
    if (moves <= perfectMoves * 1.5) return 3;
    if (moves <= perfectMoves * 2.2) return 2;
    return 1;
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🃏</span>
            <span className="font-extrabold text-slate-800 text-lg">翻翻乐·图词对对碰</span>
          </div>

          <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-100">
            <button
              onClick={() => {
                setDifficulty(6);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                difficulty === 6
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              新手 6对 (12张)
            </button>
            <button
              onClick={() => {
                setDifficulty(9);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                difficulty === 9
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              达人 9对 (18张)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            <span>⏱️ 时间:</span>
            <span className="font-mono text-sm text-amber-900">{formatTime(time)}</span>
          </div>

          <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span>🎯 步数:</span>
            <span className="font-mono text-sm text-emerald-900">{moves}</span>
          </div>

          <div className="flex items-center gap-1 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            <span>⭐ 已配对:</span>
            <span className="font-mono text-sm text-purple-900">
              {matchedPairs}/{difficulty}
            </span>
          </div>

          <button
            onClick={() => setupGame(difficulty)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            title="重新洗牌发牌"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新开始</span>
          </button>
        </div>
      </div>

      {/* Card Grid Area */}
      <div
        className={`grid gap-3 sm:gap-4 max-w-5xl mx-auto ${
          difficulty === 6
            ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-4'
            : 'grid-cols-3 sm:grid-cols-6 md:grid-cols-6'
        }`}
      >
        {cards.map((card) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.uid}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched || isLocked}
              className={`aspect-square rounded-3xl p-3 flex flex-col items-center justify-center transition-all duration-300 relative select-none ${
                card.isMatched
                  ? 'bg-emerald-50 border-2 border-emerald-400 shadow-xs scale-95 opacity-85'
                  : isRevealed
                  ? 'bg-white border-2 border-sky-400 shadow-md ring-4 ring-sky-100'
                  : 'bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 border-2 border-amber-300 shadow-md cursor-pointer hover:-translate-y-1'
              }`}
            >
              {isRevealed ? (
                card.type === 'picture' ? (
                  <div className="flex flex-col items-center justify-center w-full h-full animate-in zoom-in-75 duration-200">
                    <JobIllustration id={card.job.id} size="sm" className="w-14 h-14 sm:w-16 sm:h-16" />
                    <span className="text-[11px] font-semibold text-slate-500 mt-1">
                      {card.job.chinese}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full p-1 text-center animate-in zoom-in-75 duration-200">
                    <span className="text-2xl mb-1">{card.job.emoji}</span>
                    <span className="text-sm sm:text-base font-extrabold text-sky-800 leading-tight">
                      {card.job.word}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {card.job.phonetic}
                    </span>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center text-amber-950 font-bold">
                  <span className="text-3xl sm:text-4xl filter drop-shadow-xs">🌟</span>
                  <span className="text-xs tracking-wider uppercase opacity-80 mt-1">JOB</span>
                </div>
              )}

              {card.isMatched && (
                <div className="absolute top-2 right-2 text-emerald-500">
                  <Sparkles className="w-4 h-4 fill-emerald-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Victory Celebration Modal */}
      {gameWon && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-300 shadow-2xl text-center space-y-5 animate-in zoom-in-90 duration-300">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-4xl shadow-inner border border-amber-200 animate-bounce">
              🏆
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-900">恭喜小朋友！挑战大获全胜！</h3>
              <p className="text-sm text-slate-600 mt-1">你完美记住了所有的职业英语单词！</p>
            </div>

            {/* Stars rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 ${
                    star <= calculateStars()
                      ? 'text-amber-400 fill-amber-400 drop-shadow-md animate-pulse'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-xs">
              <div>
                <span className="text-slate-500">通关时间:</span>
                <div className="font-extrabold text-base text-amber-900 font-mono">
                  {formatTime(time)}
                </div>
              </div>
              <div>
                <span className="text-slate-500">翻牌步数:</span>
                <div className="font-extrabold text-base text-amber-900 font-mono">
                  {moves} 次
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setupGame(difficulty)}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-2xl shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>再玩一次</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
