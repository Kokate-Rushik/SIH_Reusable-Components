import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UploadCloud, BarChart3, Settings, ShieldCheck, X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const mainNavigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Upload',
    href: '/upload',
    icon: UploadCloud,
  },
  {
    name: 'Report Analysis',
    href: '/analysis',
    icon: BarChart3,
  },
];

const secondaryNavigation = [
  {
    name: 'Security & Audit',
    href: '#audit',
    icon: ShieldCheck,
    disabled: true,
  },
  {
    name: 'Configuration',
    href: '#settings',
    icon: Settings,
    disabled: true,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpenMobile = false,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs z-30 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'structural-sidebar fixed inset-y-0 left-0 z-40 w-64 flex flex-col justify-between transition-transform duration-200 ease-in-out md:static md:translate-x-0 shadow-lg md:shadow-none bg-white',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="flex flex-col flex-1 px-3 py-4 space-y-6">
          {/* Mobile-only header with close button */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-200 px-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight">
                SIH
              </div>
              <span className="font-semibold text-slate-900 text-xs">Workspace</span>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close sidebar"
              className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div>
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Core Modules
            </div>
            <nav className="space-y-1">
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 text-xs font-medium rounded transition-colors',
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      )
                    }
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              System Control
            </div>
            <nav className="space-y-1">
              {secondaryNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium rounded text-slate-400 cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase">
                      Soon
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="text-[11px] text-slate-500 font-medium">
            SIH Core Engine
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Architecture Release v1.0.0
          </div>
        </div>
      </aside>
    </>
  );
};
