import React from 'react';

interface JobIllustrationProps {
  id: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JobIllustration: React.FC<JobIllustrationProps> = ({ id, className = '', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-64 h-64',
  };

  const currentSize = sizeMap[size];

  switch (id) {
    case 'teacher':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle cx="80" cy="80" r="76" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="4" />
          {/* Mini blackboard behind */}
          <rect x="25" y="22" width="110" height="65" rx="8" fill="#065F46" stroke="#047857" strokeWidth="3" />
          <rect x="30" y="27" width="100" height="55" rx="5" fill="#047857" />
          {/* ABC chalk writing */}
          <text x="40" y="52" fill="#FEF08A" fontSize="16" fontWeight="bold" fontFamily="sans-serif">ABC</text>
          <text x="88" y="52" fill="#BAE6FD" fontSize="14" fontWeight="bold" fontFamily="sans-serif">1+2=3</text>
          {/* Teacher Body */}
          <ellipse cx="80" cy="142" rx="38" ry="24" fill="#059669" />
          <path d="M68 118 L80 134 L92 118 Z" fill="#FDE68A" />
          {/* Head & Neck */}
          <rect x="74" y="105" width="12" height="15" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="88" r="24" fill="#FDE047" />
          {/* Hair */}
          <path d="M56 86 C56 64 104 64 104 86 C104 74 95 62 80 62 C65 62 56 74 56 86 Z" fill="#92400E" />
          <ellipse cx="57" cy="88" rx="5" ry="12" fill="#92400E" />
          <ellipse cx="103" cy="88" rx="5" ry="12" fill="#92400E" />
          {/* Glasses */}
          <circle cx="73" cy="86" r="6" stroke="#1F2937" strokeWidth="2.5" fill="rgba(255,255,255,0.7)" />
          <circle cx="87" cy="86" r="6" stroke="#1F2937" strokeWidth="2.5" fill="rgba(255,255,255,0.7)" />
          <line x1="79" y1="86" x2="81" y2="86" stroke="#1F2937" strokeWidth="2.5" />
          {/* Eyes */}
          <circle cx="73" cy="86" r="2" fill="#111827" />
          <circle cx="87" cy="86" r="2" fill="#111827" />
          {/* Smile & Blush */}
          <path d="M75 95 Q80 99 85 95" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
          <circle cx="68" cy="93" r="3" fill="#FCA5A5" opacity="0.7" />
          <circle cx="92" cy="93" r="3" fill="#FCA5A5" opacity="0.7" />
          {/* Pointer stick with star */}
          <line x1="108" y1="120" x2="128" y2="70" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <polygon points="128,63 131,69 137,70 132,74 134,80 128,77 122,80 124,74 119,70 125,69" fill="#F59E0B" />
        </svg>
      );

    case 'student':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="4" />
          {/* Backpack straps on sides */}
          <path d="M42 96 C42 120 54 135 60 145" stroke="#F97316" strokeWidth="8" strokeLinecap="round" />
          <path d="M118 96 C118 120 106 135 100 145" stroke="#F97316" strokeWidth="8" strokeLinecap="round" />
          {/* Student Body */}
          <ellipse cx="80" cy="142" rx="34" ry="22" fill="#3B82F6" />
          {/* Collar */}
          <polygon points="72,118 80,128 88,118 80,122" fill="#FFFFFF" />
          {/* Neck & Head */}
          <rect x="75" y="104" width="10" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Cute Cap */}
          <path d="M57 82 C57 66 103 66 103 82 Z" fill="#EF4444" />
          <ellipse cx="80" cy="82" rx="26" ry="5" fill="#DC2626" />
          <circle cx="80" cy="67" r="4" fill="#FEF08A" />
          {/* Eyes with sparkle */}
          <circle cx="73" cy="85" r="3.5" fill="#1E293B" />
          <circle cx="74" cy="84" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="85" r="3.5" fill="#1E293B" />
          <circle cx="88" cy="84" r="1.2" fill="#FFFFFF" />
          {/* Cheerful Smile */}
          <path d="M74 93 Q80 99 86 93" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="68" cy="91" r="3" fill="#FCA5A5" opacity="0.8" />
          <circle cx="92" cy="91" r="3" fill="#FCA5A5" opacity="0.8" />
          {/* Holding book */}
          <rect x="62" y="124" width="36" height="26" rx="4" fill="#10B981" stroke="#047857" strokeWidth="2" />
          <line x1="80" y1="124" x2="80" y2="150" stroke="#047857" strokeWidth="2" />
          <line x1="68" y1="131" x2="75" y2="131" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="68" y1="137" x2="75" y2="137" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <line x1="85" y1="131" x2="92" y2="131" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'pirate':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#EEF2FF" stroke="#C7D2FE" strokeWidth="4" />
          {/* Body / Striped shirt */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#4338CA" />
          <line x1="58" y1="132" x2="102" y2="132" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="52" y1="142" x2="108" y2="142" stroke="#FFFFFF" strokeWidth="4" />
          {/* Neck & Head */}
          <rect x="74" y="103" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Pirate Beard / Chin fluff */}
          <path d="M72 98 Q80 106 88 98 Q80 109 72 98 Z" fill="#92400E" />
          {/* Eye Patch on Left */}
          <circle cx="72" cy="84" r="5" fill="#1E1B4B" />
          <line x1="58" y1="80" x2="72" y2="84" stroke="#1E1B4B" strokeWidth="2" />
          <line x1="72" y1="84" x2="92" y2="76" stroke="#1E1B4B" strokeWidth="2" />
          {/* Right Eye */}
          <circle cx="88" cy="84" r="3.5" fill="#1E293B" />
          <circle cx="89" cy="83" r="1.2" fill="#FFFFFF" />
          {/* Mischievous grin */}
          <path d="M75 92 Q81 97 88 91" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
          {/* Pirate Tricorn Hat */}
          <path d="M42 75 C48 50 112 50 118 75 C102 70 58 70 42 75 Z" fill="#1E1B4B" />
          <polygon points="80,42 54,72 106,72" fill="#1E1B4B" />
          {/* Golden Skull Emblem */}
          <circle cx="80" cy="62" r="5" fill="#FACC15" />
          <circle cx="78" cy="61" r="1.2" fill="#1E1B4B" />
          <circle cx="82" cy="61" r="1.2" fill="#1E1B4B" />
          <line x1="74" y1="67" x2="86" y2="67" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
          {/* Hook hand or golden earring */}
          <circle cx="104" cy="89" r="4" stroke="#F59E0B" strokeWidth="2" fill="none" />
        </svg>
      );

    case 'dentist':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#ECFEFF" stroke="#A5F3FC" strokeWidth="4" />
          {/* Body / Scrubs */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#06B6D4" />
          <path d="M68 118 L80 130 L92 118" stroke="#FFFFFF" strokeWidth="3" />
          {/* Neck & Head */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Hair */}
          <path d="M57 82 C57 63 103 63 103 82 C98 68 62 68 57 82 Z" fill="#475569" />
          {/* Forehead Mirror / Loupe */}
          <ellipse cx="80" cy="68" rx="8" ry="8" fill="#E2E8F0" stroke="#0891B2" strokeWidth="2.5" />
          <circle cx="80" cy="68" r="4" fill="#67E8F9" />
          <line x1="58" y1="71" x2="102" y2="71" stroke="#0891B2" strokeWidth="2.5" />
          {/* Friendly Eyes */}
          <circle cx="73" cy="84" r="3.2" fill="#0F172A" />
          <circle cx="74" cy="83" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="84" r="3.2" fill="#0F172A" />
          <circle cx="88" cy="83" r="1.2" fill="#FFFFFF" />
          {/* Big White Tooth Smile */}
          <rect x="74" y="91" width="12" height="6" rx="3" fill="#FFFFFF" stroke="#0891B2" strokeWidth="1.5" />
          {/* Giant Sparkly Tooth Model Handheld */}
          <g transform="translate(102, 98) scale(0.75)">
            <path d="M12 2 C6 2 2 8 2 16 C2 28 6 38 10 38 C14 38 13 26 18 26 C23 26 22 38 26 38 C30 38 34 28 34 16 C34 8 30 2 24 2 C21 2 18 6 18 6 C18 6 15 2 12 2 Z" fill="#FFFFFF" stroke="#06B6D4" strokeWidth="2.5" />
            <polygon points="12,10 14,14 18,15 14,17 13,21 10,18 6,19 8,15 7,11 11,13" fill="#FACC15" transform="scale(0.6) translate(10,5)" />
          </g>
          {/* Dental Mirror Tool */}
          <line x1="42" y1="135" x2="52" y2="105" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="53" cy="103" r="6" stroke="#94A3B8" strokeWidth="2.5" fill="#E0F2FE" />
        </svg>
      );

    case 'film-star':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="4" />
          {/* Sparkles in background */}
          <polygon points="34,40 37,46 43,47 38,51 40,57 34,54 28,57 30,51 25,47 31,46" fill="#F59E0B" />
          <polygon points="126,38 128,43 133,44 129,47 131,52 126,49 121,52 123,47 119,44 124,43" fill="#F59E0B" />
          {/* Glamorous Outfit with Red Scarf */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#7E22CE" />
          <path d="M64 120 C70 134 90 134 96 120" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
          {/* Head & Neck */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Stylish Star Hair */}
          <path d="M56 82 C56 60 104 60 104 82 C108 72 100 56 80 56 C60 56 52 72 56 82 Z" fill="#1F2937" />
          <path d="M96 74 Q106 82 102 96" stroke="#1F2937" strokeWidth="4" strokeLinecap="round" />
          {/* Cool Sunglasses */}
          <path d="M64 80 L76 80 L74 90 L66 90 Z" fill="#111827" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M84 80 L96 80 L94 90 L86 90 Z" fill="#111827" stroke="#F59E0B" strokeWidth="1.5" />
          <line x1="76" y1="83" x2="84" y2="83" stroke="#F59E0B" strokeWidth="2" />
          {/* Star smile */}
          <path d="M74 96 Q80 101 86 96" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          {/* Movie Clapperboard Handheld */}
          <g transform="translate(100, 96) rotate(-15)">
            <rect x="0" y="8" width="34" height="24" rx="2" fill="#18181B" stroke="#F43F5E" strokeWidth="1.5" />
            <rect x="0" y="0" width="34" height="8" rx="1" fill="#FFFFFF" />
            <polygon points="5,0 10,0 6,8 1,8" fill="#18181B" />
            <polygon points="15,0 20,0 16,8 11,8" fill="#18181B" />
            <polygon points="25,0 30,0 26,8 21,8" fill="#18181B" />
            <text x="5" y="24" fill="#FACC15" fontSize="10" fontWeight="bold">ACT 1</text>
          </g>
        </svg>
      );

    case 'pop-star':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#FDF2F8" stroke="#FBCFE8" strokeWidth="4" />
          {/* Floating musical notes */}
          <text x="32" y="44" fill="#EC4899" fontSize="20" fontWeight="bold">♪</text>
          <text x="122" y="48" fill="#A855F7" fontSize="22" fontWeight="bold">♫</text>
          {/* Glitzy Outfit */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#EC4899" />
          <polygon points="80,122 84,130 92,131 86,136 88,144 80,140 72,144 74,136 68,131 76,130" fill="#FDE047" />
          {/* Head & Neck */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Colorful Vibrant Hair */}
          <path d="M56 84 C54 60 106 60 104 84 C112 68 96 52 80 52 C64 52 48 68 56 84 Z" fill="#9333EA" />
          <path d="M54 84 C50 96 56 106 62 108" stroke="#9333EA" strokeWidth="5" strokeLinecap="round" />
          <path d="M106 84 C110 96 104 106 98 108" stroke="#9333EA" strokeWidth="5" strokeLinecap="round" />
          {/* Headset Microphone */}
          <path d="M57 80 C57 60 103 60 103 80" stroke="#374151" strokeWidth="3" fill="none" />
          <rect x="54" y="78" width="6" height="12" rx="3" fill="#EC4899" />
          <rect x="100" y="78" width="6" height="12" rx="3" fill="#EC4899" />
          <path d="M103 86 Q96 102 85 100" stroke="#374151" strokeWidth="2.5" fill="none" />
          <circle cx="84" cy="100" r="3" fill="#EC4899" />
          {/* Bright Singing Eyes & Open Mouth */}
          <circle cx="73" cy="83" r="3.2" fill="#1E293B" />
          <circle cx="74" cy="82" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="83" r="3.2" fill="#1E293B" />
          <circle cx="88" cy="82" r="1.2" fill="#FFFFFF" />
          {/* Joyful open singing mouth */}
          <ellipse cx="80" cy="94" rx="5" ry="4" fill="#BE185D" />
          {/* Handheld Sparkly Mic */}
          <g transform="translate(36, 92) rotate(25)">
            <rect x="6" y="14" width="8" height="22" rx="2" fill="#374151" />
            <circle cx="10" cy="10" r="8" fill="#F43F5E" stroke="#FDE047" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'nurse':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="4" />
          {/* Body / Nurse Scrub */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#14B8A6" />
          {/* Red Cross on Pocket */}
          <rect x="88" y="130" width="14" height="12" rx="2" fill="#CCFBF1" />
          <rect x="93" y="133" width="4" height="6" fill="#EF4444" />
          <rect x="91" y="135" width="8" height="2" fill="#EF4444" />
          {/* Head & Neck */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Hair */}
          <path d="M57 84 C57 66 103 66 103 84 C100 70 60 70 57 84 Z" fill="#78350F" />
          {/* Nurse Cap with Red Cross */}
          <polygon points="68,66 92,66 96,56 64,56" fill="#FFFFFF" stroke="#14B8A6" strokeWidth="1.5" />
          <rect x="78" y="58" width="4" height="6" fill="#EF4444" />
          <rect x="76" y="60" width="8" height="2" fill="#EF4444" />
          {/* Kind caring eyes */}
          <path d="M70 82 Q74 78 78 82" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M82 82 Q86 78 90 82" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Warm smile & pink cheeks */}
          <path d="M74 92 Q80 97 86 92" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="68" cy="90" r="3" fill="#FCA5A5" opacity="0.8" />
          <circle cx="92" cy="90" r="3" fill="#FCA5A5" opacity="0.8" />
          {/* Medical Clipboard */}
          <g transform="translate(104, 106) rotate(10)">
            <rect x="0" y="4" width="22" height="30" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
            <rect x="5" y="0" width="12" height="6" rx="1" fill="#78350F" />
            <line x1="4" y1="12" x2="16" y2="12" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="18" x2="18" y2="18" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <line x1="4" y1="24" x2="12" y2="24" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'doctor':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="4" />
          {/* Body with White Lab Coat */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#0284C7" />
          <polygon points="62,118 76,144 84,144 98,118 80,128" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Stethoscope around neck */}
          <path d="M68 116 C68 132 92 132 92 116" stroke="#475569" strokeWidth="3" fill="none" />
          <circle cx="80" cy="136" r="4.5" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
          {/* Neck & Head */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Doctor Hair */}
          <path d="M57 82 C57 62 103 62 103 82 C98 66 62 66 57 82 Z" fill="#334155" />
          {/* Eyes with wise friendly expression */}
          <circle cx="73" cy="84" r="3.2" fill="#0F172A" />
          <circle cx="74" cy="83" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="84" r="3.2" fill="#0F172A" />
          <circle cx="88" cy="83" r="1.2" fill="#FFFFFF" />
          {/* Smile */}
          <path d="M74 93 Q80 98 86 93" stroke="#B91C1C" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="68" cy="91" r="3" fill="#FCA5A5" opacity="0.7" />
          <circle cx="92" cy="91" r="3" fill="#FCA5A5" opacity="0.7" />
          {/* Red Medicine First Aid Kit */}
          <g transform="translate(32, 108)">
            <rect x="0" y="4" width="26" height="20" rx="3" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
            <rect x="8" y="0" width="10" height="5" rx="1" fill="#7F1D1D" />
            {/* White Cross */}
            <rect x="11" y="9" width="4" height="10" fill="#FFFFFF" />
            <rect x="8" y="12" width="10" height="4" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case 'farmer':
      return (
        <svg viewBox="0 0 160 160" className={`${currentSize} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="80" cy="80" r="76" fill="#FEFCE8" stroke="#FEF08A" strokeWidth="4" />
          {/* Farm Green overalls & Plaid shirt */}
          <ellipse cx="80" cy="142" rx="36" ry="22" fill="#D97706" />
          <path d="M66 122 L66 150 L94 150 L94 122 Z" fill="#2563EB" />
          <circle cx="72" cy="126" r="2.5" fill="#FDE047" />
          <circle cx="88" cy="126" r="2.5" fill="#FDE047" />
          {/* Neck & Head */}
          <rect x="74" y="104" width="12" height="14" fill="#FCD34D" rx="4" />
          <circle cx="80" cy="86" r="23" fill="#FDE047" />
          {/* Straw Hat */}
          <path d="M60 70 C60 54 100 54 100 70 Z" fill="#FDE047" stroke="#D97706" strokeWidth="2" />
          <rect x="62" y="66" width="36" height="4" fill="#EF4444" />
          <ellipse cx="80" cy="71" rx="36" ry="7" fill="#FACC15" stroke="#D97706" strokeWidth="2" />
          {/* Big Rosy Cheeks & Cheerful Smile */}
          <circle cx="73" cy="85" r="3.2" fill="#1E293B" />
          <circle cx="74" cy="84" r="1.2" fill="#FFFFFF" />
          <circle cx="87" cy="85" r="3.2" fill="#1E293B" />
          <circle cx="88" cy="84" r="1.2" fill="#FFFFFF" />
          <path d="M74 94 Q80 100 86 94" stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="67" cy="92" r="3.5" fill="#F87171" opacity="0.8" />
          <circle cx="93" cy="92" r="3.5" fill="#F87171" opacity="0.8" />
          {/* Red Apple in hand */}
          <g transform="translate(108, 102)">
            <circle cx="10" cy="10" r="9" fill="#EF4444" />
            <path d="M10 2 C12 0 15 2 13 4" stroke="#78350F" strokeWidth="2" />
            <ellipse cx="14" cy="3" rx="3" ry="1.5" fill="#22C55E" />
          </g>
          {/* Wheat stalk */}
          <g transform="translate(36, 96) rotate(-20)">
            <line x1="8" y1="36" x2="8" y2="4" stroke="#CA8A04" strokeWidth="2.5" />
            <ellipse cx="5" cy="10" rx="3" ry="5" fill="#EAB308" transform="rotate(-30 5 10)" />
            <ellipse cx="11" cy="14" rx="3" ry="5" fill="#EAB308" transform="rotate(30 11 14)" />
            <ellipse cx="5" cy="18" rx="3" ry="5" fill="#EAB308" transform="rotate(-30 5 18)" />
            <ellipse cx="11" cy="22" rx="3" ry="5" fill="#EAB308" transform="rotate(30 11 22)" />
          </g>
        </svg>
      );

    default:
      return (
        <div className={`${currentSize} ${className} flex items-center justify-center bg-slate-100 rounded-full border border-slate-200 text-3xl`}>
          🌟
        </div>
      );
  }
};
