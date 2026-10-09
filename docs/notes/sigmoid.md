---
title: "Sigmoid"
slug: "/notes/sigmoid"
tags:
  - "AI"
  - "MachineLearning"
  - "Mathematics"
---
## What？

Sigmoid 是一種常用的數學函數，通常出現在機器學習、深度學習以及統計模型中。它是一個 S 型曲線（Sigmoidal Curve），其輸出範圍介於 0 到 1 之間。公式如下：

$$
f(x) = \frac{1}{1 + e^{-x}}
$$

簡單來說， Sigmoid 函數可以將任意實數值轉換為介於 0 和 1 的範圍，這特性使得它非常適合用於概率估算或分類問題中的輸出層。

舉例來說，如果你在建構一個二元分類模型（Binary Classification Model）， Sigmoid 函數能將模型的預測結果轉化為一個概率值，例如「這張圖片是貓的概率有 80%」。

---

## Who？

Sigmoid 函數主要被使用在以下技術工作者的場景中：

- **資料科學家**：在建構[Logistic Regression](/docs/notes/logistic-regression)（Logistic Regression）或[深度學習](/docs/notes/deep-learning)模型時經常會使用。
- **機器學習工程師**：需要設計二元或多元分類的神經網路架構。
- **研究人員**：進行與統計相關的研究，特別是涉及概率分佈和非線性分析的方法。

此外， Sigmoid 函數也間接影響到應用層面的技術工作者，例如從事推薦系統、醫療診斷系統等領域的人。

---

## When？

以下幾個時間點會用到 Sigmoid 函數：

1. **訓練階段**：當你設計並訓練神經網路模型時，它常被用作最後一層的[激活函數](/docs/notes/activation-function)（Activation Function）。
2. **推論階段**：需要從模型中產生一個介於 0 到 1 的輸出，用以表示某事件發生的可能性。
3. **資料預處理時**：有時候會利用 Sigmoid 作為簡單的正規化工具，將資料壓縮到固定範圍內。

例如，在醫療診斷系統中，你可能需要判斷「病人是否患有某疾病」這樣二選一的問題，此時可以透過 Sigmoid 函數輸出該疾病發生概率。

---

## Where？

Sigmoid 函數通常在以下架構部分中出現：

- **[人工神經網絡](/docs/notes/artificial-neural-network)架構（Neural Network Architecture）**：
   - 作為輸出層（Output Layer）的激活函數，用於二元分類問題。
   - 在隱藏層早期版本曾被廣泛使用，但因梯度消失問題，目前多改用 ReLU 或其他激活函數。

- **[機器學習](/docs/notes/machine-learning)算法（Machine Learning Algorithm）**：
   - 在邏輯迴歸模型中直接嵌入作為核心運算部分。

大部分深度學習框架如 TensorFlow 或 PyTorch 都內建了 Sigmoid 函數，因此技術工作者可以直接調用現成的方法，而無需自行實作。

---

## Why？

Sigmoid 解決了以下幾個重要問題：

1. **概率映射功能**：
   它能將輸入值映射到固定範圍 [0, 1]，簡化了我們對結果解讀，例如「事件發生可能性」或「某類別概率」。

2. **平滑非線性特性**：
   相較於其他函數，它具有平滑且連續可微分特性，有助於優化算法進行梯度下降（Gradient Descent）。

3. **便捷運算方式**：
   計算公式相對簡單，因此能快速完成大量運算而不影響性能。

然而，它也存在一些局限，例如梯度消失問題（Gradient Vanishing）。因此在隱藏層部分逐漸被 ReLU 等替代，但仍然是分類問題中的首選激活函數之一。

---

## How？

### 🛠️ 建立階段

建立包含 Sigmoid 的模型通常會遵循以下流程：

1. 定義神經網路架構，其中最後一層使用 Sigmoid 激活函數。
2. 初始化權重與偏差項，確保資料正確地通過。
3. 使用交叉熵損失函數（[Cross Entropy Loss Function](/docs/notes/cross-entropy-loss-function)）來評估模型性能。
4. 運行[反向傳播](/docs/notes/back-propagation)算法（Backpropagation），更新權重以最小化損失。
5. 重複步驟直到收斂，即得到穩定預測結果。

如果使用框架如 TensorFlow 或 PyTorch，可以直接調用 `torch.nn.Sigmoid()` 或 `tf.keras.activations.sigmoid` 方法嵌入至神經網路架構中。 

### 🔍 查詢階段

在查詢階段，你可以針對新輸入資料進行推論並取得結果值。流程如下：

1. 將待測資料送入已訓練好的模型。
2. 模型計算各層結點之間的加權和並套用激活函數，其中最後一層執行 Sigmoid 運算。
3. 輸出的結果會是一個介於 [0, 1] 的浮點值，可視為目標類別發生機率。例如，預測值 0.85 表示該樣本以高機率屬於目標類別。

如果需要進一步操作，比如設定閾值來判定結果，可以採取以下邏輯：
```python
threshold = 0.5
if output >= threshold:
    print("Positive class")
else:
    print("Negative class")
```

---

## 補充說明

### 📌 範例比較

以下比較不同激活函數在特定情境下的表現差異：

| 激活函數      | 輸出範圍       | 梯度消失風險      | 適合場景               |
|---------------|---------------|-------------------|-----------------------|
| Sigmoid       | [0, 1]        | 高                | 二元分類               |
| ReLU          | [0, ∞)        | 中                | 深度隱藏層             |
| Softmax       | 各類別比例分佈   | 中                | 多元分類               |

### 🧠 延伸／常見誤解

#### 誤解一：Sigmoid 是所有場合都適合
事實上，由於梯度消失風險，在深度神經網路中的隱藏層已較少採用。它主要適合應用在輸出層做概率估算，而不是整個網路架構中的每一部分。

#### 誤解二：Sigmoid 與 Softmax 功能雷同
雖然兩者都可產生介於 [0, 1] 的輸出，但 Softmax 適合多元分類，每個類別都有專屬比例；而 Sigmoid 更適合獨立處理每次僅有兩種可能性的情境，例如二元分類問題。
