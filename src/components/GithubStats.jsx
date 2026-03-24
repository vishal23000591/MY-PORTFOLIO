import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, Users, Star, GitBranch, Code2 } from 'lucide-react';
import SpotifyWidget from './SpotifyWidget';
import LeetCodeWidget from './LeetCodeWidget';

const GithubStats = ({ theme }) => {
  const [stats, setStats] = useState(null);
  const username = "vishal23000591";

  const fallbackStats = {
    avatar_url: `https://github.com/${username}.png`,
    public_repos: "215",
    followers: "0",
    following: "0",
    public_gists: "0"
  };

  const displayStats = stats?.public_repos !== undefined ? stats : fallbackStats;

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          console.warn(`GitHub API returned status ${response.status}. Using fallback stats.`);
          setStats(fallbackStats);
          return;
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setStats(fallbackStats);
      }
    };

    fetchStats();
  }, [username]);

  const customTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Section Header */}
          <div className="text-center mb-16 px-6">
            <h2 className="text-sm font-mono tracking-[0.3em] text-[var(--accent)] uppercase mb-4">Code Metrics & Ecosystem</h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black tracking-tighter text-[var(--text-primary)] uppercase leading-none"
            >
              Developer <br className="md:hidden" />
              <span className="text-[var(--accent)] underline underline-offset-[12px]">Activity</span>
            </motion.h3>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mt-10 italic text-lg font-medium">
              Tracking my algorithmic problem solving, open-source commits, and daily technological ecosystem flow.
            </p>
          </div>

          {/* GitHub Heatmap Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass-morphism rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden group"
          >
            <div className="flex items-center space-x-3 mb-10">
              <Github className="text-accent" size={24} />
              <h3 className="text-xl font-bold text-primary tracking-tight">Contribution Graph</h3>
            </div>
            <div className="flex justify-center overflow-x-auto pb-4 no-scrollbar">
              <div className="min-w-[800px] flex justify-center pb-2">
                <GitHubCalendar 
                  username={username}
                  blockSize={14}
                  blockMargin={5}
                  fontSize={12}
                  theme={customTheme}
                  colorScheme={theme}
                  loading={false}
                  transformData={(data) => {
                    return data.filter(day => day.date.split('-')[1] !== '04');
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Stats & Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Profile Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="md:col-span-2 glass-morphism rounded-3xl p-8 border border-primary/10 flex flex-col md:flex-row items-center gap-10"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition-all"></div>
                <img 
                  src={displayStats.avatar_url} 
                  alt={username} 
                  className="w-32 h-32 rounded-full border-4 border-primary/10 relative z-10"
                />
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-center md:text-left">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">Repositories</p>
                  <h4 className="text-3xl font-bold text-primary">{displayStats.public_repos}</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">Followers</p>
                  <h4 className="text-3xl font-bold text-primary">{displayStats.followers}</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">Following</p>
                  <h4 className="text-3xl font-bold text-primary">{displayStats.following}</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-secondary/60">Gists</p>
                  <h4 className="text-3xl font-bold text-primary">{displayStats.public_gists}</h4>
                </div>
              </div>
            </motion.div>

            {/* Quick Link Card */}
            <motion.a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass-morphism rounded-3xl p-8 border border-primary/10 flex flex-col justify-between group hover:border-accent/30 transition-all"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-colors">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">View Full Profile</h3>
                  <p className="text-sm text-secondary">Explore all my repositories and projects.</p>
                </div>
              </div>
              <div className="flex items-center text-accent text-sm font-bold uppercase tracking-widest pt-4 group-hover:translate-x-2 transition-transform">
                Visit GitHub <Star className="ml-2 w-4 h-4 fill-accent" />
              </div>
            </motion.a>
          </div>

          {/* LeetCode Activity Widget */}
          <div className="pt-12 border-t border-primary/10 mt-12 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-3">
                <Code2 className="text-accent" size={24} />
                <h3 className="text-2xl font-bold text-primary tracking-tight">LeetCode Progress</h3>
              </div>
              <a href="https://leetcode.com/Vishal_S_555" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-primary/10 text-xs font-bold uppercase tracking-widest text-primary hover:bg-accent hover:text-black hover:border-accent transition-all hidden md:block">
                View Profile
              </a>
            </div>
            <LeetCodeWidget />
          </div>

          {/* Spotify Activity Widget */}
          <div className="pt-12 border-t border-primary/10 mt-12 w-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">Listening Activity</h3>
            </div>
            <SpotifyWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubStats;
