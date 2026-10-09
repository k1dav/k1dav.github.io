---
title: "Retriever"
slug: "/notes/retriever"
---
## What？

**Retriever** 是 [Retrieval-Augmented Generation](/docs/notes/retrieval-augmented-generation) 架構中負責從外部知識庫中**找出相關資料片段**的元件。
簡單來說，它就是一個「[Semantic Search](/docs/notes/semantic-search)引擎」，會把使用者輸入的問題轉成向量，去向量資料庫中找出語意上最相關的內容。

## Who？

- **開發者**：設計 RAG 查詢邏輯的人，會選用哪種[Vector DB](/docs/notes/vector-db)、[Embedding](/docs/notes/embedding) 模型、查幾筆資料等
- **企業／系統管理員**：需要透過 Retriever 管理自己的知識文件、FAQ、內部文件等
- **使用者（最終用戶）**：最終會因為 Retriever 表現好壞，得到準確或偏離的回答

## When？

- **每次使用者提出問題時（Run-time）**，Retriever 都會：
    1. 將問題轉成向量
    2. 到資料庫中查找語意相似的內容（如前幾名 top-k）

## Where？

- **RAG 系統**：Retriever 是第一步（Retrieve → Generate）
- **搜尋引擎強化 QA 系統**
- **AI Copilot 工具**：如程式碼助理查找內部 codebase 的說明
- **知識型助理**：如客服回答器、自動問答 bot 查產品手冊
- **推薦系統（擴展應用）**：語意向量也可用於內容推薦

## Why？

- RAG 的回答品質 **完全依賴於 Retriever 的準確度**
- 如果找不到對的資料，生成模型也無法「神奇地回答對」
- 它可決定：
    - 回答是否貼近原文
    - 是否能對應用場景（如查產品、技術、法律內容）
- 提高 LLM 的可信度與穩定性

## How？

1. **資料處理階段（Indexing）**
    - 將文件分割成小段（chunks）
    - 對每段進行 embedding（向量化）
    - 存進向量資料庫
2. **查詢階段（Querying）**
    - 將使用者問題做 embedding
    - 對向量資料庫進行相似度比對（通常是 cosine similarity）
    - 取出 top-k 段落（例如 3–10 段）傳給語言模型

## 補充說明

### 類型與工具

|類型|說明|範例工具|
|---|---|---|
|Sparse Retriever|傳統關鍵字查詢（TF-IDF, BM25）|Elasticsearch, Lucene|
|Dense Retriever|向量語意查詢（使用 embedding）|FAISS, Weaviate, Qdrant|
|Hybrid Retriever|混合關鍵字與語意查詢|Elastic + Dense, ColBERT|
|Multi-Stage Retriever|先粗篩、後重排序|ColBERT, ReRankers|

### 常用組件搭配

|元件|範例|
|---|---|
|向量資料庫|FAISS, Weaviate, Qdrant, Pinecone|
|Embedding 模型|OpenAI Embedding, BGE, Instructor, E5|
|文本分割工具|LangChain TextSplitter、LlamaIndex NodeParser|
|優化策略|Chunk overlap, Re-ranking, Filter by metadata|
