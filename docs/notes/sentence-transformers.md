---
title: "Sentence Transformers"
slug: "/notes/sentence-transformers"
tags:
  - "AI"
  - "Embedding"
  - "NLP"
---
## What？

**Sentence Transformers** 是一種用來生成句子級別語意向量（ sentence [Embedding](/docs/notes/embedding) ）的技術。這些向量可以幫助我們更有效地進行語意理解，例如[Semantic Search](/docs/notes/semantic-search)、文本分類或相似度計算。不像傳統的文字處理方法只關注字詞表面， Sentence Transformers 能夠捕捉句子的深層語意關係。

舉個例子，對於「我喜歡看電影」和「電影是我的愛好」，它們在字面上並不完全相同，但 Sentence Transformers 可以將這兩個句子映射到非常接近的向量空間，顯示它們在語意上是類似的。

---

## Who？

Sentence Transformers 的主要使用者包括：

1. **技術工作者**：例如資料科學家、AI 工程師，用於構建語意搜尋系統或自然語言處理模型。
2. **企業應用開發者**：希望提升產品搜尋功能，例如電商平台中的商品推薦。
3. **研究人員**：需要進行文本分析或文檔匹配。

---

## When？

你可能會在以下情境中使用 Sentence Transformers：

1. **建構語意搜尋功能時**：例如用戶輸入「最好看的懸疑電影」，系統可根據影片描述找出最符合需求的結果。
2. **需要判斷文本相似度時**：例如比對兩段不同文案是否表達相同概念。
3. **多模態應用場景中**：例如 [CLIP](/docs/notes/clip) 使用 Sentence Transformers 來將文字與圖片映射到同一個嵌入空間，用於圖片文本匹配。

---

## Where？

Sentence Transformers 通常出現在 [NLP](/docs/notes/nlp)（自然語言處理）架構中的 Embedding 生成部分，它負責將輸入文字轉換成高維度向量。以下是幾個典型位置：

1. **搜尋系統架構中**：
   - 跟向量資料庫（如 Pinecone 或 Milvus ）結合，用來加速查詢比對。
2. **推薦系統內部流程中**：
   - 透過 embeddings 匹配使用者偏好與商品描述。
3. **多模態架構中**：
   - 與 CLIP 等工具結合，用於跨模態檢索（圖片 vs 文本）。

---

## Why？

傳統文字處理方法往往依賴關鍵字匹配，但這種方式容易忽略上下文，導致結果不夠精準。例如，當你搜索「經典懸疑片」時，關鍵字匹配可能會漏掉一些相關但未提到「懸疑」字樣的電影。而 Sentence Transformers 能解決如下問題：

1. **提升查詢精準度**：透過捕捉句子的深層語意，讓結果更貼近需求。
2. **跨模態檢索能力強大**：結合 CLIP ，可以進行文字與圖片之間的匹配與理解。
3. **適應變化多端的表達方式**：無論是口語化描述還是正式文案，都能有效找到相關內容。

---

## How？

### 🛠️ 建立階段

建立 Sentence Transformers 系統通常包含以下步驟：

1. 選擇並初始化模型：
   - 使用預訓練模型，例如 `sentence-transformers` 套件提供的 BERT 或 RoBERTa 變體。
2. 資料準備：
   - 準備大量高品質文本數據作為輸入，以便微調模型（若有必要）。
3. 微調模型（選擇性）：
   - 根據特定任務需求進行微調，例如使用問答資料集來提升回答精準度。
4. 嵌入生成：
   - 將每個句子轉換成固定維數的 embeddings ，通常是 768 維或更高維度向量。

### 🔍 查詢階段

查詢流程通常如下：

1. 接收查詢句子並生成其 embeddings ：
   ```python
   from sentence_transformers import SentenceTransformer
   model = SentenceTransformer('all-MiniLM-L6-v2')
   query_embedding = model.encode("最好看的懸疑片")
   ```
2. 向量比對：
   - 在向量資料庫中找到最接近 query embedding 的項目，可以採用 `cosine similarity` 或其他距離計算方法。
3. 返回結果給用戶：
   - 排序後返回最高相關性的項目。

---

## 補充說明
