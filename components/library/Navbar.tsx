import React from 'react';

type NavbarProps = {
  title: string;
  actions?: React.ReactNode;
};

export default function Navbar({ title, actions }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold">{title}</h1>
      {actions && <div className="flex gap-4">{actions}</div>}
    </nav>
  );
}