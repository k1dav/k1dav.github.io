---
title: "Recall"
slug: "/notes/recall"
tags:
  - "Classification"
  - "EvaluationMetrics"
  - "MachineLearning"
  - "PerformanceAssessment"
---
## What？
Recall（召回率）是分類模型性能評估中的關鍵指標，定義為：Recall = TP / (TP + FN)，其中 TP 是真正例（True Positive），FN 是假負例（False Negative）。簡單來說，Recall 衡量的是在所有實際正例中，模型成功識別出多少比例。

Recall 回答的問題是：「在所有真實的正例中，我們找到了多少？」例如，在醫療診斷中，如果有 100 個實際患者，模型找到了 95 個，則 Recall = 95%。這個指標對於不能遺漏正例的任務至關重要。

Recall 與 [Accuracy](/docs/notes/accuracy) 和 [Precision](/docs/notes/precision) 不同。Precision 關注正預測中有多少正確，而 Recall 關注所有正例中有多少被找到。這些指標反映了模型的不同側面。

---

## Who？
- 醫療診斷系統的開發者和臨床人員
- 詐欺檢測和風險評估的分析師
- 信息檢索和推薦系統的工程師
- 關注漏報成本的業務決策者

---

## When？
1. 醫療篩查：識別所有潛在患者，寧可假陽性（False Positive）也不遺漏患者
2. 詐欺檢測：捕獲盡可能多的詐欺交易，即使誤判一些正常交易
3. 搜尋引擎：確保返回所有相關文檔，即使包含一些不相關結果
4. 安全系統：檢測所有威脅，接受部分誤報

---

## Where？
1. 模型評估階段的性能指標計算
2. 超參數調整時的 ROC-AUC 和 PR-AUC 曲線
3. [Precision](/docs/notes/precision) 和 Recall 權衡分析中
4. F1 分數和加權 F 分數的計算基礎

---

## Why？
- **防止遺漏**：在高風險場景中，漏報正例的成本遠高於誤報
- **評估完整性**：Recall 直接反映模型找到真實情況的能力
- **業務需求驅動**：不同應用對 Recall 的需求不同，需要針對性優化

---

## How？
### 🛠️ 建立階段
```python
from sklearn.metrics import recall_score, classification_report
from sklearn.model_selection import train_test_split
import numpy as np

# 假設有預測結果
y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]
y_pred = [1, 0, 1, 0, 0, 1, 0, 1, 1, 0]

# 計算 Recall
recall = recall_score(y_true, y_pred)
print(f"Recall: {recall:.4f}")

# 或使用 classification_report 獲取完整報告
print(classification_report(y_true, y_pred))
```

### 🔍 查詢階段
```python
# 詳細計算 Recall
from sklearn.metrics import confusion_matrix

# 獲取混淆矩陣
tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()

# 手動計算 Recall
manual_recall = tp / (tp + fn)
print(f"手動計算的 Recall: {manual_recall:.4f}")

# 分析不同閾值下的 Recall
from sklearn.metrics import roc_curve, auc

# 獲取預測概率
y_proba = model.predict_proba(X_test)[:, 1]

# 計算 ROC 曲線
fpr, tpr, thresholds = roc_curve(y_test, y_proba)
roc_auc = auc(fpr, tpr)

print(f"ROC AUC: {roc_auc:.4f}")

# 調整決策閾值以提高 Recall
for threshold in [0.3, 0.5, 0.7]:
    y_pred_threshold = (y_proba >= threshold).astype(int)
    recall_t = recall_score(y_test, y_pred_threshold)
    print(f"閾值 {threshold}: Recall = {recall_t:.4f}")
```

---

## 補充說明
### 📌 範例比較
| 指標 | 定義 | 關注點 | 適用場景 |
|------|------|--------|---------|
| [Recall](/docs/notes/recall) | TP/(TP+FN) | 所有正例中找到多少 | 醫療診斷 |
| [Precision](/docs/notes/precision) | TP/(TP+FP) | 預測正例中正確多少 | 垃圾郵件過濾 |
| [Accuracy](/docs/notes/accuracy) | (TP+TN)/(總數) | 整體預測準確性 | 類別均衡 |
| F1 分數 | 2×(P×R)/(P+R) | Precision 和 Recall 平衡 | 綜合評估 |

### 🧠 延伸／常見誤解
- **誤解**：Recall 越高越好。實際上，一味提高 Recall 會降低 Precision，需要根據業務成本權衡。
- **延伸**：在不均衡數據上，應使用加權 Recall 或針對少數類的 Recall 來真實評估模型性能。
