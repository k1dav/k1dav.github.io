---
slug: docusaurus-3-upgrade
title: 把 2022 年的 Docusaurus 2 升級到 3，順便接上 Obsidian 筆記
authors: [dave]
tags: [docusaurus, github action, obsidian, github pages]
date: 2026-10-10T20:00
---

這個站從 2022 年架起來後就沒怎麼動過，還停在 Docusaurus 2.2。這次一口氣升級到 Docusaurus 3，把平常寫在 Obsidian 的技術筆記搬上來，也換了新網域 `www.k1dav.fun`。

<!-- truncate -->

## 為什麼要升級

- Docusaurus 2 停在 React 17 與 MDX 1，套件早就過時
- 原本用的 Algolia DocSearch scraper 已經停止維護，搜尋索引好幾年沒更新
- 平常的筆記都寫在 Obsidian，網站卻一直沒有新內容

## 1. 專案結構：從 `app/` 搬到根目錄

舊版把整個站放在 `app/` 子目錄，CI 和 VS Code task 都要特別指定路徑。這次直接用 `create-docusaurus` 產生新的 v3 樣板，再把舊內容搬進去：

```text
docs/
├── intro.md
├── playbooks/   # Obsidian 匯入：DevOps / 基礎設施實作手冊
├── notes/       # Obsidian 匯入：AI / MLOps 技術名詞
└── tutorials/   # 舊的系列教學
blog/
src/
static/
```

## 2. MDX 3 的坑

升級後最常遇到的錯誤是這個：

```text
Unexpected lazy line in container, expected line to be prefixed with `>`
when in a block quote, whitespace when in a list, etc
```

原因是舊文章在清單項目後面**直接**接 JSX：

```mdx
2. 從 Package Manager import
<img src={require('./import.png').default} />
```

MDX 3 對縮排與區塊邊界比較嚴格，在 `<img` 前面空一行就好了。另外 React 19 的 `style` 要用 camelCase，`'max-width'` 要改成 `maxWidth`。

還有一個比較隱藏的問題：設定 `markdown.format: 'detect'` 之後，`.md` 會用 CommonMark 解析，`.mdx` 才用 MDX。所以 `.md` 裡的 `<img src={require(...)}>` 不會報錯，而是**直接被當成文字印出來**。把這種寫法改回 Markdown 圖片語法就好：

```md
![Cloud Scheduler Step 1](./cs_1.png)
```

## 3. 從 Obsidian 匯入筆記

寫了一支 `scripts/import-obsidian.mjs`，只匯入指定的資料夾，並處理 Obsidian 特有的語法：

| Obsidian | 轉換後 |
| --- | --- |
| `[[Note\|別名]]` | `[別名](/docs/notes/note)`，找不到的變純文字 |
| `![[image.png]]` | 複製附件到 `img/`，改成 Markdown 圖片 |
| `> [!warning]` callout | `> **WARNING**` |
| `%% 註解 %%` | 移除 |

因為 Vault 裡混著工作內容，腳本另外做了三層保護：

1. **EXCLUDE**：含內部資訊的筆記整篇不匯入
2. **EXCLUDE_IMAGES**：截圖拍到內部網域或雲端 ID 的，圖片不匯入
3. **REDACT**：內文中的公司網域一律換成 `company.example`

匯入後的 `.md` 都用 CommonMark 解析，不用擔心筆記裡的 `<`、`{}` 被 MDX 當成 JSX。

:::tip
匯入的資料夾每次都會整個重建，要修改內容請回 Obsidian 改，再重新執行腳本。commit 前記得看一下 diff 有沒有敏感資訊。
:::

## 4. 搜尋：Algolia → 本地搜尋

改用 [`@easyops-cn/docusaurus-search-local`](https://github.com/easyops-cn/docusaurus-search-local)，build 時直接產生索引，不需要外部服務，也支援中文：

```ts
themes: [
  [
    '@easyops-cn/docusaurus-search-local',
    {hashed: true, language: ['en', 'zh'], indexBlog: true},
  ],
],
```

## 5. GitHub Actions 部署

workflow 換成官方 Pages actions 的新版本，PR 只跑 build 檢查，push 到 `main` 才部署：

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0   # showLastUpdateTime 需要完整 git 歷史
      - uses: actions/setup-node@v4
        with: {node-version: 22, cache: npm}
      - run: npm ci
      - run: npm run build
      - if: github.event_name != 'pull_request'
        uses: actions/upload-pages-artifact@v3
        with: {path: build}
  deploy:
    if: github.event_name != 'pull_request'
    steps:
      - uses: actions/deploy-pages@v4
```

## 6. 自訂網域 `www.k1dav.fun`

主網域 `k1dav.fun` 另有用途，所以網站放在 `www` 子網域：

1. `static/CNAME` 寫入 `www.k1dav.fun`，`docusaurus.config.ts` 的 `url` 改成 `https://www.k1dav.fun`
2. Cloudflare 新增 `CNAME www → k1dav.github.io`，**先設成 DNS only（灰雲）**，不然 GitHub 發不了憑證
3. GitHub → Settings → Pages 填入 custom domain，憑證發好後勾選 **Enforce HTTPS**

有個意外的副作用：**使用者網站**（`<user>.github.io`）設了自訂網域後，同帳號其他 repo 的 GitHub Pages 也會一起搬過去。例如原本的 `k1dav.github.io/pdf-image-combine/` 變成了 `www.k1dav.fun/pdf-image-combine/`，有外部連結的話要記得更新。

## 7. 順手清掉舊截圖裡的 token

整理舊文章時發現，2022 年的幾張教學截圖拍到了 API token 和 session cookie。圖片已經拿掉，但它們還留在 git 歷史裡，所以真正的處理方式是**撤銷那些 token**。

為了避免再發生，也在 repo 開了 GitHub 的 **Secret scanning push protection**，之後 commit 裡如果夾帶 token，push 時就會被擋下。公開 repo 免費，到 Settings → Code security 就能開。

## 結果

- Docusaurus 2.2 → 3.10（React 19、MDX 3）
- 新增約 180 篇從 Obsidian 匯入的 Playbooks 與技術名詞筆記
- 本地中文搜尋、[Projects](/projects) 頁面
- 網站：<https://www.k1dav.fun>
