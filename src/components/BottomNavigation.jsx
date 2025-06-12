import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ClipboardList, Rocket, Users } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutGrid },
  { path: '/tasks', label: 'Tasks', icon: ClipboardList },
  { path: '/boost', label: 'Boost', icon: Rocket },
  { path: '/friends', label: 'Friends', icon: Users },
];

const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-1/4 py-1 text-gray-500 transition-colors ${
                isActive ? 'nav-item-active' : ''
              }`
            }
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;