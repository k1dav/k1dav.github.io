---
title: "Full Text Search"
slug: "/notes/full-text-search"
tags:
  - "搜索技術"
  - "NLP"
  - "資訊檢索"
---
## What？

**Full-text search** 是一種資料查詢技術，可以讓使用者透過輸入文字來快速搜尋大型資料庫中的內容。它不僅能比對字串，還能根據語言處理技術（如分詞、詞形變化等）進行更智能的搜尋。

舉例來說，當你在電商網站的搜尋框輸入「紅色鞋子」，系統會利用 **full-text search** 找到包含「紅色」和「鞋子」的相關商品，甚至可以辨識類似詞，例如「紅鞋」或「鞋類」。

---

## Who？

**Full-text search** 的主要使用者包括：

- **後端工程師**：負責設計和維護搜尋功能。
- **資料科學家**：在分析文本數據時需要高效檢索工具。
- **產品經理**：設計用戶友好的搜尋體驗。
- **終端用戶**：直接使用搜尋功能的人，例如電商網站的顧客、線上圖書館的訪客。

這項技術影響範圍非常廣，從小型應用到企業級系統都依賴它。

---

## When？

你會在以下場景使用 **full-text search**：

1. **需要快速檢索時**：例如新聞網站需要讓讀者快速找到特定文章。
2. **資料集較大時**：像是數百萬條商品清單或歷史交易紀錄。
3. **支持模糊匹配或語義理解時**：例如自動糾正拼寫錯誤或識別同義詞。

通常在設計具有大量文本資料的系統時，這項技術是不可或缺的一部分。

---

## Where？

在系統架構中， **full-text search** 通常出現在應用層（Application Layer）和資料層（Data Layer）之間。具體位置包括：

1. 資料庫內建功能（如 PostgreSQL 支援 full-text indexing）。
2. 專門的搜索引擎工具（如 [Elasticsearch](/docs/notes/elasticsearch)、Apache Solr）。
3. API 層，用於前端與後端之間的交互。

簡單來說，它是連接使用者需求與底層資料的一座橋樑。

---

## Why？

實現 **full-text search** 的目的是解決以下問題：

1. 傳統字串匹配效率低下，尤其是在大型資料集上。
2. 無法辨識複雜語言特性，例如同義詞、拼寫錯誤、語意相近等。
3. 提升用戶體驗，使得搜尋結果更準確、更符合期望。

舉例來說，如果使用 SQL 的 `LIKE` 進行模糊查詢，你可能只能找到完全匹配的結果，但缺乏更深入的語言理解能力。

---

## How？

### 🛠️ 建立階段

建立一個有效率的 **full-text search 系統**通常有以下步驟：

1. 準備原始資料：
   - 確認需要進行全文檢索的欄位，比如文章內容、產品描述等。
   - 清理重複或不必要資訊以提升效能。

2. 建立索引：
   - 使用專門工具建立 inverted index（倒排索引），將每個字或詞與其所在的位置進行映射。例如：
     ```
     "紅色鞋子" -> 紅色：[位置1]；鞋子：[位置2]
     ```
   - 工具示例：
     - 使用 PostgreSQL 的 `GIN` index 或 `TSVector`。
     - 在 Elasticsearch 中創建 index 並指定 mappings 和 analyzers。
     
3. 配置語言分析器：
   - 指定分詞器（tokenizer），將文字拆解成小單位。
   - 選擇合適的 stop words 移除常見但無意義的信息（例如“the”、“是”等）。

4. 儲存索引並優化查詢效能。

### 🔍 查詢階段

查詢階段會依循以下流程：

1. 接收用戶輸入：
   - 例如「紅色鞋子」作為關鍵字輸入。  
   
2. 分析關鍵字：
   - 分詞後生成 tokens，例如 [紅色, 鞋子]。  
   
3. 比對索引：
   - 根據 inverted index 找到所有包含關鍵字的位置。  
   
4. 排序結果：
   - 根據 relevance score 排序，如 [TF-IDF](/docs/notes/tf-idf) 或 [BM25](/docs/notes/bm25) 算法。  

5. 返回最相關結果給用戶：
   - 結果可能會包含其他相關性高但非完全匹配內容，例如「深紅帆布鞋」。

---

## 補充說明

### 📌 範例比較

#### 範例 1：傳統 SQL vs Full-Text Search
若要查詢含有「apple」的描述欄位：

- 傳統 SQL:
  ```sql
  SELECT * FROM products WHERE description LIKE '%apple%'
  ```
  缺點：只支持完全匹配，無法辨識變形如 apples 或 apple pie。

- Full-Text Search:
  使用 PostgreSQL:
  ```sql
  SELECT * FROM products WHERE to_tsvector(description) @@ to_tsquery('apple');
  ```
優勢：支援分詞及變形，更智能地找到相關結果。

#### 查詢結果比較表

| 查詢方式        | 匹配示例          |
|-----------------|-------------------|
| LIKE            | apple             |
| Full-Text Search| apple, apples, pie|

---

### 🧠 延伸／常見誤解

#### 誤解一：「全文檢索只能做精準匹配」
事實上，透過配置 analyzers 和 algorithms，可以處理模糊查詢及同義詞。例如，「汽車輪胎」也可以匹配到「車胎」。

#### 誤解二：「Elasticsearch 是唯一選擇」
雖然 Elasticsearch 功能強大，但根據應用場景，小型系統可以選擇 PostgreSQL 或其他輕量工具，比如 Sphinx，以節省資源配置。
