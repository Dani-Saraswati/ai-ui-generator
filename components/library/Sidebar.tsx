import React from 'react';

type SidebarProps = {
  items: { label: string; icon?: string }[];
  children?: React.ReactNode;
};

export default function Sidebar({ items, children }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="px-4 py-2 rounded-lg hover:bg-gray-700 cursor-pointer">
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </div>
        ))}
      </nav>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}