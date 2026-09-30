import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Play, Sparkles, BookOpen, Star, Repeat } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';
import { audioEngine } from '../../utils/audioEngine';

interface ExploreCardsViewProps {
  jobs: JobItem[];
}

export const ExploreCardsView: React.FC<ExploreCardsViewProps> = ({ jobs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState<number | null>(null);

  const currentJob = jobs[currentIndex];

  useEffect(() => {
    let timer: number;
    if (isAutoPlaying) {
      timer = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % jobs.length);
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, jobs.length]);

  const handleSelectJob = (idx: number) => {
    audioEngine.playClick();
    setCurrentIndex(idx);
    audioEngine.speak(jobs[idx].word);
  };

  const handleNext = () => {
    audioEngine.playFlip();
    const next = (currentIndex + 1) % jobs.length;
    setCurrentIndex(next);
    audioEngine.speak(jobs[next].word);
  };

  const handlePrev = () => {
    audioEngine.playFlip();
    const prev = (currentIndex - 1 + jobs.length) % jobs.length;
    setCurrentIndex(prev);
    audioEngine.speak(jobs[prev].word);
  };

  const handleSpeakWord = (slow = false) => {
    audioEngine.playClick();
    audioEngine.speak(currentJob.word, slow ? 0.75 : 0.95);
  };

  const handleSpeakSentence = () => {
    audioEngine.playClick();
    audioEngine.speak(currentJob.sentence, 0.85);
  };

  const handleSyllableClick = (syl: string, idx: number) => {
    audioEngine.playLetter();
    setActiveSyllable(idx);
    audioEngine.speak(syl);
    setTimeout(() => setActiveSyllable(null), 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Controller Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-sky-100 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 text-xl font-bold">
            {currentIndex + 1}
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span>{currentJob.word}</span>
              <span className="text-sm font-normal text-slate-500">· {currentJob.chinese}</span>
            </h2>
            <div className="text-xs text-slate-500 font-mono">{currentJob.phonetic}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Auto drill button for classroom */}
          <button
            onClick={() => {
              audioEngine.playClick();
              setIsAutoPlaying(!isAutoPlaying);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isAutoPlaying
                ? 'bg-rose-500 text-white shadow-md animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>{isAutoPlaying ? '停止全班轮播' : '▶ 课堂轮播带读'}</span>
          </button>

          <button
            onClick={() => handleSpeakWord(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors"
            title="慢速逐音发音"
          >
            <span>🐢 慢速带读</span>
          </button>

          <button
            onClick={() => handleSpeakWord(false)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-200 transition-transform active:scale-95"
          >
            <Volume2 className="w-4 h-4" />
            <span>朗读单词</span>
          </button>
        </div>
      </div>

      {/* Main Flashcard Stage */}
      <div className="relative bg-gradient-to-b from-white to-sky-50/50 rounded-3xl p-6 sm:p-10 border border-sky-100 shadow-xl overflow-hidden">
        {/* Navigation arrows for whiteboard / mouse */}
        <button
          onClick={handlePrev}
          aria-label="Previous word"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-sky-100 text-sky-700 shadow-md border border-sky-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next word"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 hover:bg-sky-100 text-sky-700 shadow-md border border-sky-200 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-4xl mx-auto px-4">
          {/* Left Column: Character Mascot & Visuals */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative group cursor-pointer" onClick={() => handleSpeakWord(false)}>
              <div className="p-4 bg-white rounded-3xl shadow-lg border-2 border-sky-200 group-hover:scale-105 transition-transform duration-200">
                <JobIllustration id={currentJob.id} size="xl" />
              </div>
              <div className="absolute -bottom-3 inset-x-0 flex justify-center">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white border border-amber-300 shadow-sm text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  点击听发音
                </span>
              </div>
            </div>

            {/* Syllables Breakdown / Clapping drill */}
            <div className="mt-8">
              <div className="text-xs font-semibold text-slate-500 mb-2">自然拼读·音节拍手练</div>
              <div className="flex items-center justify-center gap-2">
                {currentJob.syllables.map((syl, i) => (
                  <button
                    key={i}
                    onClick={() => handleSyllableClick(syl, i)}
                    className={`px-4 py-2 rounded-2xl font-bold text-lg tracking-wide transition-all shadow-sm ${
                      activeSyllable === i
                        ? 'bg-amber-400 text-amber-950 scale-110 shadow-amber-300 ring-4 ring-amber-200'
                        : 'bg-white hover:bg-sky-100 text-sky-900 border border-sky-200'
                    }`}
                  >
                    {syl.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Word Details, Sentence & Tools */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-wider uppercase text-sky-600 bg-sky-100 px-2.5 py-0.5 rounded-lg">
                  {currentJob.category} 领域
                </span>
                <span className="text-2xl">{currentJob.emoji}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-baseline gap-3">
                <span>{currentJob.word}</span>
                <span className="text-2xl font-bold text-sky-600">({currentJob.chinese})</span>
              </h1>
              <div className="text-lg font-mono text-slate-500 mt-1">{currentJob.phonetic}</div>
            </div>

            {/* Classroom Sentence Box */}
            <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200/80 relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  课堂例句 (Example Sentence)
                </span>
                <button
                  onClick={handleSpeakSentence}
                  className="flex items-center gap-1 text-xs font-bold text-sky-700 hover:text-sky-900 bg-white px-2 py-1 rounded-lg border border-sky-200 shadow-2xs hover:bg-sky-50"
                >
                  <Play className="w-3 h-3 fill-current" />
                  朗读例句
                </button>
              </div>
              <p className="text-base sm:text-lg font-semibold text-slate-800 leading-snug">
                "{currentJob.sentence}"
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {currentJob.chineseSentence}
              </p>
            </div>

            {/* Work Tools & Props */}
            <div>
              <div className="text-xs font-bold text-slate-600 mb-2">🛠️ 职业随身道具 (Tools & Items)：</div>
              <div className="flex flex-wrap gap-2">
                {currentJob.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    <span>✦</span>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Fun Fact for Kids */}
            <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <Star className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 fill-current" />
              <div>
                <span className="font-bold">趣味百科小知识：</span>
                {currentJob.funFact}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip - All 9 Jobs quick switcher */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-600 text-center">
          点击小卡片快速切换全套 9 个核心单词：
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {jobs.map((job, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={job.id}
                onClick={() => handleSelectJob(idx)}
                className={`flex flex-col items-center p-2 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-amber-400 border-amber-500 shadow-md scale-105 text-amber-950 font-bold ring-2 ring-amber-300'
                    : 'bg-white hover:bg-sky-50 border-slate-200 text-slate-700 font-medium'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <JobIllustration id={job.id} size="sm" />
                </div>
                <span className="text-xs mt-1 truncate max-w-full">{job.word}</span>
                <span className="text-[10px] text-slate-500">{job.chinese}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
