---
title: "Precision"
slug: "/notes/precision"
tags:
  - "BinaryClassification"
  - "Classification"
  - "EvaluationMetrics"
  - "MachineLearning"
  - "ModelAssessment"
---
## What？

Precision（精確度或正例預測精度）是分類模型評估的關鍵指標，衡量模型預測為正例的結果中，有多少是真正的正例。計算公式為：Precision = TP / (TP + FP)，其中 TP 是真正例（True Positive），FP 是假正例（False Positive）。

Precision 回答的問題是「當模型預測為正例時，其正確的概率是多少」。例如：垃圾郵件分類器預測 100 封郵件為垃圾郵件，其中 95 封確實是垃圾郵件，5 封是正常郵件，則 Precision = 95/100 = 0.95。

Precision 與 Recall（召回率）常常一起使用，但各有側重。Precision 關心的是預測為正例的精確度，Recall 關心的是對所有實際正例的覆蓋率。在不同場景下，對這兩個指標的重視程度不同。垃圾郵件系統更看重 Precision（避免誤刪正常郵件），而醫療診斷更看重 Recall（避免漏診患者）。

---

## Who？

- **機器學習工程師**：模型評估和優化中核心指標之一
- **資料科學家**：選擇合適的評估指標進行模型比較
- **業務分析師**：理解模型效果的商業含義
- **醫療 AI 工程師**：醫療診斷模型評估中需關注 Precision 和 Recall 平衡
- **推薦系統工程師**：評估推薦相關性精度

---

## When？

1. **垃圾郵件偵測**：誤判為垃圾的正常郵件會影響使用者體驗，應優化 Precision
2. **詐欺交易偵測**：誤判為詐欺的正常交易會困擾用戶，需要高 Precision
3. **醫療診斷輔助**：醫生信賴度考量，高 Precision 保證誤診率低
4. **推薦系統**：推薦的物品品質重要，高 Precision 表示推薦相關性強

---

## Where？

1. **模型評估階段**：訓練完成後在測試集上計算 Precision
2. **超參數調整**：通過調整決策閾值來平衡 Precision 和 Recall
3. **業務決策點**：選擇合適的分類閾值以滿足業務需求
4. **效能監控**：線上模型監控中持續追蹤 Precision 變化

---

## Why？

Precision 解決的核心問題是**預測質量的評估**。簡單的準確度（Accuracy）在資料不平衡時會誤導。例如：在 1000 條郵件中有 950 條垃圾郵件，即使模型把全部郵件都分類為垃圾，準確度也達 95%，但這個模型完全無用。Precision 提供了不同角度的評估。

其次，Precision 與業務成本直接相關。誤判成本在不同場景差異大：垃圾郵件系統中誤刪正常郵件（FP）成本很高，醫療診斷中漏診患者（FN）成本更高。選擇合適的指標指導模型優化方向。

第三，Precision 與 Recall 的平衡體現了不同場景的權衡。並不存在「完美」指標，只有符合業務目標的指標選擇。

---

## How？

### 🛠️ 建立階段

**計算混淆矩陣和 Precision：**
```python
from sklearn.metrics import confusion_matrix, precision_score
import numpy as np

y_true = [1, 0, 1, 1, 0, 1, 0, 0, 1, 1]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0, 1, 1]

# 混淆矩陣
tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
print(f"TP={tp}, FP={fp}, FN={fn}, TN={tn}")

# Precision 計算
precision = tp / (tp + fp)
print(f"Precision: {precision:.2f}")
```

**使用 scikit-learn 直接計算：**
```python
from sklearn.metrics import precision_score

precision = precision_score(y_true, y_pred)
print(f"Precision: {precision:.4f}")

# 多分類情況
precision_weighted = precision_score(y_true, y_pred, average='weighted')
```

### 🔍 查詢階段

**計算 Precision-Recall 曲線：**
```python
from sklearn.metrics import precision_recall_curve
import matplotlib.pyplot as plt

y_scores = [0.9, 0.1, 0.8, 0.3, 0.2, 0.7, 0.4, 0.15, 0.85, 0.95]
precisions, recalls, thresholds = precision_recall_curve(y_true, y_scores)

plt.plot(recalls, precisions)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.show()
```

---

## 補充說明

### 📌 範例比較

| 指標 | 公式 | 含義 | 優先場景 |
|-----|------|------|--------|
| Precision | TP/(TP+FP) | 預測正確率 | 誤判成本高 |
| Recall | TP/(TP+FN) | 覆蓋率 | 漏判成本高 |
| F1-Score | 2PR/(P+R) | 平衡指標 | 整體評估 |
| Accuracy | (TP+TN)/總數 | 整體準確度 | 資料平衡 |

### 🧠 延伸／常見誤解

**誤解 1**：Precision 越高越好。高 Precision 通常伴隨低 Recall，這在需要覆蓋所有正例的場景（如患者診斷）中不適用。

**誤解 2**：Accuracy 高表示模型好。在資料極度不平衡的情況下，Accuracy 無法反映真實效果。必須結合 Precision 和 Recall。

**延伸**：F1-Score 是 Precision 和 Recall 的調和平均，當兩者都重要時使用。ROC-AUC 從另一角度評估分類效果，與 Precision-Recall 互補。
