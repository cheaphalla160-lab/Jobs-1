export interface JobItem {
  id: string;
  word: string;
  syllables: string[];
  phonetic: string;
  chinese: string;
  category: 'Education' | 'Adventure' | 'Medical' | 'Entertainment' | 'Nature';
  emoji: string;
  color: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    light: string;
  };
  tools: string[];
  sentence: string;
  chineseSentence: string;
  riddleClue: string;
  chineseClue: string;
  funFact: string;
  spellingWord: string; // for spelling train without spaces
}

export type GameMode = 'explore' | 'memory' | 'riddle' | 'spelling' | 'battle' | 'teacherKit';

export type BgmTrack = 'sunshine' | 'rainbow' | 'adventure';
