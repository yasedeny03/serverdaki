import React from 'react';
import { NavLink } from 'react-router-dom';
import { FolderOpen, Users, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../../../lib/utils';

const navItems = [
  { to: '/admin/albums', icon: FolderOpen, label: 'Albums' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/settings', icon: SettingsIcon, label: 'Settings' },
];

export function AdminNav() {
  return (
    <nav className="flex gap-1 border-b pb-4">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium',
              isActive
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            )
          }
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}