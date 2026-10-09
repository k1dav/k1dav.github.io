---
title: "Data Preprocessing"
slug: "/notes/data-preprocessing"
tags:
  - "AI"
  - "DataScience"
  - "MachineLearning"
---
## What？

**Data Preprocessing** 是指在進行資料分析或模型訓練之前，對原始資料進行清理、轉換和結構化的過程。這個步驟目的是讓資料變得更有品質、更適合後續的處理。舉例來說，清理不完整的資料欄位、將文字轉換為數字形式，或是標準化數值範圍，這些都是 Data Preprocessing 的常見工作。

## Who？

Data Preprocessing 通常由 **Data Scientists**、**Machine Learning Engineers** 或是 **[ETL](/docs/notes/etl) (Extract, Transform, Load) Developers** 負責。他們需要確保所使用的資料是乾淨且一致的。同時，也會影響到其他技術工作者，例如後端工程師如果要進行資料儲存，就需要處理好預先準備的結構化資料。

舉例來說：一間零售公司的分析團隊可能需要對顧客交易記錄中的遺漏值進行補全，而模型開發工程師則依賴經過良好處理的資料來提高預測結果的準確性。

## When？

你會在以下情境中用到 Data Preprocessing：

1. **機器學習模型訓練之前**：例如在訓練分類器前，你需要將文字標籤轉為數字。
2. **分析報告生成時**：例如你想了解某個產品銷售趨勢，但原始交易記錄有許多重複或錯誤項。
3. **資料庫整合階段**：例如多個來源的資料欄位格式不同，需要統一成一致格式。

簡單來說，只要你碰到「原始資料」且必須把它整理得更乾淨、更結構化，基本上都會用到 Data Preprocessing！

## Where？

Data Preprocessing 一般出現在架構中的「資料輸入階段」，也就是在模型訓練或分析操作之前。它通常以 pipeline 的形式存在，例如：

1. 在 **ETL 流程**中，負責清理及轉換部分。
2. 在 **Notebook 環境（如 Jupyter Notebook）** 中，用 Python 寫下處理邏輯。
3. 在分散式架構中，例如 Spark 的 data transformation 階段。

舉個比喻：如果我們把整個機器學習流程比作烹飪，那麼 Data Preprocessing 就像是食材切割與清洗，是料理之前不可缺少的一環。

## Why？

使用 Data Preprocessing 可以有效解決以下問題：

1. **處理異常值 (outliers)**：避免模型被極端數據影響。
2. **填補遺漏值 (missing values)**：確保所有欄位都有完整資訊供分析使用。
3. **標準化與正規化 (Standardization & Normalization)**：避免因欄位範圍差異導致模型偏向某些特定特徵。
4. **降低維度 (Dimensionality Reduction)**：減少冗餘特徵，加速運算效率。

舉例來說，如果你的原始 Excel 資料集有空白欄位且某些數值大小相差過於懸殊，這樣直接拿去做模型訓練可能會導致結果偏頗。因此，你需要先進行 Data Preprocessing。

---

## How？

### 🛠️ 建立階段

建立 Data Preprocessing 流程通常包含以下步驟：

1. 收集並檢查原始資料：
   - 載入 CSV 或 JSON 檔案，例如使用 Python 的 `pandas` 套件：
     ```python
     import pandas as pd
     data = pd.read_csv("file.csv")
     ```

2. 處理遺漏值 (Missing Values)：
   - 方法包括移除含遺漏值列、填補平均值等：
     ```python
     data.fillna(data.mean(), inplace=True)
     ```

3. 標準化與正規化：
   - 使用 `StandardScaler` 或 `MinMaxScaler` 將數據縮放至相同範圍：
     ```python
     from sklearn.preprocessing import MinMaxScaler
     scaler = MinMaxScaler()
     data_scaled = scaler.fit_transform(data)
     ```

4. 特徵工程 (Feature Engineering)：
   - 建立新特徵或選擇重要特徵。例如透過 PCA 降維：
     ```python
     from sklearn.decomposition import PCA
     pca = PCA(n_components=2)
     data_pca = pca.fit_transform(data_scaled)
     ```

5. 資料分割 (Train-Test Split)：
   - 將資料切成訓練集與測試集，以便評估模型表現。
     ```python
     from sklearn.model_selection import train_test_split
     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
     ```

### 🔍 查詢階段

查詢階段主要針對已完成的 preprocessing 資料進行檢索或驗證：

1. 確認是否有遺漏值或異常點：
   - 使用 Pandas 快速檢查統計摘要：
      ```python
      print(data.describe())
      print(data.isnull().sum())
      ```

2. 驗證正規化是否成功：
   - 比如查看所有數據是否落在 [0, 1] 範圍內:
      ```python
      print(data_scaled.min(axis=0), data_scaled.max(axis=0))
      ```

---

## 補充說明

### 📌 範例比較

以下比較不同工具在執行標準化時的結果差異：

| 工具名稱         | 執行速度（100萬筆）  | API 易用性  |
|------------------|---------------------|------------|
| Scikit-learn      | 快                 | 高          |
| Apache Spark MLlib | 非常快             | 中          |

### 🧠 延伸／常見誤解

- 誤解：「Data Cleaning 和 Data Preprocessing 是完全一樣的。」  
  澄清：Data Cleaning 是 Data Preprocessing 的子集合，它專注於移除錯誤和不完整資訊，而後者包含更多像是特徵工程和正規化等步驟。

- 誤解：「Normalization 與 Standardization 是相同概念。」  
  澄清：Normalization 是將數據縮放至 [0, 1] 範圍，而 Standardization 則是調整至均值為 0、標準差為 1 的分佈。兩者適用場景不同！
