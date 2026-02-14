import React from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {title && <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>}
      <div className="text-gray-700">{children}</div>
    </div>
  );
}