'use client';

import { ComponentRegistry } from './ComponentRegistry';
import { useEffect, useState } from 'react';
import * as Babel from '@babel/standalone';
import React from 'react';

type PreviewPanelProps = {
  code: string;
};

export default function PreviewPanel({ code }: PreviewPanelProps) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setComponent(null);
      setError(null);
      return;
    }

    try {
      // remove export default
      let cleanCode = code.trim();
      cleanCode = cleanCode.replace(/^export\s+default\s+/, '');

      // STEP 1: transpile JSX/TSX -> JS
      const transpiled = Babel.transform(cleanCode, {
        presets: ['react', 'typescript'],
        filename: 'generated.tsx',
      }).code;

      // STEP 2: create executable code
      const wrappedCode = `
        const React = arguments[1];
        const { ${Object.keys(ComponentRegistry).join(', ')} } = arguments[0];

        ${transpiled}

        return GeneratedUI;
      `;

      // STEP 3: execute compiled code
      const func = new Function(wrappedCode);

      const GeneratedComponent = func(ComponentRegistry, React);

      if (!GeneratedComponent) {
        throw new Error("Component not returned. Make sure component name is 'GeneratedUI'");
      }

      setComponent(() => GeneratedComponent);
      setError(null);

    } catch (err: any) {
      console.error('Preview error:', err);
      setError(err.message);
      setComponent(null);
    }
  }, [code]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
      </div>

      <div className="flex-1 overflow-auto bg-white">
        {error && (
          <div className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-medium">Preview Error:</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        )}

        {!code && !error && (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Preview will appear here</p>
          </div>
        )}

        {Component && !error && (
          <div className="p-4">
            <Component />
          </div>
        )}
      </div>
    </div>
  );
}
