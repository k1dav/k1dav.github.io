export type Project = {
  name: string;
  description: string;
  repo: string;
  demo?: string;
  tags: string[];
  archived?: boolean;
};

export type ProjectGroup = {
  title: string;
  description: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    title: '🤖 AI 與 MCP',
    description: '讓 AI 助手與 coding agent 能操作真實系統的工具。',
    projects: [
      {
        name: 'agentapi',
        description:
          '以 HTTP API 操作 Claude Code、Codex、Aider 等 coding agent，附 Web Chat 介面，可貼圖預覽與 Discord 橋接。',
        repo: 'https://github.com/k1dav-c/agentapi',
        tags: ['Go', 'AI Agent', 'Claude Code'],
      },
      {
        name: 'agent-virtual-office',
        description: '像素風虛擬辦公室，透過 MCP 即時觀看 AI Agent 工作狀態。',
        repo: 'https://github.com/k1dav-c/agent-virtual-office',
        tags: ['TypeScript', 'MCP', 'Pixel Art'],
      },
      {
        name: 'pokemon-mcp-server',
        description: '繁體中文寶可夢資料 MCP Server，查詢基本資訊、招式、特性。',
        repo: 'https://github.com/k1dav-c/pokemon-mcp-server',
        tags: ['Python', 'FastMCP'],
      },
      {
        name: 'proxmox-mcp-plus',
        description: 'Proxmox VE 管理 MCP：VM / 容器生命週期操作與 OpenAPI 介面。',
        repo: 'https://github.com/k1dav-c/proxmox-mcp-plus',
        tags: ['Python', 'MCP', 'Proxmox'],
        archived: true,
      },
      {
        name: 'taiwan-health-mcp',
        description: '台灣醫療健康 MCP：ICD-10、FDA 藥品、LOINC、FHIR R4 查詢。',
        repo: 'https://github.com/k1dav-c/taiwan-health-mcp',
        tags: ['Python', 'MCP', 'FHIR'],
        archived: true,
      },
    ],
  },
  {
    title: '🛠 網頁小工具',
    description: '解決日常小問題的工具，打開瀏覽器就能用，資料不離開本機。',
    projects: [
      {
        name: 'bakery-order',
        description: '烘焙店 / 團購訂單 Excel 整理：自動算金額、依面交與寄送分組、匯出報表。',
        repo: 'https://github.com/k1dav-c/bakery-order',
        demo: 'https://k1dav-c.github.io/bakery-order/',
        tags: ['React', 'Excel'],
      },
      {
        name: 'pdf-image-combine',
        description: 'PDF 與圖片的分組、合併與批量匯出工具。',
        repo: 'https://github.com/k1dav/pdf-image-combine',
        demo: 'https://www.k1dav.fun/pdf-image-combine/',
        tags: ['React', 'TypeScript', 'PDF'],
      },
      {
        name: 'smart-grid-splitter',
        description: '將單張圖片切割成網格拼圖，支援去背色與批次下載。',
        repo: 'https://github.com/k1dav/smart-grid-splitter',
        demo: 'https://www.k1dav.fun/smart-grid-splitter/',
        tags: ['React', 'Vite'],
      },
      {
        name: 'discord-webhook-proxy',
        description: '監聽 Discord 事件並依規則轉發到 Webhook，附 Streamlit 管理介面。',
        repo: 'https://github.com/k1dav/discord-webhook-proxy',
        tags: ['Python', 'Discord', 'Streamlit'],
      },
      {
        name: 'linkyee',
        description: '個人連結頁（Linktree 風格）。',
        repo: 'https://github.com/k1dav/linkyee',
        demo: 'https://www.k1dav.fun/linkyee/',
        tags: ['Web'],
      },
    ],
  },
  {
    title: '📦 過去的作品',
    description: '已封存、不再維護，但程式碼仍可參考。',
    projects: [
      {
        name: 'vibe-mazu',
        description: '媽祖遶境隊伍即時位置追蹤地圖。',
        repo: 'https://github.com/k1dav/vibe-mazu',
        tags: ['Vue', 'Leaflet'],
        archived: true,
      },
      {
        name: 'github-org-editor',
        description: 'GitHub 組織成員、團隊與儲存庫權限的批次管理工具。',
        repo: 'https://github.com/k1dav/github-org-editor',
        tags: ['Next.js', 'GitHub API'],
        archived: true,
      },
      {
        name: 'discord-org-edtior',
        description: 'Discord 身份組、成員與頻道權限管理，可同步 GitHub Teams。',
        repo: 'https://github.com/k1dav/discord-org-edtior',
        tags: ['Next.js', 'Discord'],
        archived: true,
      },
    ],
  },
];
