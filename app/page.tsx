'use client';

import { useState } from 'react';
import { CodeVersion, ChatMessage } from '@/types';
import ChatPanel from '@/components/ChatPanel';
import CodePanel from '@/components/CodePanel';
import PreviewPanel from '@/components/PreviewPanel';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [versions, setVersions] = useState<CodeVersion[]>([]);
  const [currentVersionId, setCurrentVersionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentVersion = versions.find(v => v.id === currentVersionId);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          existingCode: currentVersion?.code,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed');
      }

      // Create new version
      const newVersion: CodeVersion = {
        id: Date.now().toString(),
        code: data.code,
        plan: data.plan,
        explanation: data.explanation,
        timestamp: new Date(),
      };

      setVersions(prev => [...prev, newVersion]);
      setCurrentVersionId(newVersion.id);

      // Add AI response
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.explanation,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error: any) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRollback = (versionId: string) => {
    setCurrentVersionId(versionId);
  };

  const handleCodeEdit = (newCode: string) => {
    if (!currentVersion) return;
    
    const updatedVersion = { ...currentVersion, code: newCode };
    setVersions(prev => prev.map(v => v.id === currentVersion.id ? updatedVersion : v));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel: Chat */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
        />
      </div>

      {/* Middle Panel: Code Editor */}
      <div className="w-1/3 border-r border-gray-300 bg-white">
        <CodePanel
          code={currentVersion?.code || ''}
          versions={versions}
          currentVersionId={currentVersionId}
          onCodeChange={handleCodeEdit}
          onRollback={handleRollback}
        />
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/3 bg-gray-50">
        <PreviewPanel code={currentVersion?.code || ''} />
      </div>
    </div>
  );
}