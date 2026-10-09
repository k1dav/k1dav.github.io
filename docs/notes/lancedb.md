---
title: "LanceDB"
slug: "/notes/lancedb"
tags:
  - "VectorSearch"
  - "Database"
  - "MachineLearning"
  - "Retrieval"
  - "Embedding"
---
## What？
LanceDB 是一個開源的向量資料庫，專為 AI 和機器學習應用設計，存儲和查詢高維向量數據。與傳統關係型資料庫不同，LanceDB 優化用於 [Embedding](/docs/notes/embedding) 的 CRUD 操作和向量相似性搜尋。它使用 Lance 格式（ColumnarFormat）存儲資料，支援快速向量搜尋、過濾、和聚合操作。

LanceDB 的核心優勢是原生支援向量 [索引](/docs/notes/index-database)（如 IVF-PQ），支援混合搜尋（向量 + 文本過濾），並能與 PyTorch、TensorFlow 等深度學習框架無縫整合。相比 Pinecone 需要外部服務，LanceDB 可以部署在本地或邊緣設備上。

實務應用中，LanceDB 常用於 RAG（Retrieval-Augmented Generation）系統、語義搜尋、推薦系統、和 [Embedding](/docs/notes/embedding) 相似性查詢。例如，一個知識庫系統可以將文檔轉換為 [Embedding](/docs/notes/embedding)，存儲到 LanceDB，然後快速檢索相關文檔。

---

## Who？
- **AI 工程師** - 構建 RAG 系統和語義搜尋
- **[ML](/docs/notes/machine-learning) 工程師** - 集成向量搜尋到模型推理
- **後端開發者** - 建立向量搜尋的後端服務
- **數據科學家** - 進行相似度分析和聚類
- **DevOps 工程師** - 部署和維護向量資料庫基礎設施

---

## When？
1. **語義搜尋** - 根據含義而非關鍵詞查找相似文檔或圖像
2. **RAG 應用** - 從外部知識庫檢索相關上下文供 LLM 使用
3. **推薦系統** - 基於 [Embedding](/docs/notes/embedding) 相似度推薦物品或內容
4. **異常檢測** - 在向量空間識別離群值

---

## Where？
1. **應用層** - Python 應用透過 SDK 操作 LanceDB
2. **儲存層** - Lance 列式儲存格式優化向量查詢
3. **索引層** - IVF-PQ、IVF-SQ 等索引加速相似性搜尋
4. **API 層** - HTTP 伺服器模式用於分佈式部署

---

## Why？
**向量原生** - 傳統 SQL 資料庫不擅長向量搜尋，LanceDB 原生優化高維空間查詢。

**效率** - Lance 格式和索引機制使百萬級向量的近似最近鄰搜尋達到毫秒級延遲。

**靈活部署** - 可本地部署、無需外部服務、支援邊緣計算。

---

## How？

### 🛠️ 建立階段
```python
# 安裝並初始化 LanceDB
import lancedb
import numpy as np

# 連接本地資料庫
db = lancedb.connect("/tmp/sample-lancedb")

# 建立資料表，包含向量和元數據
data = [
    {"id": 1, "text": "Hello world", "vector": np.random.rand(128)},
    {"id": 2, "text": "Hi there", "vector": np.random.rand(128)},
    {"id": 3, "text": "Goodbye", "vector": np.random.rand(128)}
]

# 建立表格
table = db.create_table("documents", data=data, mode="overwrite")
```

### 🔍 查詢階段
```python
# 向量相似性搜尋
query_vector = np.random.rand(128)

# 查詢最相似的 5 個文檔
results = table.search(query_vector).limit(5).to_list()
print(results)

# 帶過濾條件的混合搜尋
filtered_results = (table
                   .search(query_vector)
                   .where("id > 1")  # SQL 過濾
                   .limit(5)
                   .to_list())
```

---

## 補充說明

### 📌 範例比較

| 特性 | LanceDB | Pinecone | Weaviate | Milvus |
|------|---------|----------|----------|--------|
| 部署方式 | 本地/遠程 | 雲端服務 | 雲端/自託管 | 自託管 |
| 索引演算法 | IVF-PQ、IVF-SQ | 專有 | 多種 | 多種 |
| 集成難度 | 低 | 中 | 中 | 高 |
| 成本 | 開源免費 | 按用量付費 | 開源/企業版 | 開源 |

### 🧠 延伸／常見誤解
**誤解 1** - 任何向量資料庫都能達到相同查詢速度。實際上，索引演算法（IVF-PQ vs 暴力搜尋）和資料集大小影響巨大。LanceDB 的索引參數需調優。

**誤解 2** - 向量相似度搜尋完全準確。實際上，IVF-PQ 等索引使用近似演算法，存在精度-速度權衡。需根據應用調整 `nprobe` 和索引層數。
