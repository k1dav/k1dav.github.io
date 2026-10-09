---
title: "Confusion Matrix"
slug: "/notes/confusion-matrix"
tags:
  - "AI"
  - "Analysis"
  - "Data"
  - "MachineLearning"
---
## What？

混淆矩陣（Confusion Matrix）是一種用於評估分類模型性能的工具，透過矩陣形式展現模型在不同類別上的預測結果。它將預測值與真實值進行比對，並計算出正確與錯誤的分類數量。

簡單來說，混淆矩陣是一個 2x2 或 NxN 的表格（視類別數量而定），幫助我們了解模型在哪些地方做對了、哪些地方搞錯了。舉例來說，如果你有一個二元分類的模型（例如判斷郵件是否為垃圾郵件），混淆矩陣就可以告訴你有多少封郵件被正確地標記為垃圾郵件，以及有多少封正常郵件被誤判為垃圾。

---

## Who？

混淆矩陣主要是給以下角色使用：

- **資料科學家**：用來評估模型的準確性，並進一步調整。
- **機器學習工程師**：幫助理解模型在不同類別上的表現。
- **產品經理**：雖然不是技術主力，但可以透過簡化版的混淆矩陣了解產品效能。
- **分析師**：用以解釋模型結果給業務部門或其他非技術團隊。

簡單說，只要你的工作需要和分類模型打交道，那你就可能會接觸到混淆矩陣。

---

## When？

什麼時間點會使用混淆矩陣？以下是常見情境：

1. **模型訓練完成後**：當你需要檢查模型是否符合專案需求或目標準確度時。
2. **調整超參數時**：每次更改參數後，都可以用混淆矩陣檢查改動是否改善了效果。
3. **比較多個模型時**：選擇最好的分類器時，透過混淆矩陣比較不同算法的強弱。
4. **部署前評估階段**：確認模型能在實際應用中發揮作用。

---

## Where？

混淆矩陣通常會出現在以下架構部分：

- 在機器學習流程中的「評估階段」中使用，用來判斷訓練好的分類器性能。
- 在報告生成工具中（例如 Jupyter Notebook 或 BI 工具），幫助呈現具體的結果。
- 在資料流架構中，它可能會嵌入到某些監控模組，用以持續追蹤部署後的模型效能。

---

## Why？

為什麼要用混淆矩陣呢？它主要解決以下問題：

1. **全面性分析**：比單純看 Accuracy 更詳細，它可以分解成 TP、FP、FN 和 TN 四種指標，幫助識別特定類別上的弱點或偏差。
2. **支援多指標計算**：如 Precision、Recall、F1-score 等，都依賴於它提供的基礎數據。
3. **避免誤導性結果**：例如，在不平衡資料集上，僅看 Accuracy 可能會讓人高估效果，而混淆矩陣能揭露真實情況。

舉例來說，如果你的二元分類器在處理 95% 正樣本和 5% 負樣本時，只看 Accuracy 可能是 95%，但其實大部分負樣本都被錯誤地預測為正樣本。這就是為什麼我們需要更細緻的方法！

---

## How？

### 🛠️ 建立階段

建立一個 Confusion Matrix 的流程如下：

1. 建立一個已訓練好的分類器（例如 Logistic Regression 或 Random Forest）。
2. 使用測試集進行預測，獲得預測值 `y_pred` 和真實值 `y_true`。
3. 利用 Python 中 `sklearn.metrics.confusion_matrix` 函數生成矩陣：
   ```python
   from sklearn.metrics import confusion_matrix
   
   cm = confusion_matrix(y_true, y_pred)
   print(cm)
   ```
4. 可視化結果（選擇性）：利用 `seaborn` 繪製熱力圖：
   ```python
   import seaborn as sns
   import matplotlib.pyplot as plt
   
   sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
   plt.xlabel('Predicted')
   plt.ylabel('Actual')
   plt.show()
   ```

### 🔍 查詢階段

查詢階段通常是根據 Confusion Matrix 的四大元素進一步計算各種指標，例如：

1. 計算 Precision：
$$
    \text{Precision} = \frac{\text{TP}}{\text{TP} + \text{FP}}
    $$

2. 計算 Recall：
$$
    \text{Recall} = \frac{\text{TP}}{\text{TP} + \text{FN}}
    $$
3. 計算 F1-score：
$$
    F_1 = 2 \times (\frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}})
$$

這些指標可以直接透過 `sklearn.metrics` 中的函數計算，例如：
```python
from sklearn.metrics import precision_score, recall_score, f1_score

precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

print(f"Precision: {precision}, Recall: {recall}, F1-score: {f1}")
```

---

## 補充說明

### 📌 範例比較

假設某二元分類器作用於醫療診斷場景，以下是兩組結果比較：

| 模型名稱      | TP  | FP  | FN  | TN  | Precision (%) | Recall (%) |
|---------------|-----|-----|-----|-----|---------------|------------|
| Model A       | 50  | 10  | 5   | 35  | 83.33         | 90         |
| Model B       | 45  | 5   | 10  | 40  | *90*          | *81*       |

Model A 比 Model B 的 Recall 高，但 Precision 較低。如何選擇要看具體需求，例如偏重「找出所有陽性病例」（高 Recall），還是減少誤報率（高 Precision）。

### 🧠 延伸／常見誤解

#### 誤解一：「Accuracy 高代表好」
很多人認為只要 Accuracy 高，就代表模型好。但若資料集不平衡，高 Accuracy 並不一定代表真正有效。例如，在巨量正常樣本下忽略少量異常樣本可能導致重大隱患。

#### 誤解二：「只看 TP/FP/FN/TN 就夠了」
單純查看原始 Confusion Matrix 數字未必足夠，我們通常需要進一步分析 Precision 和 Recall 等衍生指標，以便全面了解性能。
