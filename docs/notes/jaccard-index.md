---
title: "Jaccard Index"
slug: "/notes/jaccard-index"
tags:
  - "Statistics"
  - "SimilarityMeasure"
  - "DataAnalysis"
  - "MachineLearning"
  - "DistanceMetric"
---
## What？
Jaccard Index（傑卡德係數或傑卡德相似度）是用於衡量兩個集合相似程度的統計度量。其定義為兩個集合的交集大小除以並集大小：J(A,B) = |A ∩ B| / |A ∪ B|。Jaccard Index 的值範圍是 0 到 1，其中 0 表示兩個集合完全不同，1 表示完全相同。

這個指標特別適用於比較集合、標籤列表、或任何離散的集合數據。例如，比較兩個文檔的關鍵詞集合、推薦系統中用戶的購物清單相似性、或計算 DNA 序列的相似度。Jaccard Index 相對於歐幾里得距離的優勢是不受維度爆炸影響，適合高維稀疏資料。

實務上，Jaccard Index 常與 [Machine Learning](/docs/notes/machine-learning) 中的相似度計算、分群演算法、以及去重系統結合使用。

---

## Who？
- **資料科學家** - 使用 Jaccard 衡量樣本相似性
- **推薦系統工程師** - 計算用戶或物品相似度
- **文本挖掘專家** - 比較文檔的詞彙相似性
- **生物資訊學家** - 分析 DNA 或蛋白質序列相似度
- **搜尋引擎優化者** - 檢測重複或相似內容

---

## When？
1. **用戶相似度計算** - 推薦系統中找相似用戶的興趣
2. **文檔相似性比較** - 去重、查重、或聚類文檔
3. **集合資料分析** - 比較標籤集合、分類集合的相似度
4. **異常檢測** - 識別與正常集合差異大的數據

---

## Where？
1. **應用層** - 推薦演算法、相似度計算模組
2. **資料預處理** - 特徵相似度計算、去重系統
3. **分析工具** - 資料聚類、相似度矩陣計算
4. **搜尋引擎** - 文檔相似性排名、內容去重

---

## Why？
**集合導向** - 不同於 [Embedding](/docs/notes/embedding) 的向量相似度，Jaccard 天生為集合設計，直觀易懂。

**計算簡單** - 只需集合的交集和並集，計算成本低，適合大規模應用。

**不受維度影響** - 相比歐幾里得距離在高維空間的失效，Jaccard 對稀疏集合特別有效。

---

## How？

### 🛠️ 建立階段
```python
# 定義計算 Jaccard Index 的函數
def jaccard_index(set_a, set_b):
    """計算兩個集合的 Jaccard 相似度"""
    intersection = len(set_a & set_b)
    union = len(set_a | set_b)
    if union == 0:
        return 0
    return intersection / union

# 初始化示例集合
user1_interests = {"Python", "AI", "Data Science", "Web Dev"}
user2_interests = {"Python", "Data Science", "DevOps", "Cloud"}
```

### 🔍 查詢階段
```python
# 計算兩個用戶的興趣相似度
similarity = jaccard_index(user1_interests, user2_interests)
print(f"Jaccard 相似度: {similarity:.2f}")
# 輸出: Jaccard 相似度: 0.50

# 計算多個集合之間的相似度矩陣
from sklearn.metrics import pairwise_distances

users = [
    {"ML", "NLP", "CV"},
    {"ML", "Data Science", "Statistics"},
    {"NLP", "Data Science", "Web"}
]

# 使用 sklearn 計算 Jaccard 距離
distances = pairwise_distances([frozenset(u) for u in users],
                               metric='jaccard')
print(distances)
```

---

## 補充說明

### 📌 範例比較

| 相似度指標 | 計算方式 | 適用場景 | 計算複雜度 |
|-----------|--------|--------|---------|
| Jaccard | 交集/並集 | 集合資料 | O(n) |
| Cosine | 向量內積 | [Embedding](/docs/notes/embedding)、TF-IDF | O(n) |
| Euclidean | 歐式距離 | 連續變量 | O(n) |
| Hamming | 逐位不同 | 定長二進制 | O(n) |

### 🧠 延伸／常見誤解
**誤解 1** - Jaccard Index 只適用於集合資料。實際上，可以將向量轉換為集合（如保留非零位置），或使用「Jaccard distance」(1 - Jaccard Index)。

**誤解 2** - Jaccard 與 Cosine 相似度等價。兩者不同：Jaccard 只看有無，Cosine 考慮值的大小。集合資料用 Jaccard，向量資料用 Cosine。
