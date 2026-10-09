---
title: "Random Forest"
slug: "/notes/random-forest"
tags:
  - "Classification"
  - "EnsembleMethods"
  - "MachineLearning"
  - "SupervisedLearning"
  - "regression"
---
## What？
Random Forest 是一種集成學習（Ensemble Learning）演算法，由多個決策樹（Decision Tree）組合而成。每棵樹都是在隨機樣本和隨機特徵子集上訓練的，最終通過投票（分類）或平均（迴歸）來做出預測。

這個演算法的核心思想是「眾議成事」：單一決策樹容易過度擬合（Overfitting），但多個獨立訓練的樹可以相互補償，提高泛化能力。例如，在預測客戶購買行為時，單一樹可能過度依賴某個特徵，而 Random Forest 則能平衡多個特徵的影響。

Random Forest 通過 Bootstrap 取樣（有放回抽樣）和特徵隨機選擇實現樹的多樣性。每棵樹都看到不同的訓練數據版本和特徵組合，這種多樣性是演算法成功的關鍵。

---

## Who？
- 資料科學家和 ML 工程師用於分類和迴歸任務
- 特徵重要性分析的使用者
- 處理高維數據的研究人員
- 金融、醫療、零售等領域的分析師

---

## When？
1. 用於銀行風險評估：預測貸款違約風險
2. 醫療診斷：基於患者特徵預測疾病類型
3. 電商推薦系統：預測用戶是否會購買產品
4. 特徵選擇：計算特徵重要性以簡化模型

---

## Where？
1. 資料前處理後的特徵工程階段
2. Model Training Pipeline 中的 Baseline 模型構建
3. 超參數調整前的初期模型評估
4. 最終 Ensemble 層中與其他演算法的組合

---

## Why？
- **降低過度擬合**：多樹投票機制減少單一模型的方差
- **自動特徵選擇**：能夠衡量特徵重要性，識別關鍵變數
- **處理非線性**：無需特徵工程即可捕捉複雜的非線性關係

---

## How？
### 🛠️ 建立階段
```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# 分割訓練和測試集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 創建 Random Forest 模型
rf_model = RandomForestClassifier(
    n_estimators=100,      # 樹的數量
    max_depth=10,          # 樹的最大深度
    min_samples_split=5,   # 分割節點最少樣本數
    random_state=42
)

# 訓練模型
rf_model.fit(X_train, y_train)
```

### 🔍 查詢階段
```python
# 進行預測
predictions = rf_model.predict(X_test)

# 獲取預測概率
probabilities = rf_model.predict_proba(X_test)

# 查看特徵重要性
feature_importance = rf_model.feature_importances_

# 模型評估
from sklearn.metrics import accuracy_score
print(accuracy_score(y_test, predictions))
```

---

## 補充說明
### 📌 範例比較
| 特徵 | Random Forest | Decision Tree | Gradient Boosting |
|------|---------------|---------------|--------------------|
| 過度擬合 | 低 | 高 | 中等 |
| 訓練速度 | 中等 | 快 | 慢 |
| 特徵重要性 | 可靠 | 可靠 | 可靠 |
| 資料規模 | 中到大 | 小到中 | 中到大 |

### 🧠 延伸／常見誤解
- **誤解**：更多樹總是更好。實際上，樹數量達到一定程度後效果會平穩，且會增加計算成本。
- **延伸**：Extremely Randomized Trees（ExtraTrees）進一步隨機化分割閾值，提高訓練速度但可能降低精度。
