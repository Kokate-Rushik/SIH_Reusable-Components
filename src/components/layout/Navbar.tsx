import React from 'react';
import { Layers, Search, Bell, User } from 'lucide-react';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  return (
    <header className="structural-header h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation"
            className="md:hidden p-2 rounded text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Layers className="h-5 w-5" />
          </button>
        )}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight">
            SIH
          </div>
          <div>
            <span className="font-semibold text-slate-900 text-sm block leading-none">
              Smart Operations
            </span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Workspace Core
            </span>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search records, reports, metrics..."
            className="w-full bg-slate-50 border border-slate-200 rounded text-xs pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="System notifications"
          className="p-2 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="h-5 w-[1px] bg-slate-200 mx-1" />

        <div className="flex items-center gap-2.5 pl-1">
          <div className="h-8 w-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-900 leading-none">
              System Admin
            </div>
            <div className="text-[10px] text-slate-500 leading-none mt-1">
              Production Node
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
