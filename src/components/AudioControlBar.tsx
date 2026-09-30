import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Volume1, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { BgmTrack } from '../types/job';

interface AudioControlBarProps {
  onOpenTeacherKit?: () => void;
}

export const AudioControlBar: React.FC<AudioControlBarProps> = ({ onOpenTeacherKit }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [sfxOn, setSfxOn] = useState(true);
  const [track, setTrack] = useState<BgmTrack>('sunshine');
  const [speechRate, setSpeechRate] = useState(0.9);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setIsPlaying(audioEngine.getIsBgmPlaying());
    setVolume(audioEngine.getBgmVolume());
    setSfxOn(audioEngine.getIsSfxEnabled());
  }, []);

  const handleToggleBgm = () => {
    audioEngine.playClick();
    const active = audioEngine.toggleBgm();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    audioEngine.setBgmVolume(val);
    if (!isPlaying && val > 0) {
      audioEngine.startBgm();
      setIsPlaying(true);
    }
  };

  const handleTrackChange = (newTrack: BgmTrack) => {
    audioEngine.playClick();
    setTrack(newTrack);
    audioEngine.setTrack(newTrack);
    if (!isPlaying) {
      audioEngine.startBgm();
      setIsPlaying(true);
    }
  };

  const handleToggleSfx = () => {
    audioEngine.playClick();
    const next = audioEngine.toggleSfx();
    setSfxOn(next);
  };

  const handleToggleSpeechRate = () => {
    audioEngine.playClick();
    const nextRate = speechRate === 0.8 ? 1.0 : 0.8;
    setSpeechRate(nextRate);
    audioEngine.setSpeechRate(nextRate);
    audioEngine.speak(nextRate === 0.8 ? 'Slow voice mode!' : 'Normal voice mode!');
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-sm border border-amber-200/80">
        {/* BGM Toggle Button */}
        <button
          onClick={handleToggleBgm}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
            isPlaying
              ? 'bg-amber-400 text-amber-950 shadow-sm shadow-amber-200 animate-pulse'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-800'
          }`}
          title="播放/暂停轻松愉快的背景音乐"
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="whitespace-nowrap">{isPlaying ? '音乐播放中' : '播放背景音乐'}</span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-1 bg-amber-900 rounded-full h-2 animate-pulse" />
              <span className="w-1 bg-amber-900 rounded-full h-3 animate-ping" />
              <span className="w-1 bg-amber-900 rounded-full h-1.5 animate-pulse" />
            </span>
          )}
        </button>

        {/* Volume Slider Quick Access */}
        <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-amber-100 text-amber-900">
          <button
            onClick={() => {
              if (volume > 0) {
                audioEngine.setBgmVolume(0);
                setVolume(0);
              } else {
                audioEngine.setBgmVolume(0.35);
                setVolume(0.35);
                if (!isPlaying) {
                  audioEngine.startBgm();
                  setIsPlaying(true);
                }
              }
            }}
            className="p-1 hover:bg-amber-50 rounded-lg text-amber-700"
            title="静音/恢复音量"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4 text-slate-400" /> : volume < 0.3 ? <Volume1 className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-16 h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            title="调节背景音乐音量"
          />
        </div>

        {/* Voice Rate Switcher (Teacher tool for kids: 0.8x slow / 1.0x normal) */}
        <button
          onClick={handleToggleSpeechRate}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold bg-sky-100 hover:bg-sky-200 text-sky-800 transition-colors"
          title="发音语速：点击切换标准语速或慢速跟读"
        >
          <span>{speechRate === 0.8 ? '🐢 慢速跟读' : '🐇 标准发音'}</span>
        </button>

        {/* Sound Effects Toggle */}
        <button
          onClick={handleToggleSfx}
          className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
            sfxOn ? 'text-emerald-700 hover:bg-emerald-50' : 'text-slate-400 hover:bg-slate-100 line-through'
          }`}
          title={sfxOn ? '点击关闭音效' : '点击开启音效'}
        >
          <Sparkles className="w-4 h-4 inline mr-0.5" />
          <span className="hidden md:inline">{sfxOn ? '音效开启' : '音效关闭'}</span>
        </button>

        {/* More Tracks & Settings Dropdown */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-2.5 py-1 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200/60"
        >
          🎵 旋律风格
        </button>

        {onOpenTeacherKit && (
          <button
            onClick={onOpenTeacherKit}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-violet-800 bg-violet-100 hover:bg-violet-200 rounded-xl transition-colors border border-violet-200 shadow-sm"
          >
            <span>👩‍🏫 备课助手</span>
          </button>
        )}
      </div>

      {/* Settings / Music Theme Flyout */}
      {showSettings && (
        <div className="absolute right-0 top-12 z-50 w-72 bg-white rounded-2xl shadow-xl border border-amber-200 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-amber-100 mb-3">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
              <span>🎶 课堂音乐厅</span>
            </h4>
            <button
              onClick={() => setShowSettings(false)}
              className="text-xs text-slate-400 hover:text-slate-700 px-1 py-0.5"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-medium text-slate-600">选择轻松背景旋律：</div>
            <div className="grid grid-cols-1 gap-1.5">
              <button
                onClick={() => handleTrackChange('sunshine')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  track === 'sunshine'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>☀️ 阳光操场 (Sunshine Day)</span>
                {track === 'sunshine' && <span className="text-amber-600">✓ 正在播放</span>}
              </button>
              <button
                onClick={() => handleTrackChange('rainbow')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  track === 'rainbow'
                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>🌈 彩虹华尔兹 (Rainbow Waltz)</span>
                {track === 'rainbow' && <span className="text-purple-600">✓ 正在播放</span>}
              </button>
              <button
                onClick={() => handleTrackChange('adventure')}
                className={`text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  track === 'adventure'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>⛵ 奇趣大冒险 (Happy Adventure)</span>
                {track === 'adventure' && <span className="text-emerald-600">✓ 正在播放</span>}
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
              💡 提示：纯浏览器原生合成音色，温和不刺耳，专为低龄孩子听觉舒适度调校。
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
