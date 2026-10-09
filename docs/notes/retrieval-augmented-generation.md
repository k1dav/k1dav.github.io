---
title: "Retrieval-Augmented Generation"
slug: "/notes/retrieval-augmented-generation"
---
## What？

**RAG（Retrieval-Augmented Generation）** 是一種結合「資料檢索」與「語言模型生成」的架構，它讓大型語言模型（LLM）在回答問題時，不僅依靠內部知識，而是能**查資料 + 用資料產生回應**。

> 📚 **簡單理解**：
> LLM 本身像是一個聰明的人（但記憶可能不完全），RAG 就像是幫它配一本 Google，一邊查資料一邊作答。

## Who？

- **企業／機關**：建立私有知識庫問答系統（如法務、醫療、客服等）
- **開發者**：構建帶有文檔、PDF、資料庫查詢能力的 AI 助理
- **SaaS 產品公司**：像 Notion AI、Slack AI、Miro AI 等，都用內建的 RAG 來查用戶資料後回答

## When？

- **概念出現**：2020 年，由 Facebook AI 發表第一版 RAG 論文（結合 Dense Retrieval + BART）
- **主流化**：2022 年後，隨著 GPT 模型與向量資料庫爆紅，RAG 架構被廣泛應用
- **現況**：2023–2025 年為 RAG 的黃金應用期（幾乎所有企業都在建）

## Where？

- **內部知識查詢平台**：像員工問「公司請假政策」→ 查 HR 文件 → 回答
- **法律、醫療問答**：用戶問法律條文、病歷摘要等 → 查知識庫 → 回答
- **客戶支援**：客服 AI 可查產品手冊、FAQ、歷史票據
- **DevOps 文件助手**：開發者問技術問題，自動查 API doc、GitHub issue 回答

## Why？

- 解決 LLM「知識有限」問題（如 GPT 訓練資料只到某個時間點）
- 提供即時、專屬、可控的企業知識回答
- 可回傳來源、提高可解釋性與可信度
- 不需重新訓練模型，只需管理知識庫

## How？

### RAG 架構基本流程如下：
1. **使用者輸入問題**
2. **檢索引擎（[Retriever](/docs/notes/retriever)）查詢知識庫**
    　↳ 透過向量搜尋（如 FAISS, Weaviate, Qdrant 等）找出相關資料片段
3. **拼接資料與原始問題**（Context Augmentation）
    　↳ 通常放進 prompt，類似：「根據以下資訊回答問題…」
4. **語言模型生成回應（[Generator](/docs/notes/generator)）**
    　↳ 如 GPT、Claude、LLaMA 等
5. **輸出回答 + 資料來源**

### 技術組成模組（常見工具）

| 元件                     | 常見工具/技術                                                   |
| ---------------------- | --------------------------------------------------------- |
| [Vector DB](/docs/notes/vector-db)          | FAISS, Pinecone, Weaviate, Qdrant                         |
| 文本分割                   | LangChain、LlamaIndex、Haystack                             |
| [Embedding Model](/docs/notes/embedding-model)    | OpenAI Embedding, HuggingFace Transformers, Instructor-XL |
| [Foundational Model](/docs/notes/foundational-model) | GPT-4, Claude, LLaMA, Mixtral 等                           |
| 架構工具                   | LangChain, LlamaIndex, RAGas, Haystack                    |

## 補充說明
### 更多種 RAG 技術
* [Agentic RAG](/docs/notes/agentic-rag)
