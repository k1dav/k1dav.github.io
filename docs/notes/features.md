---
title: "Features"
slug: "/notes/features"
tags:
  - "AI"
  - "DataScience"
  - "MachineLearning"
---
## What？

是指機器學習模型用來進行資料分析與預測的特徵（Features），這些特徵是從原始資料中提取出來，具有辨識度且能夠支持模型決策。例如在圖片分類中，特徵可能包括顏色分布、邊緣檢測結果或形狀資訊。這些特徵可以幫助模型理解並分辨不同的類別。

實務上，就像我們在偵探故事裡整理線索：每個線索代表一個有助於解決問題的 Feature，而 AI 就是負責從雜亂無章的線索裡找到重要線索並進行分析。

---

## Who？

- **資料科學家 (Data Scientists)**：他們設計與訓練模型，需選擇最具影響力的 Features。
- **機器學習工程師 (Machine Learning Engineers)**：負責將適合的 Features 應用於生產環境。
- **業務分析師 (Business Analysts)**：雖然不直接處理技術細節，但透過了解 Features，可以更有效地解讀分析結果。
- **產品經理 (Product Managers)**：需要知道哪些 Features 對商業目標最重要，以便優化產品功能。

舉例來說，一位零售公司的資料科學家可能會使用客戶購物行為相關的 Feature（如購買頻率、平均購物金額）來預測客戶流失風險。

---

## When？

以下情境中常見：
1. **資料準備階段**：在清洗與轉換原始資料時提取關鍵資訊。
2. **模型訓練階段**：選擇合適的 Features 作為輸入變數，以提升預測能力。
3. **模型評估階段**：分析每個 Feature 對模型表現的貢獻度（例如使用 SHAP 或 Permutation Importance）。
4. **實際應用階段**：當系統預測需要快速反饋（如推薦系統）。

例如，在金融風險評估中，信用分數、收入穩定性和過去借貸記錄等都是重要 Feature。

---

## Where？

**AI 的 Feature 出現在架構哪個部分？**

Feature 通常出現在以下架構部分：
1. **資料前處理層 ([Data Preprocessing](/docs/notes/data-preprocessing) Layer)**：將原始資料轉換成可用於模型訓練的結構化格式。
2. **特徵工程層 (Feature Engineering Layer)**：執行操作如標準化、One-Hot Encoding 或 PCA 等技術以提升效能。
3. **ML 模型輸入層 (Model Input Layer)**：最終選定並整合好後作為輸入參數供訓練或預測使用。

舉例來說，在推薦系統中，商品類別、瀏覽紀錄和購買時間都可能經過上述流程變成有效 Features。

---

## Why？

有效挑選與設計 AI 的 Features 可以：
1. 提升模型準確性與效能
2. 降低運算成本，不浪費資源處理冗餘資訊
3. 增強對業務需求或問題本質的理解

例如，在醫療診斷中，如果只使用病患年齡而忽略病史或基因資訊作為 Features，那麼診斷結果可能會不精確甚至錯誤。好的 Features 則能協助更精準地定位疾病原因。

---

## How？

### 🛠️ 建立階段

建立 AI 的 Features 通常包含以下步驟：
1. **資料清理 (Data Cleaning)**：
   - 去除空值、不完整或異常值
   - 確保各欄位格式一致
2. **特徵提取 (Feature Extraction)**：
   - 從原始資料中提取有效資訊，例如從日期欄位提取“星期幾”或“工作日/假日”
3. **特徵選擇 (Feature Selection)**：
   - 使用方法如 Filter Methods（Correlation）、Wrapper Methods（Recursive Feature Elimination, RFE）或 Embedded Methods（Lasso Regression）
4. **特徵工程 (Feature Engineering)**：
   - 使用技術如 One-Hot Encoding、標準化、正規化等將數值轉換成適合建模格式

範例程式流程：

```python
# 範例程式: 使用 Python 設計基本特徵工程流程
import pandas as pd
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# Step 1: 資料清理
df = pd.read_csv("data.csv")
df.dropna(inplace=True)

# Step 2: 特徵提取
df['day_of_week'] = pd.to_datetime(df['date']).dt.dayofweek

# Step 3: 特徵選擇
selected_features = ["age", "income", "day_of_week"]

# Step 4: 特徵工程
scaler = StandardScaler()
df[selected_features] = scaler.fit_transform(df[selected_features])
encoder = OneHotEncoder()
encoded_features = encoder.fit_transform(df["category"]).toarray()
```

### 🔍 查詢階段

查詢階段主要聚焦於如何利用已建立好的 Features 進行推論與預測：
1. 載入已保存好的訓練模型及其所需 Inputs 格式。
2. 將新進來的資料根據相同邏輯做前處理以生成對應 Features。
3. 輸入處理後之 Features 至 ML 模型進行推論，取得結果。

範例流程：

```python
# 範例程式: 模型查詢流程
import joblib

# Step 1: 載入已建模檔案及 Scaler/Encoder 等工具
model = joblib.load("trained_model.pkl")
scaler = joblib.load("scaler.pkl")

# Step 2: 新增查詢資料並轉換格式至 Models 可接受之 Inputs 格式 
query_data = {"age": 35, "income": 50000, "category": "electronics"}
query_df = pd.DataFrame([query_data])
query_df[["age", "income"]] = scaler.transform(query_df[["age", "income"]])

# Step 3: 預測結果輸出
result = model.predict(query_df)
print(result)
```

---

## 補充說明

### 📌 範例比較

| 技術名稱       | 優點                                   | 缺點                         |
|----------------|---------------------------------------|-----------------------------|
| PCA            | 降維簡化特徵空間                     | 無法保留所有原始資訊         |
| One-Hot Encoding | 處理分類型變數                     | 當分類多時造成維度膨脹       |

### 🧠 延伸／常見誤解  

#### 常見誤解一：「所有欄位都可以當作 Features」
事實上，不具備辨識度或實際價值的信息通常不適合作為有效特徵。例如 ID 欄位僅代表唯一識別碼，通常沒有任何預測意義。

#### 常見誤解二：「深度學習不需要手動設計 Features」
雖然深度學習可以自動提取高級抽象特徵，但若原始輸入數據品質不足（例如未正規化），仍會影響性能，因此基礎特徵設計仍不可忽視。
