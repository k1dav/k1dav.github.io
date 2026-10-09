---
title: "F1 Score"
slug: "/notes/f1-score"
tags:
  - "AI"
  - "DataScience"
  - "MachineLearning"
  - "NLP"
---
## What？

**F1 Score** 是一種用來衡量分類模型效能的指標，主要結合了 Precision 和 Recall 的結果。它是一個數學公式，用來平衡模型在「預測準確性」和「覆蓋率」上的表現。如果你的分類模型可能會面臨偏重某一方面而忽略另一面的問題，那麼 F1 Score 就能幫助你評估整體效能。

### 簡單說法  
F1 Score 是在 Precision 和 Recall 之間找到一個平衡點的工具。舉例來說，假設你正在開發垃圾郵件過濾器，Precision 代表成功地抓到垃圾郵件的準確度，而 Recall 則是抓到所有垃圾郵件的完整性。如果你的模型只專注於提高其中一項（例如：高 Precision，但低 Recall），可能會導致未被檢測出的垃圾郵件漏網。因此使用 F1 Score 可以提供更均衡的效能指標。

---

## Who？

**誰使用、誰受影響？**  
F1 Score 通常由資料科學家、機器學習工程師以及那些需要評估分類模型效能的技術工作者使用。例如，以下情境中可能會需要：  

- 開發醫療診斷系統（如癌症檢測）  
- 建立自然語言處理模型（如情感分析）  
- 設計欺詐行為偵測系統（如信用卡異常交易）  

任何涉及二元或多類別分類問題的人都可能需要用到 F1 Score 來判斷模型是否足夠可靠。

---

## When？

**什麼時間點會用到？**  
通常在以下情境中，F1 Score 會派上用場：

- **模型訓練後評估階段**：當你完成對機器學習模型的訓練後，需要選擇最佳效能指標來進行比較。  
- **不平衡資料集上特別重要**：如果你的資料集中不同類別之間分布不均，例如某類別佔比極少，Precision 或 Recall 單獨評估可能不足，而 F1 Score 可以補足這種缺陷。  

---

## Where？

**出現在架構哪個部分？**  
F1 Score 通常出現在機器學習開發流程中的「評估階段」，尤其是在以下步驟中：

1. 訓練完畢後對應測試集進行效能驗證。
2. 比較不同分類器（比如 Logistic Regression、Random Forest）的優劣。
3. 檢查超參數調整是否提升了分數。  

無論使用何種框架（如 Scikit-learn 或 TensorFlow），計算 F1 Score 的步驟通常都是標準化且容易實現。

---

## Why？

**解決什麼問題？**  
在多數分類任務中，你需要同時關注 Precision 和 Recall，但有時候它們是互相拉扯的——提高其中一項可能會犧牲另一項。例如：

- 如果只追求高 Precision，你可能錯失一些應該被正確預測的樣本。
- 如果只追求高 Recall，你可能包含了大量錯誤預測樣本。

因此，F1 Score 幫助你平衡這兩者。它適合用於不平衡資料集，也適合那些「錯誤成本較高」但仍需考慮全面性的任務，例如醫療診斷或金融欺詐偵測。

公式如下：
```
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

---

## How？

### 🛠️ 建立階段  
要計算 F1 Score，你首先需要取得 Precision 和 Recall 的值。以下是步驟：  

#### 步驟 1：建立[Confusion Matrix](/docs/notes/confusion-matrix)（Confusion Matrix）  
先透過混淆矩陣拿到 True Positive (TP)、False Positive (FP)、False Negative (FN)。  

#### 步驟 2：計算 Precision 和 Recall  
公式如下：
```
Precision = TP / (TP + FP)
Recall = TP / (TP + FN)
```

#### 步驟 3：代入 F1 Score 的公式進行計算
```
F1 = 2 * (Precision * Recall) / (Precision + Recall)
```

### 🔍 查詢階段
當你要比較多個模型時，可以透過程式碼快速查詢各自的 F1 分數。例如，在 Scikit-learn 中可以這樣操作：

```python
from sklearn.metrics import f1_score

# 假設 y_true 與 y_pred 已經定義
f1 = f1_score(y_true, y_pred, average='binary') # 對二元分類
print(f"Model's F1 score: {f1}")
```

如果是多類別分類，可以將 `average` 設定為 `'macro'` 或 `'weighted'`，視需求而定。

---

## 補充說明

### 📌 範例比較

以下是一個簡單範例，用於展示不同情況下 Precision、Recall 與 F1 分數之間如何相互影響：

| 模型名稱        | TP   | FP   | FN   | Precision | Recall | F1    |
|-----------------|------|------|------|-----------|--------|-------|
| Model A        | 50   | 10   | 40   | 0.83      | 0.55   | 0.66  |
| Model B        | 45   | 5    | 35   | 0.90      | 0.56   | **0.69** |
| Model C        | 60   | 20   | 20   | **0.75**      | **0.75**   || **0.75**

從表格可以看出 Model C 在均衡性上表現最佳，而其他模型則偏向某一方面。

---

### 🧠 延伸／常見誤解

#### 誤解澄清：
- **F1 高代表所有情況都好嗎？**
並非如此！即使有高分，也不能完全忽視原始資料分布及業務需求。有些任務更重視 Precision 或 Recall，其中的一方仍然值得額外關注。
 
#### 延伸補充：
除了傳統二元或多類別分類外，一些更複雜的場景也可考慮使用變體，例如 Micro-F1 或 Macro-F2 分數，以因應特定需求。
