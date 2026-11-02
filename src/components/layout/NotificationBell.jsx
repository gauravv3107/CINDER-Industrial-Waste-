import React, { useState, useRef, useEffect } from 'react';
import { useNotifications } from '../../context/NotificationsContext';
import { Bell, CheckCheck, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export function NotificationBell({ className = '' }) {
  const { notifications, unreadCount, hasUnread, markAllRead, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    setIsOpen(false);
    if (notif.route) {
      navigate(notif.route);
    }
  };

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open notifications"
        className="relative p-2 rounded-element bg-card border border-border-subtle hover:border-border-strong text-tsecondary hover:text-tprimary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal"
      >
        <Bell className="w-4 h-4" />
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
        )}
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-card border border-border-strong rounded-card shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border-subtle mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-tprimary">Notifications</span>
              {hasUnread && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 font-semibold">
                  {unreadCount} NEW
                </span>
              )}
            </div>

            {hasUnread && (
              <button
                type="button"
                onClick={markAllRead}
                className="text-[11px] text-thermal hover:text-thermal-hover flex items-center gap-1 font-medium"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-border-subtle/50 max-h-80 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={clsx(
                  'p-3 rounded-element transition-colors cursor-pointer text-left space-y-1',
                  notif.read ? 'hover:bg-card-raised opacity-70' : 'bg-card-raised hover:bg-card-raised/80 font-medium'
                )}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-tprimary leading-tight">
                    {notif.title}
                  </span>
                  <span className="text-[10px] font-mono text-tmuted shrink-0 ml-2">
                    {notif.timeAgo}
                  </span>
                </div>
                <p className="text-[11px] text-tsecondary leading-normal">
                  {notif.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
