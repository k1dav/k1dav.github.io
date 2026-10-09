#!/usr/bin/env node
// 將 Obsidian Vault 中可公開的技術筆記轉成 Docusaurus 文件。
// 用法：node scripts/import-obsidian.mjs [vault 路徑]
// 只會匯入 SECTIONS 列出的資料夾，並排除 EXCLUDE 中含內部 / 客戶資訊的檔案。
import fs from 'node:fs';
import path from 'node:path';

const VAULT = path.resolve(process.argv[2] ?? `${process.env.HOME}/data/obsidian`);
const DOCS = path.resolve(import.meta.dirname, '..', 'docs');

const SECTIONS = [
  {src: '10 - Playbooks', dest: 'playbooks', label: 'Playbooks', position: 2,
    description: 'DevOps 與基礎設施的實作手冊：自架服務、網路、SSO、K8s。'},
  {src: '05 - Notes', dest: 'notes', label: '技術名詞筆記', position: 3,
    description: 'AI / MLOps / 軟體工程常見名詞的整理筆記。'},
];

// 含公司內部網址、客戶專案或私人連線資訊，不公開
const EXCLUDE = new Set([
  '確認 Azure Registry Tag.md',
  '地端部署 - OIDC 加入.md',
  'Harbor.md',
  '連線 GPU 主機 via Tailscale.md',
]);

// 截圖中含客戶 subscription ID / 公司內部網域，不公開
const EXCLUDE_IMAGES = new Set([
  'Azure ACR Task Run 建立失敗-assets/image 9.png',
  'Authentik 以 Google 作為帳號來源-assets/image 8.png',
]);

// 公司網域 / 名稱一律換成 company.example
const REDACT = [
  [/[\w.-]*ap-?mic\.[a-z]{2,}/gi, 'company.example'],
  [/ap-?mic/gi, 'company'],
];

const slugify = (name) =>
  name.replace(/\.md$/, '').trim()
    .replace(/[\s／/（）()]+/g, '-')
    .replace(/[^\p{L}\p{N}\-_.]/gu, '')
    .replace(/-+/g, '-').replace(/^-|-$/g, '')
    .toLowerCase();

const walk = (dir) => fs.readdirSync(dir, {withFileTypes: true}).flatMap((e) => {
  const p = path.join(dir, e.name);
  if (e.name.startsWith('.')) return [];
  return e.isDirectory() ? walk(p) : [p];
});

// 1. 收集所有要匯入的筆記，建立 名稱 → URL 對照表（給 wikilink 用）
const notes = [];
const linkMap = new Map();
for (const s of SECTIONS) {
  for (const file of walk(path.join(VAULT, s.src))) {
    const base = path.basename(file);
    if (!base.endsWith('.md') || EXCLUDE.has(base)) continue;
    const slug = slugify(base);
    const sub = path.relative(path.join(VAULT, s.src), path.dirname(file));
    notes.push({file, section: s, slug, sub, title: base.replace(/\.md$/, '')});
    linkMap.set(base.replace(/\.md$/, '').toLowerCase(), `/docs/${s.dest}/${slug}`);
  }
}

// Vault 內所有附件，依檔名索引
const attachments = new Map();
for (const f of walk(VAULT)) if (!f.endsWith('.md')) attachments.set(path.basename(f), f);

