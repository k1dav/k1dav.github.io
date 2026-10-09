---
title: "Semantic Search"
slug: "/notes/semantic-search"
---
## What？

**語意搜尋（Semantic Search）** 是一種超越關鍵字比對、透過「語意相似度」來找出相關內容的搜尋技術。
它將查詢與資料都轉換為 **[Embedding](/docs/notes/embedding)表示（embedding）**，再透過數學距離計算相似程度。

> 📚 舉例：
> 使用者查詢：「如何快速請病假？」
> → 系統找到：「員工若身體不適，可透過HR系統申請請假」這類句子
> → 而非只找出含有「病假」的段落

## Who？

- **開發者／資料工程師**：建構向量資料庫 + 搜尋系統
- **企業**：部署內部文件查詢、客服知識系統、推薦系統
- **最終用戶**：在使用 AI 工具時，享受語意精準的查詢結果（如 ChatGPT 插件、Notion AI 搜尋）

## When？

- **概念初現**：2018 年起隨著 BERT 發展
- **正式應用**：2020 年開始，Sentence-BERT、Dense Passage Retrieval 等模型普及
- **成熟普及**：2022–2025 年，在 RAG、問答系統、推薦系統中廣泛使用

## Where？

- **企業內部知識查詢（企業 RAG）**
- **客服 FAQ 系統**
- **電商推薦（相似商品、相似搜尋）**
- **法務/醫療文件搜尋**
- **多語系檔案搜尋與問答（跨語言 embedding）**

## Why？

- 解決傳統關鍵字搜尋無法理解語意的問題
- 能找到**意思相近但用詞不同**的資料（例：「上班請假」 ≈ 「工作缺勤申請」）
- 是實現「智慧問答」、「上下文查詢」、「個人化推薦」的關鍵技術
- 是 LLM 在企業中「連接實際知識」的橋樑

## How？

語意搜尋流程如下：

#### 🛠️ 建立階段

1. **對資料分段（chunking）**
2. **每段資料經過[嵌入模型](/docs/notes/embedding-model)（embedding model）轉換成[向量](/docs/notes/embedding)**
3. **將所有向量儲存進向量資料庫（如 FAISS、Weaviate）**

#### 🔍 查詢階段

1. **使用者輸入問題**
2. **問題也經過 embedding 模型轉為查詢向量**
3. **計算查詢向量與資料庫中所有向量的相似度（cosine similarity）**
4. **取前 k 個相似內容做為搜尋結果**

## 補充說明

### 🔧 關鍵技術工具

|元件|選項或工具|
|---|---|
|向量資料庫|FAISS, Qdrant, Weaviate, Milvus|
|嵌入模型|OpenAI Embedding, BGE, E5, Instructor, LaBSE|
|查詢比對方式|Cosine similarity, Dot product|
|提升精度技術|Re-ranking（如 Cohere reranker、colBERT）Metadata Filter（根據標籤過濾）Hybrid Search（語意 + 關鍵字）|

### 📌 範例比較

|查詢|關鍵字搜尋結果|語意搜尋結果|
|---|---|---|
|「怎麼請產假？」|找不到或只找到「病假」|找到「申請產假流程說明」|
|「電池膨脹怎麼辦」|只找到「電池」、「維修」關鍵字段落|找到「若電池鼓脹，請聯絡維修部門」|

### 🧠 延伸：語意搜尋 ≠ LLM

- 語意搜尋是資料查找技術（**Retriever 部分**）
- 語言模型是資料生成技術（**Generator 部分**）
- **RAG 架構**把它們合起來，打造智慧型查詢／助理系統
