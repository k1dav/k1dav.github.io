---
title: "SVM"
slug: "/notes/svm"
tags:
  - "AI"
  - "MachineLearning"
---
## What？

**SVM**（Support Vector Machine，支援向量機）是一種 [Supervised Learning](/docs/notes/supervised-fine-tuning) 的[機器學習](/docs/notes/machine-learning)演算法，主要用於分類（[Classification](/docs/notes/classification)）和迴歸（[Regression](/docs/notes/regression)）任務。它的核心概念是透過找到一條「最佳超平面」（Optimal Hyperplane），將不同類別的資料分隔開來，並使分類的準確度最大化。

簡單來說，你可以把 **SVM** 想像成在二維空間中畫一條線來分割兩群點，而這條線的目標是距離這些點中最接近的一組（稱為 Support Vectors）的距離最大化。當資料是多維時，這條「線」就會升級為「平面」或更高維度的「超平面」。

---

## Who？

通常 **SVM** 被以下角色使用：

- **資料科學家**：用來完成分類問題，例如垃圾郵件辨識或影像分類。
- **機器學習工程師**：在需要高效且準確演算法時選用 **SVM**。
- **研究人員／學術界**：研究與探索更複雜應用，例如基因表達數據分析。

受影響的對象則包括：

- 應用程式使用者：例如透過垃圾郵件過濾系統獲得更精準的郵件分類。
- 業務團隊：透過 SVM 分析客戶行為模式以改善商業決策。

---

## When？

你可能會在以下情境需要使用 **SVM**：

1. 資料集規模適中，但特徵數較多（例如基因數據分析）。
2. 資料分布接近線性可分（Linear Separable）。
3. 需要高效能且穩定的分類模型，但不想手動進行太多調參。
4. 對小型資料集有精準結果要求時，選擇 **SVM** 是不錯的選擇。

---

## Where？

**出現在架構哪個部分？**

在典型機器學習流程中， **SVM** 通常出現於以下部分：

1. **[資料前處理](/docs/notes/data-preprocessing)：**
   - 清理完畢並進行特徵提取後，可以直接作為訓練模型的一部分。
2. **模型訓練階段：**
   - 利用訓練資料建立最佳超平面。
1. **模型[推理](/docs/notes/inference)階段：**
   - 使用已訓練好的超平面進行新資料分類。

---

## Why？

**解決什麼問題？**

主要目的是解決二元或多元分類問題。在實務上， SVM 的應用非常廣泛，例如：

1. 垃圾郵件辨識：
   - 根據文字特徵判斷是否為垃圾郵件。
2. 圖像辨識：
   - 分類圖片中的物品，例如區分狗與貓。
3. 醫療診斷：
   - 分析病患基因表達數據，以預測疾病可能性。

此外，相較於其他演算法， SVM 在小型且高維度資料集上具備優勢，它能有效避免 [Overfitting](/docs/notes/overfitting) 並提供穩定表現。

---

## How？

### 🛠️ 建立階段

建立一個 SVM 模型主要包含以下步驟：

1. 資料前處理：
   - 清理缺失值並標準化特徵，以便讓所有變數在同一尺度上運算。
2. 設定 Kernel 函數：
   - 根據需求選擇適合的 Kernel，例如 Linear Kernel 或 RBF Kernel。如果你的資料是非線性可分，可以考慮 RBF Kernel。
3. 訓練模型：
   - 使用 `fit` 函數將訓練資料送入 SVM。常見工具如 Scikit-learn 提供了簡易接口來完成此步驟。
4. 超參數調整：
   - 調整參數如 `C` 值（正則化強度）和 `gamma` 值以改善模型性能。

程式範例（使用 Python 和 Scikit-learn）：
```python
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC

# 載入範例資料
data = datasets.load_iris()
X, y = data.data, data.target

# 分割訓練集與測試集
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# 初始化 SVM 模型並指定參數
model = SVC(kernel='linear', C=1)

# 訓練模型
model.fit(X_train, y_train)
```

### 🔍 查詢階段

查詢階段通常是利用已訓練好的模型來進行預測。流程如下：

1. 新資料輸入：
   - 提供新樣本作為輸入，例如圖片特徵向量或文本轉換後的向量形式。
2. 預測類別：
   - 使用 `predict` 方法得到結果。例如下列程式碼展示如何進行預測。

程式範例：
```python
# 預測新樣本類別
predictions = model.predict(X_test)

# 確認預測結果
print(predictions)
```

---

## 補充說明

### 📌 範例比較

下列表格比較了不同 Kernel 的效果與適合場景：

| Kernel 類型       | 優勢                          | 適合場景                 |
|------------------|-----------------------------|-----------------------|
| Linear Kernel    | 高效、簡單                   | 資料線性可分           |
| Polynomial Kernel| 能捕捉複雜模式               | 中等複雜度             |
| RBF Kernel       | 非線性可分、高靈活性         | 高維非線性之問題        |

### 🧠 延伸／常見誤解

#### 誤解 1: 「只有大規模資料才適合使用 SVM」
事實上， SVM 在小型、高維度資料上表現更佳；若是大規模低維度，反而可能出現計算瓶頸，需要其他方法如深度學習補充。

#### 誤解 2: 「調整 Kernel 就一定能提高性能」
Kernel 的選擇固然重要，但超參數如 `C` 和 `gamma` 的設置同樣影響性能。不妨在調參時嘗試網格搜索（Grid Search）。
