export type CodeVersion = {
  id: string;
  code: string;
  plan: any;
  explanation: string;
  timestamp: Date;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};