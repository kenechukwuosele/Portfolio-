import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sliders, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  FileJson, 
  RotateCcw,
  Volume2,
  Terminal,
  Palette
} from 'lucide-react';
import { PortfolioData, ThemeMode } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface DeveloperDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateDeveloperName: (name: string, title: string, bio: string) => void;
  onOpenAdmin?: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  viscosity: number;
  onViscosityChange: (v: number) => void;
  dispersion: number;
  onDispersionChange: (d: number) => void;
}

export const DeveloperDrawer: React.FC<DeveloperDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onUpdateDeveloperName,
  onOpenAdmin,
  theme,
  onThemeChange,
  viscosity,
  onViscosityChange,
  dispersion,
  onDispersionChange
}) => {
  const [activeTab, setActiveTab] = useState<'customizer' | 'json' | 'presets'>('customizer');
  const [copiedJson, setCopiedJson] = useState(false);
  const [editName, setEditName] = useState(data.developer.name);
  const [editTitle, setEditTitle] = useState(data.developer.title);
  const [editBio, setEditBio] = useState(data.developer.bio);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    soundFx.playGlassTap(1800, 0.05);
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playGlassChime();
    onUpdateDeveloperName(editName, editTitle, editBio);
  };

  const applyPreset = (preset: 'apple' | 'midnight' | 'iridescent' | 'frost') => {
    soundFx.playWhoosh();
    if (preset === 'apple') {
      onThemeChange('dark');
      onViscosityChange(0.5);
      onDispersionChange(0.035);
    } else if (preset === 'midnight') {
      onThemeChange('obsidian');
      onViscosityChange(0.8);
      onDispersionChange(0.02);
    } else if (preset === 'frost') {
      onThemeChange('light');
      onViscosityChange(0.3);
      onDispersionChange(0.015);
    } else if (preset === 'iridescent') {
      onThemeChange('dark');
      onViscosityChange(0.65);
      onDispersionChange(0.07);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex justify-end bg-neutral-950/70 backdrop-blur-xl"
        onClick={onClose}
        id="dev-drawer-backdrop"
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md h-full bg-[#09090b]/95 border-l border-white/15 shadow-2xl backdrop-blur-3xl flex flex-col overflow-hidden"
          id="developer-settings-drawer"
        >
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h3 className="font-light text-white text-sm tracking-tight">Configuration & Customizer</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="px-5 py-2.5 border-b border-white/10 bg-black/20 flex gap-2">
            <button
              onClick={() => setActiveTab('customizer')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'customizer' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              Live Editor
            </button>
            <button
              onClick={() => setActiveTab('presets')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'presets' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              Optical Presets
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeTab === 'json' ? 'bg-white text-black shadow-md' : 'text-white/60 hover:text-white'
              }`}
            >
              Raw Schema
            </button>
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto flex-1 space-y-6 text-xs text-white/70">
            {activeTab === 'customizer' && (
              <form onSubmit={handleApplyChanges} className="space-y-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 leading-relaxed font-light">
                  Edit fields below to test live layout and reactivity in real-time.
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-white/50">Developer Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-white/50">Professional Title</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-white/50">Bio Narrative</label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all shadow-md cursor-pointer"
                >
                  Apply Live Updates
                </button>

                {onOpenAdmin && (
                  <div className="pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        soundFx.playGlassTap(1600, 0.05);
                        onOpenAdmin();
                      }}
                      className="w-full py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-sky-400" />
                      <span>Open Full Admin Panel & Projects Manager</span>
                    </button>
                  </div>
                )}
              </form>
            )}

            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-white/50 text-xs">Choose an optical style preset:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => applyPreset('apple')}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-left space-y-1 transition-all"
                  >
                    <p className="font-medium text-white">Sleek Liquid Dark</p>
                    <p className="text-[10px] text-white/40">Sky optics, 50% viscosity</p>
                  </button>

                  <button
                    onClick={() => applyPreset('midnight')}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-left space-y-1 transition-all"
                  >
                    <p className="font-medium text-white">Midnight Obsidian</p>
                    <p className="text-[10px] text-white/40">Ultra dark, high viscosity</p>
                  </button>

                  <button
                    onClick={() => applyPreset('frost')}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-left space-y-1 transition-all"
                  >
                    <p className="font-medium text-white">Crystal Frost Light</p>
                    <p className="text-[10px] text-white/40">Clean crystal light</p>
                  </button>

                  <button
                    onClick={() => applyPreset('iridescent')}
                    className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-left space-y-1 transition-all"
                  >
                    <p className="font-medium text-white">Hyper Prism</p>
                    <p className="text-[10px] text-white/40">High chromatic dispersion</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'json' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-white/50">Full Portfolio JSON</span>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>
                <div className="p-3 rounded-2xl bg-black/60 border border-white/10 font-mono text-[10px] max-h-[400px] overflow-auto text-white/80">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
