---
title: "Feature Engineering"
slug: "/notes/feature-engineering"
tags:
  - "AI"
  - "機器學習"
  - "數據處理"
---
## What？

簡單來說，特徵工程是將原始資料轉換成適合機器學習模型使用的格式與結構的過程。這個過程包含了資料清理、特徵選擇、以及特徵創造，目的是提升模型的效能。  

舉例來說，如果你有一組包含日期的原始資料，透過特徵工程，你可以拆解日期成「年份」、「月份」或「星期幾」等具備更明確意義的欄位，讓模型能更準確地捕捉其中的模式。

---

## Who？

主要使用者是資料科學家（Data Scientists）、機器學習工程師（Machine Learning Engineers），以及從事 AI 開發的人員。他們通常需要處理大量結構化或非結構化資料，並對這些資料進行轉換以符合模型需求。

此外，產品經理、商業分析師也可能間接受到影響。好的特徵工程能讓機器學習模型生成更精準、更有意義的預測結果，因此對決策層面也有深遠影響。

---

## When？

1. **建模前期：** 在設計與訓練機器學習模型之前，需要進行大量資料處理和轉換工作。
2. **迭代更新：** 當現有模型效能不足時，可透過改良或新增特徵來提升表現。
3. **新資料引入：** 當系統接入新的數據源時，需要重新設計並整合新的特徵。

例如，在訓練一個信用卡欺詐檢測系統時，新引入「交易地點」作為額外欄位，就需要重新進行特徵工程以評估該欄位是否能提升預測能力。

---

## Where？

特徵工程通常出現在以下幾個階段：
1. **數據預處理：** 在 [ETL](/docs/notes/etl)（Extract, Transform, Load）流程中執行。
2. **建模管線：** 在 ML Pipeline 中扮演重要角色，例如在 sklearn 的 Pipeline 中串接 `StandardScaler` 或 `PolynomialFeatures`。
3. **資料儲存與查詢：** 特別是在使用 [Data Warehouse](/docs/notes/data-warehouse) 或 [Data Lake](/docs/notes/data-lake) 時，需要定義好哪些欄位需轉換或生成。

---

## Why？

**為什麼需要做特徵工程？它解決了哪些問題？**  
做特徵工程有以下幾個主要原因：
1. 提高模型效能：原始數據可能不具備足夠資訊量，透過提取重要欄位或創造新指標，可以讓模型更容易捕捉模式。
2. 降低維度問題：去除無意義或重複性高的欄位，有助於減少運算資源消耗及避免 [Overfitting](/docs/notes/overfitting)。
3. 增強可解釋性：一些經過加工處理後的欄位，例如「收入區段」、「年齡分層」，對商業決策者而言更加直觀且易於理解。

舉例來說，在房價預測中，「距地鐵站距離」是一個非常重要但未必直接存在於原始數據中的資訊。若未經加工處理，有可能無法充分體現其價值。

---

## How？

### 🛠️ 建立階段  
建立階段包含以下流程：
1. **資料清洗（Data Cleaning）：**
   - 去除缺失值
   - 對異常值進行修正
2. **資料轉換（Data Transformation）：**
   - 正規化（Normalization）將數值縮放至 0-1 區間
   - 標準化（Standardization）使欄位遵循標準常態分佈
3. **建立新特徵（Feature Creation）：**
   - 從日期提取年月日等子資訊
   - 將分類型變數進行 One-hot Encoding 或 Label Encoding
4. **降維處理（Dimensionality Reduction）：**
   - 使用 PCA 或 Autoencoder 壓縮高維度數據

範例程式碼流程如下：
```python
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# 數值正規化
scaler = StandardScaler()
normalized_data = scaler.fit_transform(raw_data)

# 分類型編碼
encoder = OneHotEncoder()
encoded_data = encoder.fit_transform(categorical_data)
```

### 🔍 查詢階段  
查詢階段通常涉及以下步驟：
1. 根據已建立好的 Pipeline 應用相同邏輯到新進入系統的資料。
2. 確保所有轉換方式在訓練與查詢階段一致性，如計算相同的平均值或標準差以進行標準化。
3. 確認輸出的新資料是否符合 API 規格，供前端或其他模組調用。

範例程式碼如下：
```python
# 查詢階段應用既定 pipeline
new_data_transformed = scaler.transform(new_raw_data)
new_categorical_encoded = encoder.transform(new_categorical_data)
```

---

## 補充說明

### 📌 範例比較  

以下是一組房價預測案例中不同方法所產生結果比較表：

| 方法                    | MAE (平均絕對誤差)     | RMSE (均方根誤差)      |
|-------------------------|------------------------|------------------------|
| 僅使用原始數據          | 125,000               | 157,000               |
| 加入距地鐵站距離        | 98,000                | 115,000               |
| 加入距地鐵站距離 + 房屋年齡分層    | 85,000                | 102,000               |

### 🧠 延伸／常見誤解  

1. **誤解：「越多越複雜的特徵越好。」**
   實際上，多餘且無意義的欄位可能造成 overfitting 問題。關鍵在於選擇重要且相關性高的變數，而非追求量多質低。

2. **誤解：「只要工具好就不需要人工干預。」**
   雖然像 featuretools 可以自動生成複雜的新變數，但人工判斷仍然不可少。例如某些領域專家的知識可能提供更具洞察力的新指標，而自動工具無法涵蓋這些特殊情境。
