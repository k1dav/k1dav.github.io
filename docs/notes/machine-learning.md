---
title: "Machine Learning"
slug: "/notes/machine-learning"
tags:
  - "AI"
  - "DataScience"
  - "DeepLearning"
---
## What？

**Machine Learning**（機器學習）是一種讓電腦能夠從資料中學習並做出預測或決策的技術。與傳統基於規則的程式設計不同，Machine Learning 不需要明確編寫每個邏輯，而是透過訓練模型來讓系統自行找出模式。例如，你可以用 Machine Learning 來建立一個能判斷圖片中是否有貓的模型，而不需要逐一列出「什麼是貓」的特徵。

---

## Who？

**Machine Learning** 的使用者涵蓋範圍廣泛，包含：

- **技術工作者**：如 Data Scientists、AI Engineers，用於模型訓練與部署。
- **企業決策者**：透過 Machine Learning 模型分析數據，提供商業洞察。
- **最終用戶**：如使用推薦系統的人，例如 Netflix 推薦影片或 Spotify 推薦歌曲。

受影響的對象包括任何依賴自動化決策或預測結果的人，例如借貸風險評估中的申請人。

---

## When？

你會在以下情境中用到 **Machine Learning**：

1. 當有大量數據需要分析時，例如客戶行為資料或醫療紀錄。
2. 當問題無法輕易以明確規則解釋時，例如語音辨識或圖像分類。
3. 當需要實時調整輸出的結果時，例如動態廣告投放。

具體例子像是電子商務網站，希望根據客戶瀏覽記錄即時推薦商品。

---

## Where？

在系統架構中，**Machine Learning** 通常會出現在以下位置：

1. **資料處理層（Data Processing Layer）**：負責清理並轉換原始資料為模型可用的格式。
2. **模型訓練層（Model Training Layer）**：使用訓練數據來建立 Machine Learning 模型。
3. **應用層（Application Layer）**：將已訓練好的模型嵌入應用程式內進行查詢或[模型推論](/docs/notes/inference)。

例如，在推薦系統架構中，底層負責收集點擊行為資料，中間層進行模型訓練，頂層則根據查詢輸出推薦結果。

---

## Why？

我們使用 **Machine Learning** 是為了解決以下問題：

1. **效率提升**：處理大量複雜數據，比人工分析快且準確。
2. **自動化能力增強**：例如自動生成標籤、分類內容等功能。
3. **模式探索能力強大**：發掘隱藏在數據中的洞察力，例如客群分群和異常檢測。

舉例來說，人類很難手動閱讀上百萬筆交易記錄，但 Machine Learning 能快速找出其中異常交易。

---

## How？

### 🛠️ 建立階段

建立 Machine Learning 模型通常包含以下流程：

1. 收集並準備數據：
   - 清理缺失值和異常值
   - 特徵工程（[Feature Engineering](/docs/notes/feature-engineering)）
   - 分割成 Training Set 和 Testing Set

2. 選擇演算法：
   - 根據需求選擇適合的演算法，例如 Regression、Classification 或 Clustering。

3. 訓練模型：
   - 使用 Training Set 設定超參數並優化模型性能。
   - 範例程式碼：
     ```python
     from sklearn.linear_model import LinearRegression
     model = LinearRegression()
     model.fit(X_train, y_train)
     ```

4. 評估與調整：
   - 透過 Testing Set 計算 Accuracy、Precision 等指標進行評估與微調參數。
$$Accuracy = \frac{\text{正確預測}}{\text{總樣本}}$$

### 🔍 查詢階段

查詢已建立好的 Machine Learning 模型通常包含以下步驟：

1. 接收輸入：
   - 例如接收到一筆新客戶資料作信用評分用途。

2. 預處理輸入：
   - 將原始輸入轉換為符合特徵格式。例如將文字編碼成 One-Hot Encoding 或正規化數值範圍。

3. 使用預測函式進行推論：
   ```python
   prediction = model.predict(new_data)
   ```

4. 回傳結果給應用層以進一步呈現或採取行動。例如信用評分高於某閾值則批准貸款。

---

## 補充說明

### 📌 範例比較

以下是不同 Machine Learning 演算法在分類問題上的表現比較（假設相同條件下訓練）：

| 演算法      | Precision       | Recall          | 適合場景           |
|-------------|-----------------|-----------------|--------------------|
| Logistic Regression | 高                 | 中                 | 二元分類           |
| Decision Tree       | 中                 | 中                 | 解釋性需求高        |
| Random Forest       | 高                 | 高                 | 較大且複雜的資料集 |

### 🧠 延伸／常見誤解

#### 誤解一：「所有問題都可以用 Machine Learning 解決」
不是所有問題都適合。若有清晰且固定邏輯規則，可以考慮使用傳統程式設計。例如，一個簡單的加減運算公式就不需要使用 ML 模型去推導結果。

#### 誤解二：「深度學習就是 Machine Learning」
深度學習只是 Machine Learning 的一部分，它主要針對大量非結構化資料（如影像或語音），而傳統 ML 更適合小型結構化資料集，如 Excel 表格中的銷售記錄。

#### 延伸應用
除了最常見的分類和回歸，還有很多其他應用場景，如 Reinforcement Learning 用於遊戲 AI 或 Multi-Armed Bandit 用於廣告效果最大化。