const yamlStr = (v) => JSON.stringify(String(v));

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return {fm: {}, body: text};
  const fm = {};
  let key = null;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) { key = kv[1]; fm[key] = kv[2] ? kv[2].replace(/^["']|["']$/g, '') : []; continue; }
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && key && Array.isArray(fm[key])) fm[key].push(item[1].replace(/^["']|["']$/g, ''));
  }
  return {fm, body: text.slice(m[0].length)};
}

// 圖片複製到 img/；Obsidian 的 xxx-assets/image 1.png 檔名會重複，加上資料夾名稱區分
function copyImage(src, alt, outDir) {
  if (EXCLUDE_IMAGES.has(path.relative(path.join(VAULT, '99 - Attachments'), src))) return '';
  const imgDir = path.join(outDir, 'img');
  fs.mkdirSync(imgDir, {recursive: true});
  const parent = path.basename(path.dirname(src));
  const prefix = parent.endsWith('-assets') ? `${slugify(parent.replace(/-assets$/, ''))}-` : '';
  const fname = (prefix + path.basename(src)).replace(/\s+/g, '-');
  fs.copyFileSync(src, path.join(imgDir, fname));
  return `![${alt}](./img/${fname})`;
}

function convert(body, note, outDir) {
  for (const [re, rep] of REDACT) body = body.replace(re, rep);
  const lines = body.split('\n');
  let inFence = false;
  const out = [];
  for (let line of lines) {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; out.push(line); continue; }
    if (inFence) { out.push(line); continue; }
    // AI 產生的假 imgur 示意圖，連結失效，直接移除
    if (/^!\[[^\]]*\]\(https:\/\/i\.imgur\.com\/[^)]+\)\s*$/.test(line)) continue;
    // 文件標題由 frontmatter 提供，內文 H1 降一級
    line = line.replace(/^# /, '## ');
    // Obsidian callout: > [!warning] xxx → > **WARNING** xxx
    line = line.replace(/^(>\s*)\[!(\w+)\][-+]?\s*/, (_, p, t) => `${p}**${t.toUpperCase()}** `);
    // 註解 %% ... %%
    line = line.replace(/%%.*?%%/g, '');
    // 圖片 ![[file.png|300]]
    line = line.replace(/!\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, (_, name) => {
      const src = attachments.get(path.basename(name));
      return src ? copyImage(src, path.basename(name), outDir) : '';
    });
    // 一般 Markdown 圖片 ![alt](相對 vault 或筆記的路徑)
    line = line.replace(/!\[([^\]]*)\]\((?!https?:)([^)]+)\)/g, (_, alt, ref) => {
      const rel = decodeURIComponent(ref.replace(/^<|>$/g, ''));
      const src = [path.join(VAULT, rel), path.join(path.dirname(note.file), rel)]
        .find((p) => fs.existsSync(p)) ?? attachments.get(path.basename(rel));
      return src ? copyImage(src, alt, outDir) : '';
    });
    // 沒寫 scheme 的外部連結 [x](github.com/foo) 會被當成站內相對路徑
    line = line.replace(/\]\(((?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^)]*)?)\)/gi, (all, url) =>
      /\.(mdx?|png|jpe?g|gif|svg|pdf)$/i.test(url) ? all : `](https://${url})`);
    // 連結 [[Note#heading|alias]]
    line = line.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (_, target, alias) => {
      const url = linkMap.get(target.trim().toLowerCase());
      const text = (alias ?? target).trim();
      return url ? `[${text}](${url})` : text;
    });
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// 2. 清掉舊的匯入結果後重新產生
for (const s of SECTIONS) {
  const dir = path.join(DOCS, s.dest);
  fs.rmSync(dir, {recursive: true, force: true});
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, '_category_.json'), JSON.stringify({
    label: s.label, position: s.position,
    link: {type: 'generated-index', slug: `/${s.dest}`, description: s.description},
  }, null, 2) + '\n');
}

for (const note of notes) {
  const outDir = path.join(DOCS, note.section.dest, note.sub);
  fs.mkdirSync(outDir, {recursive: true});
  const {fm, body} = parseFrontmatter(fs.readFileSync(note.file, 'utf8'));
  const tags = (Array.isArray(fm.tags) ? fm.tags : []).filter(Boolean);
  const header = [
    '---',
    `title: ${yamlStr(note.title)}`,
    `slug: ${yamlStr(`/${note.section.dest}/${note.slug}`)}`,
    ...(tags.length ? ['tags:', ...tags.map((t) => `  - ${yamlStr(t)}`)] : []),
    '---',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(outDir, `${note.slug}.md`), header + convert(body, note, outDir));
}

console.log(`Imported ${notes.length} notes from ${VAULT}`);
