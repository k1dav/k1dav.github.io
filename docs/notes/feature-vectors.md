---
title: "Feature Vectors"
slug: "/notes/feature-vectors"
tags:
  - "AI"
  - "NLP"
  - "Embedding"
---
## What？

**Feature Vectors** 是一種用來表示物件或資料特徵的數值化[向量](/docs/notes/embedding)，通常用於機器學習與資料分析中。簡單來說，它是一組具有多維特徵的數字，這些特徵可以被應用於模型訓練、分類、聚類以及檢索系統等用途。例如，要辨識一張圖片中的物體，我們可以將圖片的顏色分佈、形狀、紋理等轉換成 **Feature Vectors**，讓模型能夠理解並進一步處理。

## Who？

使用 **Feature Vectors** 的主要族群包括：
- **資料科學家**：在分析和處理數據集時，會以 **Feature Vectors** 表示樣本特徵。
- **機器學習工程師**：在訓練 ML 模型時，用它來輸入模型進行預測或分類。
- **資訊檢索專家**：在內容比對或相似度計算時，例如搜尋引擎中，使用向量作為基礎。
  
受影響的則是：
- 使用者：例如影像搜索結果、產品推薦系統的最終呈現效果。

## When？

你會在以下情境中需要用到 **Feature Vectors**：
1. 訓練機器學習模型，例如圖像分類器或語音辨識系統。
2. 進行資料聚類分析（如 K-means clustering）。
3. 執行相似度檢索，例如基於向量的內容匹配系統。
4. 降低維度（如 PCA）時，用來表示多維空間中的特徵。

## Where？

**Feature Vectors** 通常出現在架構的以下部分：
1. **Input Layer（輸入層）**：作為模型訓練和推論階段的主要輸入形式。
2. **Preprocessing Pipeline（前處理流程）**：從原始資料轉換為可用向量形式的核心步驟。
3. **Embedding Space（嵌入空間）**：許多深度學習模型會將資料嵌入到低維向量空間中，用於後續計算。

## Why？

使用 **Feature Vectors** 的目的是解決以下問題：
1. 將複雜且難以直接操作的原始資料轉換為結構化數值形式，方便模型處理。
2. 提供有效率且精確的方法來比較樣本之間的關聯性與相似度。例如，利用 cosine similarity 比較兩個向量是否接近。
3. 支援高效的大規模查詢與檢索功能，在高維度空間中找到合適結果。

舉例來說，如果你有一千萬張照片要找出其中最相似的一張，直接比對原始照片是不現實的，但透過每張照片對應的向量快速計算，就能解決這個問題。

## How？

### 🛠️ 建立階段

建立 **Feature Vectors** 通常分成以下幾步：
1. 收集原始資料（例如圖片、文字或音訊）。
2. 提取特徵（feature extraction）：根據應用需求選取合適方法，如 SIFT 或 HOG 用於影像；[TF-IDF](/docs/notes/tf-idf) 用於文本。
3. 將提取出的特徵數值化並結構化成 n 維向量形式。例如，一個圖像可能被表示為 128 維或 512 維浮點數組成的向量。

簡單範例程式邏輯：
```python
from sklearn.feature_extraction.text import TfidfVectorizer

# 原始文本
documents = ["我愛人工智慧", "機器學習是一門有趣技術"]

# 建立 TF-IDF 向量
vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(documents)

print(feature_vectors.toarray())
```

### 🔍 查詢階段

查詢階段通常包含以下步驟：
1. 接收查詢樣本（例如，一張待匹配的圖片）。
2. 將查詢樣本轉換為其對應的 Feature Vector。
3. 計算相似度：利用距離公式（如 Euclidean Distance 或 Cosine Similarity）比較查詢樣本與既有樣本之間距離大小。
4. 回傳最接近匹配結果。

範例程式邏輯：
```python
from sklearn.metrics.pairwise import cosine_similarity

# 假設我們已有兩個 Feature Vector
vector_1 = [0, 0, 1, 0]
vector_2 = [0, 0, 0, 1]

similarity = cosine_similarity([vector_1], [vector_2])
print(f"Cosine Similarity: {similarity[0][0]}")
```

## 補充說明

### 🔧 關鍵技術工具

| 工具名稱             | 功能            | 適用場景                            |
| ---------------- | ------------- | ------------------------------- |
| Scikit-learn     | 提供多種特徵提取方法    | 文本分析、基本 ML                      |
| OpenCV           | 支援影像相關特徵提取    | 電腦視覺       |
| TensorFlow/Keras | 僅限深度學習嵌入層生成   | 深度神經網路 |
| Faiss            | 高效地執行大規模相似性查詢 | [Vector Search](/docs/notes/vector-search)                        |

### 📌 範例比較

以下是不同技術生成 Feature Vector 的範例比較：

| 資料型態 | 方法                              | 特點             |
| ---- | ------------------------------- | -------------- |
| 圖片   | SIFT/HOG                        | 手工設計，高效但需人力調整  |
| 文本   | TF-IDF                          | 標準化方法，但無法捕捉語義  |
| 文本   | Word Embedding （如 [Word2Vec](/docs/notes/word2vec)） | 能捕捉語義，但需大量字詞訓練 |

### 🧠 延伸／常見誤解 

#### 誤解 1: 「所有機器學習都需要 Feature Vectors。」
澄清：部分深度學習技術直接操作原始數據，不需要手動生成 Feature Vector，例如 [Convolutional Neural Network](/docs/notes/convolutional-neural-network) 能直接從圖像中提取特徵。

#### 誤解 2: 「Feature Vector 維度越高越好。」
澄清：過高維度可能導致「維度詛咒」（[Curse of Dimensionality](/docs/notes/curse-of-dimensionality)），使計算效率降低且模型表現不佳。建議透過 PCA 等技術降維後再使用。
