/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Minimize2, BookOpen, Volume2, HelpCircle } from 'lucide-react';
import { JOBS_LIST } from './data/jobsData';
import { GameMode } from './types/job';
import { AudioControlBar } from './components/AudioControlBar';
import { ExploreCardsView } from './components/views/ExploreCardsView';
import { MemoryGameView } from './components/views/MemoryGameView';
import { RiddleGameView } from './components/views/RiddleGameView';
import { SpellingTrainView } from './components/views/SpellingTrainView';
import { ClassroomBattleView } from './components/views/ClassroomBattleView';
import { TeacherKitModal } from './components/views/TeacherKitModal';
import { audioEngine } from './utils/audioEngine';

// Generated Asset Paths
import worldBgImg from './assets/images/job_adventure_world_1790777018077.jpg';
import mascotImg from './assets/images/mascot_guide_owl_1790777030049.jpg';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('explore');
  const [isTeacherKitOpen, setIsTeacherKitOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mascotBubble, setMascotBubble] = useState<string>(
    'Hello boys and girls! 今天我们一起来认识 9 位了不起的职业朋友吧！点击喇叭听发音哦！'
  );

  const toggleFullscreen = () => {
    audioEngine.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleMascotClick = () => {
    audioEngine.playClick();
    const greetings = [
      'Welcome to Job Town! What do you want to be when you grow up?',
      'Teacher, Student, Pirate, Dentist, Film star, Pop star, Nurse, Doctor, Farmer!',
      'Great job learning English! Let us play together!',
      'Listen carefully and repeat: I am a teacher! Yo-ho-ho I am a pirate!',
    ];
    const picked = greetings[Math.floor(Math.random() * greetings.length)];
    setMascotBubble(picked);
    audioEngine.speak(picked);
  };

  const navItems = [
    { mode: 'explore' as GameMode, label: '单词闪卡', icon: '🌟', desc: '发音·音节拍手' },
    { mode: 'memory' as GameMode, label: '翻翻乐对碰', icon: '🃏', desc: '记忆配对' },
    { mode: 'riddle' as GameMode, label: '听音猜谜', icon: '🕵️', desc: '我是谁大挑战' },
    { mode: 'spelling' as GameMode, label: '拼写小火车', icon: '🚂', desc: '字母组装' },
    { mode: 'battle' as GameMode, label: '抢答大PK', icon: '⚡', desc: '白板双人对抗' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-amber-200 relative overflow-x-hidden font-['Fredoka','Plus_Jakarta_Sans',sans-serif]">
      {/* Background World Backdrop with Soft Fade Scrim */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-30">
        <img
          src={worldBgImg}
          alt="Job Town Illustration"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter blur-xs"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/70 to-sky-50/90" />
      </div>

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Navigation) - Zone 3 (Action Tools) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                audioEngine.playClick();
                setCurrentMode('explore');
              }}
              className="text-left group flex items-center gap-2"
            >
              <span className="text-2xl filter group-hover:scale-110 transition-transform">🎒</span>
              <span className="text-lg sm:text-xl font-black tracking-tight text-amber-900 group-hover:text-amber-700 transition-colors whitespace-nowrap">
                Job Adventure <span className="text-sky-600 font-bold text-sm hidden md:inline">· 职业单词乐园</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Clean Segmented Tabs) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-amber-50/80 p-1 rounded-2xl border border-amber-200/60">
            {navItems.map((item) => {
              const isActive = currentMode === item.mode;
              return (
                <button
                  key={item.mode}
                  onClick={() => {
                    audioEngine.playClick();
                    setCurrentMode(item.mode);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-400 text-amber-950 shadow-xs scale-102 ring-2 ring-amber-300'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Audio Synthesizer Bar + Whiteboard Fullscreen) */}
          <div className="flex items-center gap-2">
            <AudioControlBar onOpenTeacherKit={() => setIsTeacherKitOpen(true)} />

            <button
              onClick={toggleFullscreen}
              className="hidden sm:flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
              title="白板全屏模式 (Whiteboard Fullscreen)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden border-t border-amber-100 bg-amber-50/70 px-2 py-1.5 flex items-center justify-around overflow-x-auto gap-1">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  audioEngine.playClick();
                  setCurrentMode(item.mode);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-amber-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Mascot Hoot Banner & Welcoming Classroom Tip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="bg-gradient-to-r from-amber-100/90 via-sky-100/80 to-purple-100/90 rounded-3xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              onClick={handleMascotClick}
              className="relative cursor-pointer group shrink-0"
              title="点击猫头鹰助教听英文问候！"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md group-hover:scale-105 transition-transform bg-white">
                <img
                  src={mascotImg}
                  alt="Professor Hoot Mascot"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-2xs">
                TAP!
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-amber-950 text-sm sm:text-base">
                  猫头鹰助教 Professor Hoot
                </span>
                <span className="text-xs bg-white/80 px-2 py-0.5 rounded-full text-slate-600 border border-amber-200 font-semibold">
                  课堂互动小导师
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium mt-1 leading-snug max-w-2xl">
                {mascotBubble}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsTeacherKitOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-purple-200 transition-transform active:scale-95 whitespace-nowrap"
            >
              <BookOpen className="w-4 h-4" />
              <span>教师备课与教案</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Arena */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4">
        {currentMode === 'explore' && <ExploreCardsView jobs={JOBS_LIST} />}
        {currentMode === 'memory' && <MemoryGameView jobs={JOBS_LIST} />}
        {currentMode === 'riddle' && <RiddleGameView jobs={JOBS_LIST} />}
        {currentMode === 'spelling' && <SpellingTrainView jobs={JOBS_LIST} />}
        {currentMode === 'battle' && <ClassroomBattleView jobs={JOBS_LIST} />}
      </main>

      {/* Teacher's Lesson Kit & Printable Cards Modal */}
      <TeacherKitModal
        isOpen={isTeacherKitOpen}
        onClose={() => setIsTeacherKitOpen(false)}
        jobs={JOBS_LIST}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white/80 backdrop-blur-md py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>小学英语职业单词乐园 · 教师专属备课与游戏化教学助手</span>
          <span className="font-mono text-[11px] text-slate-400">
            9 Target Words: Teacher · Student · Pirate · Dentist · Film star · Pop star · Nurse · Doctor · Farmer
          </span>
        </div>
      </footer>
    </div>
  );
}
