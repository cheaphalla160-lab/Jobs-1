import React, { useState } from 'react';
import { X, Printer, BookOpen, Clock, Lightbulb, Award, CheckCircle } from 'lucide-react';
import { JobItem } from '../../types/job';
import { JobIllustration } from '../JobIllustration';

interface TeacherKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobs: JobItem[];
}

export const TeacherKitModal: React.FC<TeacherKitModalProps> = ({ isOpen, onClose, jobs }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'printCards' | 'phonics'>('plan');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-amber-300 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👩‍🏫</span>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                小学英语教师备课助手 (Teacher's Lesson Kit)
              </h2>
              <p className="text-xs text-slate-600">
                职业单词主题（Jobs & Occupations）课堂教学方案与教具
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>一键打印教学卡片</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50 gap-2 pt-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'plan'
                ? 'bg-white text-amber-900 border-t-2 border-amber-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            📋 40分钟教案与课堂流程
          </button>
          <button
            onClick={() => setActiveTab('phonics')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'phonics'
                ? 'bg-white text-amber-900 border-t-2 border-amber-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🔤 自然拼读与构词法拆解
          </button>
          <button
            onClick={() => setActiveTab('printCards')}
            className={`px-4 py-2.5 rounded-t-xl transition-colors ${
              activeTab === 'printCards'
                ? 'bg-white text-amber-900 border-t-2 border-amber-500 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            🖨️ A4可打印单词卡片生成器
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'plan' && (
            <div className="space-y-6">
              {/* Objectives */}
              <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  教学目标 (Teaching Objectives)
                </h4>
                <ul className="text-xs text-amber-900 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong>语言知识：</strong>能听、说、读、拼写9个职业核心单词：Teacher, Student, Pirate, Dentist, Film star, Pop star, Nurse, Doctor, Farmer。
                  </li>
                  <li>
                    <strong>句型运用：</strong>熟练运用 "What do you want to be? — I want to be a/an..." 及 "He/She is a..." 询问并表达理想职业。
                  </li>
                  <li>
                    <strong>情感态度：</strong>树立职业平等观念，感受各行各业劳动者的奉献与职业魅力。
                  </li>
                </ul>
              </div>

              {/* 40 Min Schedule */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-600" />
                  40分钟课堂节奏安排建议 (Classroom Step-by-Step)
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md shrink-0">
                      Step 1 (5 mins)
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">Warm-up & 氛围启动</div>
                      <div className="text-slate-600 mt-0.5">
                        开启网页内置的轻松背景音乐（Sunshine Day），通过大屏幕展示9位卡通角色，引发好奇心：“Look! Welcome to the Job Town! Who are they?”
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-extrabold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md shrink-0">
                      Step 2 (10 mins)
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">Presentation 探索认知与音节拍手</div>
                      <div className="text-slate-600 mt-0.5">
                        切换至【探索大本营】，带领全班跟读（点击“慢速带读”），引导孩子按音节拍手读出：teach-er 👏, den-tist 👏, doc-tor 👏。
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md shrink-0">
                      Step 3 (12 mins)
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">Practice 游戏操练（翻牌对对碰 + 猜谜挑战）</div>
                      <div className="text-slate-600 mt-0.5">
                        请学生上讲台操作【翻翻乐·连连看】和【我是谁？听音猜谜】，全班齐读答案并朗读例句。
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md shrink-0">
                      Step 4 (10 mins)
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">Production 班级分组抢答大PK</div>
                      <div className="text-slate-600 mt-0.5">
                        将全班分为红蓝两队，两队代表上讲台在电子白板上进行10回合抢答PK，激发全班热情，巩固记忆。
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                      Step 5 (3 mins)
                    </span>
                    <div>
                      <div className="font-bold text-slate-800">Summary 课后拓展与作业</div>
                      <div className="text-slate-600 mt-0.5">
                        布置任务：“Draw your dream job and write: I want to be a ______.” 并分发打印的单词小卡片带回家复习。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phonics' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                本单元职业词汇涵盖了小学阶段极为重要的构词法后缀规律，建议在黑板上重点板书：
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 space-y-2">
                  <div className="font-bold text-sky-900 text-sm flex items-center gap-1">
                    <span>🌟 -er 后缀 (表示“做某事的人”)</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>teach</strong> (教) + <strong>er</strong> = <strong>teacher</strong> (老师)</li>
                    <li>• <strong>farm</strong> (农场/耕作) + <strong>er</strong> = <strong>farmer</strong> (农民)</li>
                    <li>• 自然拼读：/ər/ 弱读音，注意引导孩子嘴唇放松发音。</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 space-y-2">
                  <div className="font-bold text-purple-900 text-sm flex items-center gap-1">
                    <span>🌟 -or 后缀</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>doctor</strong> (医生) [doc + tor]</li>
                    <li>• 读音同样为 /ər/，需提醒孩子们注意拼写是 "or" 不是 "er"。</li>
                  </ul>
                </div>

                <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200 space-y-2">
                  <div className="font-bold text-teal-900 text-sm flex items-center gap-1">
                    <span>🌟 -ist 后缀 (表示“专业人员”)</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>dentist</strong> (牙医) [dent (牙齿) + ist (专家)]</li>
                    <li>• 关联扩展：artist (艺术家), scientist (科学家)。</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
                  <div className="font-bold text-amber-900 text-sm flex items-center gap-1">
                    <span>🌟 复合词 Star 家族</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>film</strong> + <strong>star</strong> = <strong>film star</strong> (电影明星)</li>
                    <li>• <strong>pop</strong> + <strong>star</strong> = <strong>pop star</strong> (流行歌星)</li>
                    <li>• 字母组合 ar 发长音 /ɑːr/，像张大嘴看星星一样发音。</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'printCards' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-sky-50 p-3 rounded-xl border border-sky-200 text-xs">
                <span className="text-slate-700">
                  🖨️ 点击右上角“一键打印”按钮，可将以下卡片直接排版输出为A4教具，供课堂剪贴互动！
                </span>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 bg-amber-400 hover:bg-amber-500 font-bold text-amber-950 rounded-lg shrink-0"
                >
                  立即打印
                </button>
              </div>

              {/* Printable Grid */}
              <div className="grid grid-cols-3 gap-4 border-2 border-dashed border-slate-300 p-4 rounded-2xl bg-white">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="border-2 border-slate-300 rounded-2xl p-3 flex flex-col items-center text-center space-y-1 bg-white"
                  >
                    <JobIllustration id={job.id} size="sm" className="w-16 h-16" />
                    <div className="font-black text-slate-900 text-base">{job.word}</div>
                    <div className="text-xs font-mono text-slate-500">{job.phonetic}</div>
                    <div className="text-xs font-bold text-amber-700">{job.chinese}</div>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 w-full truncate">
                      {job.sentence}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
