---
title: "Claude Code"
slug: "/notes/claude-code"
tags:
  - "AI"
  - "NLP"
  - "Programming"
  - "Tools"
  - "JavaScript"
  - "Runtime"
---
## What？

Claude Code 是一種由 Anthropic 開發的 AI 模型，專注於自然語言處理任務。它能夠理解並生成人類語言，適用於多種應用場景，例如程式碼生成、技術文件撰寫以及資料分析等。簡單來說，它就像是一位能幫助技術工作者快速完成繁瑣工作的智慧助手。

比方說，如果你正在開發一個 Web 應用程式，透過 Claude Code，可以快速生成 JavaScript 或 Python 程式碼段，甚至檢查邏輯錯誤或改善程式效率。

---

## Who？

Claude Code 的主要使用者包括但不限於以下群體：
- **軟體工程師**：需要快速生成或校驗程式碼。
- **資料科學家**：進行資料清理或分析時需要協助。
- **技術文件撰寫者**：撰寫高品質的文件和報告。
- **AI 研究人員**：探索自然語言模型新功能或應用。

此外，也可能影響非技術背景的人士，例如希望將 AI 融入公司流程的產品經理或業務開發者。

---

## When？

Claude Code 通常會在以下情境中派上用場：
1. **程式開發初期**：快速搭建基本架構。
2. **問題排查階段**：檢測程式中的潛在 Bug 或邏輯錯誤。
3. **性能優化階段**：重構現有程式碼以提升效能。
4. **技術溝通過程**：協助整理複雜概念成清晰的文件。

舉例來說，當你需要為一個 REST API 建立基礎架構，但時間有限，可以請 Claude Code 提供模板並進一步修改。

---

## Where？

Claude Code 可以融入多種系統架構中，包括但不限於：
1. **前端開發工具鏈**：例如與 React 或 Vue.js 搭配，用來生成 UI 元件。
2. **後端服務系統**：為 Node.js、Django 等框架提供支援性代碼。
3. **DevOps 流程中**：例如產生 CI/CD Pipeline 的 YAML 檔案模板或自動化腳本。
4. **系統整合層級**：協助設計 API 規格或者第三方服務整合代碼。

---

## Why？

Claude Code 主要解決以下問題：
1. **減少重複性工作負擔**：不需手動編寫重複性代碼片段，提高效率。
2. **降低錯誤率**：透過 AI 模型校驗邏輯和語法錯誤，避免常見 Bug。
3. **加速開發流程**：即使不熟悉某些框架，也能迅速產生有效代碼。
4. **提升知識普及度**：幫助非技術背景人員更快理解技術概念。

例如，一位新手工程師可能不熟悉 Docker 指令，可以透過 Claude Code 直接生成正確的 `Dockerfile` 配置方式，並附上註解說明。

---

## How？

### 🛠️ 建立階段

1. 確定應用場景，例如建立 API 架構或處理資料分析任務。
2. 使用 Claude Code 提供的界面輸入需求描述，例如：「請幫我建立一個 Django REST Framework 的基礎項目。」
3. Claude Code 將回傳相應的代碼片段與步驟指引，例如範例配置檔案及初始路由設定。
4. 使用者審核結果並進行微調，以符合實際需求。

### 🔍 查詢階段

1. 提出具體問題，例如：「這段 SQL 查詢可以優化嗎？」或者「這裡有沒有潛在 Bug？」
2. Claude Code 回傳診斷結果，比如指出 WHERE 子句中可能缺少索引條件以提高查詢效能。
3. 根據模型建議改進代碼，再次確認產出是否符合預期。

舉例流程如下：
```plaintext
輸入需求描述 -> Claude 鍵入結果 -> 使用者微調 -> 完成
```

---

## 補充說明

### 📌 範例比較

#### 比較工具性能
| 特性           | Claude Code         | GitHub Copilot     |
|----------------|---------------------|--------------------|
| 語言理解能力   | 高                  | 中等               |
| 支援語言種類   | 幾乎所有主流編程語言  | 限制部分主流語言    |
| 文件生成能力   | 優秀                | 一般               |

#### 查詢結果比較
假設要找出 SQL 中性能瓶頸：
- Claude 的回覆會包含詳細性能分析步驟與建議索引策略。
- Copilot 則偏向提供直接優化後的 SQL 語句，但缺乏解釋細節。

#### 安裝指令
```bash
# Download and install nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# in lieu of restarting the shell
\. "$HOME/.nvm/nvm.sh"

# Download and install Node.js:
nvm install 22

# Verify the Node.js version:
node -v # Should print "v22.18.0".
nvm current # Should print "v22.18.0".

# Verify npm version:
npm -v # Should print "10.9.3".

npm install -g @anthropic-ai/claude-code
```

### 🧠 延伸／常見誤解

1. 誤以為 AI 能完全取代工程師。事實上，它只能輔助完成特定任務，需要依賴人的判斷力與經驗完善成果。
2. 有些使用者認為 Claude 能即時產生高品質完整專案，但其核心仍偏向「局部輔助」，尤其是大型專案仍需人工參與設計與管理。 

---
