# k1dav.github.io

S.Feng 技術手扎，使用 [Docusaurus 3](https://docusaurus.io/) 建置，透過 GitHub Actions 部署到 GitHub Pages，網址為 <https://k1dav.github.io>。

## 開發

```bash
npm install
npm start        # http://localhost:3000
npm run build    # 輸出到 build/
```

## 內容結構

| 路徑 | 說明 |
| --- | --- |
| `docs/intro.md` | Wiki 首頁 |
| `docs/playbooks/` | DevOps / 基礎設施實作手冊（由 Obsidian 匯入） |
| `docs/notes/` | 技術名詞筆記（由 Obsidian 匯入） |
| `docs/tutorials/` | 系列教學 |
| `blog/` | 部落格文章 |

## 從 Obsidian 同步筆記

```bash
node scripts/import-obsidian.mjs ~/data/obsidian
```

腳本只匯入 `10 - Playbooks` 與 `05 - Notes`，會：

- 轉換 `[[wikilink]]` 與 `![[圖片]]`，並複製附件
- 排除含客戶 / 公司內部資訊的筆記與截圖（見腳本中的 `EXCLUDE`、`EXCLUDE_IMAGES`）
- 遮蔽公司內部網域（`REDACT`）

**新增筆記後請先檢查 diff 是否有敏感資訊再 commit。** `docs/playbooks`、`docs/notes` 每次執行都會整個重建，請不要直接在那裡改內容。

## 部署

push 到 `main` 後由 `.github/workflows/gh-pages.yml` 自動 build 並部署；PR 只會跑 build 檢查。
