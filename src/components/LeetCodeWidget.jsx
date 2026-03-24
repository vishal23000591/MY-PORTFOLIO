import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Target, Trophy, Flame } from 'lucide-react';

const LeetCodeWidget = () => {
  const [stats, setStats] = useState(null);
  const username = "Vishal_S_555";

  useEffect(() => {
    const fetchLeetCode = async () => {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();
        if (data.status === "success") {
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
      }
    };
    fetchLeetCode();
  }, []);

  if (!stats) {
    return (
      <div className="w-full glass-morphism rounded-[32px] p-6 border border-primary/10 flex items-center justify-center h-[200px] animate-pulse">
        <Code2 className="text-secondary/40 animate-spin" size={32} />
      </div>
    );
  }

  // Difficulty specific styles
  const difficulties = [
    { label: 'Easy', solved: stats.easySolved, total: stats.totalEasy, color: 'text-emerald-400', bar: 'bg-emerald-400' },
    { label: 'Medium', solved: stats.mediumSolved, total: stats.totalMedium, color: 'text-yellow-400', bar: 'bg-yellow-400' },
    { label: 'Hard', solved: stats.hardSolved, total: stats.totalHard, color: 'text-rose-400', bar: 'bg-rose-400' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="w-full glass-morphism rounded-[32px] p-6 lg:p-8 border border-primary/10 relative overflow-hidden group hover:border-accent/30 transition-all duration-500"
    >
      <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors"></div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 w-full">
        
        {/* Left Side: Overview Rings/Stats */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-48 h-48 rounded-full border-8 border-primary/5 relative bg-background/30 shadow-inner">
           <div className="text-center">
             <h3 className="text-5xl font-black text-primary tracking-tighter">{stats.totalSolved}</h3>
             <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary mt-1">Solved</p>
           </div>
           
           {/* Decorative Outer Ring piece */}
           <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none rounded-full">
              <circle 
                cx="50%" cy="50%" r="46%" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="4" 
                className="text-accent hover:text-white transition-colors duration-500 opacity-60"
                strokeDasharray="400"
                strokeDashoffset={400 - (400 * (stats.totalSolved / Math.max(stats.totalQuestions, 1)))}
                strokeLinecap="round"
              />
           </svg>
        </div>

        {/* Right Side: Detailed Breakdown */}
        <div className="flex-1 w-full space-y-6">
           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-primary/10 gap-2 sm:gap-0">
             <div className="flex items-center space-x-3">
               <Trophy size={18} className="text-yellow-500" />
               <span className="text-sm font-bold text-primary">Global Rank: <span className="text-secondary">{stats.ranking.toLocaleString()}</span></span>
             </div>
             <div className="flex items-center space-x-3">
               <Target size={18} className="text-emerald-500" />
               <span className="text-sm font-bold text-primary">Acceptance: <span className="text-secondary">{stats.acceptanceRate}%</span></span>
             </div>
           </div>

           <div className="space-y-4">
             {difficulties.map((diff, idx) => (
               <div key={diff.label} className="w-full">
                 <div className="flex justify-between items-end mb-1">
                   <span className={`text-xs font-bold uppercase tracking-wider ${diff.color}`}>{diff.label}</span>
                   <span className="text-xs font-medium text-secondary">
                     <span className="text-primary font-bold">{diff.solved}</span> / {diff.total}
                   </span>
                 </div>
                 <div className="w-full bg-primary/5 h-2 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: `${(diff.solved / Math.max(diff.total, 1)) * 100}%` }}
                     transition={{ duration: 1, delay: idx * 0.2 }}
                     className={`h-full ${diff.bar} rounded-full`}
                   />
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default LeetCodeWidget;
