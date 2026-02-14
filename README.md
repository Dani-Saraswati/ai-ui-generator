# AI UI Generator

A deterministic AI-powered UI generator that converts natural language into working React components using a multi-agent system.

**Live Demo:** [Add your Vercel URL here after deployment]  
**Demo Video:** [Add your Loom/YouTube link here]  
**Repository:** https://github.com/YOUR-USERNAME/ai-ui-generator

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ installed
- Git installed

### Step 1: Clone & Install
```bash
git clone [your-repo-url]
cd ui-generator
npm install
```

### Step 2: Get Free API Key
1. Visit https://console.groq.com/
2. Sign up (no payment required)
3. Go to "API Keys" → "Create API Key"
4. Copy the key

### Step 3: Configure Environment
Create `.env.local` in project root:
```bash
GROQ_API_KEY=gsk_your_key_here
```

### Step 4: Run
```bash
npm run dev
```

Open http://localhost:3000

### Test It Works
Type in chat: **"Create a login page with email and password inputs"**

You should see:
- ✅ AI response in left panel
- ✅ Generated code in middle panel  
- ✅ Live preview in right panel

---

## Troubleshooting

**Error: Module not found**
```bash
npm install
```

**Error: API key invalid**
- Check `.env.local` has `GROQ_API_KEY=gsk_...`
- Restart server: `Ctrl+C` then `npm run dev`
