import React, { useMemo } from 'react';
import { Tab } from '../types';
import { HomeIcon } from './icons/HomeIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { ViewGridIcon } from './icons/ViewGridIcon';
import { useData } from '../DataContext';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenSidebar: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenSidebar,
}) => {
  const { unreadMessageCounts, notifications } = useData();

  const totalUnread = useMemo(() => {
    return Object.values(unreadMessageCounts).reduce((acc: number, count: number) => acc + count, 0);
  }, [unreadMessageCounts]);

  const notificationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    notifications.forEach((n) => {
      if (!n.isRead && n.linkTo) {
        counts[n.linkTo] = (counts[n.linkTo] || 0) + 1;
      }
    });
    return counts;
  }, [notifications]);

  const isMoreActive = !['feed', 'activities', 'chat', 'projects'].includes(activeTab);

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/80 dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] transition-transform duration-300"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-2 items-center">
        {/* Feed */}
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center justify-center relative py-1 transition-all duration-200 ${
            activeTab === 'feed'
              ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label="Feed"
        >
          <div className="relative">
            <HomeIcon />
            {activeTab === 'feed' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Feed</span>
        </button>

        {/* Activities */}
        <button
          onClick={() => setActiveTab('activities')}
          className={`flex flex-col items-center justify-center relative py-1 transition-all duration-200 ${
            activeTab === 'activities'
              ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label="Activities"
        >
          <div className="relative">
            <CalendarIcon />
            {(notificationCounts['activities'] || 0) > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-3.5 text-[8px] font-bold text-white bg-sky-500 rounded-full px-0.5 shadow-sm">
                {(notificationCounts['activities'] || 0) > 9 ? '9+' : notificationCounts['activities']}
              </span>
            )}
            {activeTab === 'activities' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Events</span>
        </button>

        {/* Chat / Messages */}
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center justify-center relative py-1 transition-all duration-200 ${
            activeTab === 'chat'
              ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label="Messages"
        >
          <div className="relative">
            <ChatBubbleIcon />
            {totalUnread > 0 && (
              <span className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[16px] h-4 text-[9px] font-bold text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full px-1 shadow-sm animate-pulse">
                {totalUnread > 99 ? '99+' : totalUnread}
              </span>
            )}
            {activeTab === 'chat' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Chat</span>
        </button>

        {/* Projects */}
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center justify-center relative py-1 transition-all duration-200 ${
            activeTab === 'projects'
              ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label="Projects"
        >
          <div className="relative">
            <ClipboardListIcon />
            {(notificationCounts['projects'] || 0) > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-3.5 text-[8px] font-bold text-white bg-sky-500 rounded-full px-0.5 shadow-sm">
                {(notificationCounts['projects'] || 0) > 9 ? '9+' : notificationCounts['projects']}
              </span>
            )}
            {activeTab === 'projects' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Projects</span>
        </button>

        {/* More Menu (Opens full Sidebar) */}
        <button
          onClick={onOpenSidebar}
          className={`flex flex-col items-center justify-center relative py-1 transition-all duration-200 ${
            isMoreActive
              ? 'text-sky-600 dark:text-sky-400 font-bold scale-105'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          aria-label="More club features and menu"
        >
          <div className="relative">
            <ViewGridIcon />
            {isMoreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-sm shadow-sky-500/50"></span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Menu</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
