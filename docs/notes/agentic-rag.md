---
title: "Agentic RAG"
slug: "/notes/agentic-rag"
tags:
  - "AI"
  - "Embedding"
  - "Generative"
  - "Information"
  - "NLP"
  - "Retrieval"
---
## What？

Agentic RAG 是一種結合 [Retrieval-Augmented Generation](/docs/notes/retrieval-augmented-generation)（RAG）與 Agent 的技術架構。簡單來說，它是一種讓 AI 模型在執行任務時既能利用擴充的外部資料，又能根據指令像代理人一樣自主決策的方法。這個技術通常用於需要高準確性和靈活性的場景，例如問答系統、資料檢索以及複雜的任務自動化。

舉例來說，如果你正在建立一個 AI 系統來回答法律問題， Agentic RAG 不僅可以幫助模型檢索相關法條，還能根據使用者需求進一步分析並生成答案，甚至執行後續指令。

---

## Who？

Agentic RAG 的主要使用者是技術工作者和工程師，特別是：
- **AI 開發者**：想要提升模型的資料準確性和任務自動化能力。
- **企業**：需要高效整合內部文件或外部數據來源。
- **研究人員**：在需要即時檢索大量資料並進行分析的情境下使用。

受影響的對象還包含最終使用這些系統的人，例如客戶服務人員、法律專業人士，甚至普通的大眾。

---

## When？

Agentic RAG 通常會在以下情境中被用到：
1. **跨領域知識查詢**：例如醫療、金融等需要準確性且多樣化的知識。
2. **多步驟任務處理**：當需要模型不僅回答問題，還要進一步執行操作（例如發送郵件或更新系統）。
3. **即時資料檢索與生成**：像是新聞摘要或技術文件分析。

簡而言之，只要情境涉及「需要外部支援」以及「自主決策能力」，就可能適合 Agentic RAG。

---

## Where？

Agentic RAG 通常出現在 AI 架構中的以下部分：
1. **檢索層（Retrieval Layer）**：負責從外部數據庫中找到相關資訊。
2. **生成層（Generation Layer）**：根據檢索到的內容生成答案或執行操作。
3. **代理層（Agent Layer）**：處理多步驟指令、決策流程以及額外功能。

它可以應用於 API 層、應用程式邏輯中，也可能整合到前端界面以提供互動式體驗。例如一個聊天機器人架構可能包含上述所有部分。

---

## Why？

Agentic RAG 的核心目的是解決以下問題：
1. **資訊不足問題**：傳統 [LLM](/docs/notes/foundational-model) （Large Language Model）只依賴訓練過的靜態數據，而 Agentic RAG 能透過檢索擴充模型知識。
2. **缺乏自主性問題**：一般 LLM 雖然擁有強大的生成能力，但無法執行複雜指令；加入代理層後，可以實現更高階的任務執行。
3. **提高準確性與靈活性**：結合檢索功能後，生成結果會更加精確，同時具備針對不同需求進一步調整答案的能力。

舉例來說，如果我們想開發一個 AI 法律助理，不僅要回答具體條款相關問題，還得幫助客戶撰寫完整合同——這正是 Agentic RAG 的最佳應用場景！

---

## How？

### 🛠️ 建立階段

建立 Agentic RAG 系統可以分為以下步驟：

1. **資料準備與索引**
   - 整合內部文檔或外部 API 資源，如 [Elasticsearch](/docs/notes/elasticsearch) 或[Vector DB](/docs/notes/vector-db)（Vector Database）。
   - 使用 [Embedding](/docs/notes/embedding) 技術將文本轉換為向量格式以便快速比對。

2. **建置 Retrieval 層**
   - 設定工具如 [LangChain](/docs/notes/langchain) 或 Pinecone，用於高效檢索相關資料。
   - 定義 Query 方式，例如基於[相似檢索](/docs/notes/similarity-search)或特定關鍵字搜索。

3. **建置 Generation 層**
   - 設定 LLM，如 OpenAI GPT 或 Hugging Face Transformers，用於生成文字回應。
   - 調整 Prompt Design 以提升回應品質和上下文連貫性。

4. **整合 Agent 層**
   - 使用框架如 LangChain Agents 讓模型能理解並完成多步驟指令。
   - 設計 Decision Logic，例如條件判斷和流程控制，使代理人能做出適當反應。

### 🔍 查詢階段

查詢階段通常包含以下流程：

1. 使用者輸入 Query，例如：「請幫我整理最新科技趨勢報告」。
2. 檢索層透過 Query 到向量資料庫中找到最相關內容。
3. 生成層根據檢索結果撰寫初步回覆，如：「以下是三大科技趨勢...」。
4. 代理層接收下一步指令，例如：「請將報告格式化成 PPT」，並完成額外操作。

---

## 補充說明

### 📌 範例比較

| 技術架構         | 特點                             | 適用場景                   |
|------------------|----------------------------------|----------------------------|
| 傳統 LLM         | 靜態數據；僅依賴訓練集           | 基本問答                  |
| Retrieval-Augmented Generation (RAG) | 動態擷取外部資訊              | 高準確性的回答             |
| Agentic RAG      | 擷取 + 自主決策                  | 跨領域、多步驟任務          |

### 🧠 延伸／常見誤解

1. 誤解：「RAG 就是 Agentic。」  
   澄清：RAG 著重在「擷取與生成」，但未必有自治能力；加入代理功能後才稱為 Agentic RAG。  
   
2. 誤解：「完全取代人工。」  
   澄清：Agentic RAG 是輔助工具，可以提升效率，但仍需人工監控和審核以避免錯誤。
