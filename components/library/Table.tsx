import React from 'react';

type TableProps = {
  headers: string[];
  rows: string[][];
};

export default function Table({ headers, rows }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {row.map((cell, j) => (
                <td key={j} className="px-6 py-4 text-sm text-gray-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}