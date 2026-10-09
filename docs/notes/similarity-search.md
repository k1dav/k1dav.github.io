---
title: "Similarity Search"
slug: "/notes/similarity-search"
tags:
  - "AI"
  - "Embedding"
  - "InformationRetrieval"
  - "NLP"
---
## What？

**Similarity Search** 是一種技術，用來根據輸入數據找到最相似的結果或物件。簡單來說，就是透過某些特定的指標來比較兩個或多個物件之間的相似程度，並返回最符合條件的結果。這項技術在許多領域都非常有用，例如推薦系統、圖像辨識或自然語言處理。

實務上可以想像成：你在電商平台上看到一件喜歡的商品，利用 **Similarity Search**，平台能找到與該商品外觀、功能或價格相近的其他選項給你。

---

## Who？

**Similarity Search** 的使用者通常包含以下幾類：

1. **資料科學家/Data Scientists**  
   他們利用此技術分析巨量數據中的模式，例如分類客戶群或產品特徵。

2. **機器學習工程師/Machine Learning Engineers**  
   需要設計模型來提升系統準確度，例如推薦系統中的商品匹配。

3. **開發者/Developers**  
   在構建應用程式時，將 **Similarity Search** 嵌入使用者體驗中，例如搜尋功能或內容配對。

4. **研究人員/Researchers**  
   用於研究文本、影像或基因等超大規模資料集的關聯性。

---

## When？

你可能會在以下情境中使用到 **Similarity Search**：

1. **推薦系統/Recommender Systems**
   當需要根據使用者喜好，提供更符合其需求的內容時。
   
2. **圖片搜尋/Image Retrieval**
   使用相片來尋找相似圖片（例如 Google Images 的反向搜尋）。

3. **文字匹配/Natural Language Processing (NLP)**
   比較兩段文字是否具有相似含義，例如聊天機器人理解用戶意圖。

4. **生物醫學/Biomedical Data Analysis**
   分析基因序列之間的相似性，用於疾病診斷或藥物開發。

---

## Where？

在架構中， **Similarity Search** 通常出現在以下部分：

1. **資料庫層/Database Layer**
   儲存預處理後的向量化資料（Vectorized Data），便於高效查詢。
   
2. **應用層/Application Layer**
   與前端互動，用以提供即時查詢結果（例如為使用者返回相似商品清單）。
   
3. **模型層/Model Layer**
   負責將輸入數據轉換為可比較的特徵向量（[Feature Vectors](/docs/notes/feature-vectors)）。

---

## Why？

使用 **Similarity Search** 的主要目的是解決「如何快速且準確地找到最相關內容」這個問題。當面對大量非結構化資料（如圖片、語音、文字）時，傳統方法可能效率低下，而該技術能有效提升以下方面：

- 提高查詢速度：比直接逐一比對快得多。
- 增強精準度：透過向量化和特殊指標避免錯誤匹配。
- 改善使用者體驗：讓搜尋結果更符合期待，例如覺得「這就是我要找的」。

舉例來說，如果沒有這項技術，你可能需要手動篩選幾百萬筆資料才能找到想要的信息，但有了它，只需輕鬆幾秒就能完成！

---

## How？

### 🛠️ 建立階段

建立一個完整的 **Similarity Search** 系統，一般需要經過以下流程：

1. 資料收集與預處理：
    - 收集原始資料（例如文字、圖片）。
    - 將非結構化數據轉換為結構化形式，如 Feature Vectors。
2. [向量](/docs/notes/embedding)化 (Vectorization)：
    - 使用算法如 TF-IDF 或 Deep Learning 模型（如 BERT）將數據轉換成可比較向量。
3. 相似度衡量 (Similarity Measurement)：
    - 定義比較方法，例如 Euclidean Distance 或 Cosine Similarity。
4. 儲存與索引建置：
    - 使用專門工具，如 FAISS 或 Annoy，建立高效索引以加速查詢。

### 🔍 查詢階段

在查詢階段，一般會進行以下步驟：

1. 接收查詢：
    - 從用戶端接收輸入，例如一張圖片、一段文字等。
    
2. 向量化處理：
    - 將輸入轉換成 Feature Vector，以便進行後續比較。
    
3. 執行搜索：
    - 在索引中尋找最接近輸入向量的結果，可以是 Top-K 方式返回前幾名最佳匹配項目。
    
4. 返回結果：
    - 將比對到的結果傳回給應用程式前端展示給用戶。

---

## 補充說明

### 📌 範例比較

以下是不同測試場景下，相似度衡量方法效果簡表：

| 方法名稱                   | 適合場景    | 優勢              |
| ---------------------- | ------- | --------------- |
| [Euclidean Distance](/docs/notes/euclidean-distance) | 數值型距離計算 | 簡單易懂，但不適合高維空間   |
| [Cosine Similarity](/docs/notes/cosine-similarity)  | 文本和圖像分析 | 消除長度影響，更適合文本分析  |
| [Jaccard Index](/docs/notes/jaccard-index)      | 集合交集分析  | 特別適合二元特徵值，如標籤匹配 |

### 🧠 延伸／常見誤解

1. 「Cosine Similarity 和 Euclidean Distance 是同樣東西？」  
   不完全正確。Cosine Similarity 衡量的是角度，而 Euclidean Distance 衡量的是兩點之間距離。在高維空間中，Cosine Similarity 通常表現更佳，但具體選擇取決於需求。

2. 「所有探測都需要 GPU 支援嗎？」  
   不一定。如果你的數據規模不大，可以選擇 CPU 就足夠，但大規模運算通常需要 GPU 加速以提高效率。

3. 「只適合圖像嗎？」  
   錯誤！雖然圖像是熱門應用之一，但文字、聲音甚至基因序列都可以利用該技術進行類比搜索。
