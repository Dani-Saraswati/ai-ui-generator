'use client';

import { CodeVersion } from '@/types';

type CodePanelProps = {
  code: string;
  versions: CodeVersion[];
  currentVersionId: string | null;
  onCodeChange: (code: string) => void;
  onRollback: (versionId: string) => void;
};

export default function CodePanel({
  code,
  versions,
  currentVersionId,
  onCodeChange,
  onRollback,
}: CodePanelProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Generated Code</h2>
        
        {/* Version History */}
        {versions.length > 0 && (
          <div className="mt-2">
            <label className="text-sm text-gray-600">Version History:</label>
            <select
              value={currentVersionId || ''}
              onChange={(e) => onRollback(e.target.value)}
              className="mt-1 w-full px-3 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {versions.map((v, idx) => (
                <option key={v.id} value={v.id}>
                  Version {versions.length - idx} - {new Date(v.timestamp).toLocaleTimeString()}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="flex-1 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Generated code will appear here..."
          className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-green-400 resize-none outline-none"
          spellCheck={false}
        />
      </div>
    </div>
  );
}