---
title: "Cross Entropy Loss Function"
slug: "/notes/cross-entropy-loss-function"
tags:
  - "AI"
  - "MachineLearning"
  - "DeepLearning"
---
## What？

**Cross Entropy Loss Function** 是一種常用於分類問題的損失函數，用來衡量模型在預測類別上的準確程度。它會計算真實標籤與模型預測之間的差距，並以此作為模型參數更新的依據。

簡單來說，每次模型預測結果接近真實標籤時，損失就會較小；反之，若偏離真實標籤則損失較大。舉例來說，就像你在猜拳遊戲中，需要猜中對手的出拳（石頭、剪刀、布），而 **Cross Entropy Loss Function** 就是在評估你猜得有多準。

公式如下：  
$$
L = - \sum_{i=1}^{C} y_i \log (\hat{y}_i)
$$  
其中：
- $$y_i$$ 是真實標籤（One-Hot 編碼）
- $$\hat{y}_i$$ 是模型輸出的機率分佈
- $$C$$ 是類別總數

## Who？

這個損失函數主要使用於需要處理分類問題的技術工作者，例如：
1. **資料科學家**：用來訓練分類器，例如影像辨識或文字分類。
2. **機器學習工程師**：在設計深度學習模型（如 CNN 或 [Transformer](/docs/notes/transformer)）時使用。
3. **研究人員**：分析不同損失函數對模型表現的影響。

另外，它也會影響到下游使用者，因為它直接決定了模型預測結果的準確性。例如：若你的應用是推薦系統，那 Cross Entropy 的效果可能會直接影響推薦內容是否符合使用者需求。

## When？

你會在以下情境中看到它被廣泛使用：
1. **訓練過程中**：尤其是多類別分類問題，例如手寫字辨識（MNIST 資料集）。
2. **監督式學習場景**：需要有已標記資料提供「真實標籤」。
3. **深度學習框架內建函數**：如 TensorFlow 和 PyTorch，都有內建 Cross Entropy Loss 的 API。

## Where？

Cross Entropy Loss 通常出現在以下架構中的 **Loss Function Layer**：
1. 深度神經網路（例如 [CNN](/docs/notes/convolutional-neural-network) 或 [RNN](/docs/notes/recurrent-neural-network)）的最後一層，用於計算每個批次樣本的損失。
2. 與 Softmax Activation 配合使用。Softmax 先將輸出轉換成機率分佈，而 Cross Entropy 則根據該機率進行評估。

流程簡化如下：
- 模型輸出 -> Softmax 計算機率分佈 -> Cross Entropy Loss 計算損失 -> 反向傳播更新參數

## Why？

Cross Entropy Loss 解決了多類別分類問題中的「如何衡量預測準確性」的需求。相比其他損失函數（如 Mean Squared Error），它能更有效地處理概率分佈上的差異，並且因其設計能促使模型快速收斂，在深度學習中非常受歡迎。

具體優勢包括：
1. 能夠處理非線性輸出的多類別情境。
2. 與 Softmax 配合，使得概率分佈更直觀。
3. 對錯誤較大的預測懲罰更嚴重，有助於提升精度。

舉例來說，如果你在做垃圾郵件檢測，Cross Entropy Loss 能讓你的模型對非垃圾郵件和垃圾郵件區分得更精細，而不是僅僅給出模糊概率。

## How？

### 🛠️ 建立階段

建立 Cross Entropy Loss 的流程可以分為以下幾步：
1. **資料準備**：確保訓練資料已經完成 One-Hot 編碼。
2. **定義模型輸出層**：通常是包含 Softmax Activation 的全連接層，用於生成每個類別的機率值。
3. **選擇損失函數 API**：例如 PyTorch 中 `torch.nn.CrossEntropyLoss()` 或 TensorFlow 中 `tf.keras.losses.CategoricalCrossentropy()`。
4. **反向傳播更新參數**：利用 Optimizer 根據計算出的損失值進行梯度下降更新權重。

範例程式碼 (PyTorch)：  
```python
import torch
import torch.nn as nn

# 定義 CrossEntropyLoss
criterion = nn.CrossEntropyLoss()

# 假設有兩個樣本和三個類別
predictions = torch.tensor([[0.2, 0.5, 0.3], [0.7, 0.1, 0.2]]) # 模型輸出 (logits)
labels = torch.tensor([1, 0]) # 真實標籤

# 計算損失
loss = criterion(predictions, labels)
print(loss.item())
```

### 🔍 查詢階段

查詢階段主要針對推論過程中的結果進行驗證。流程如下：

1. 使用訓練好的模型進行推論，獲取 logits 輸出。
2. 通過 Softmax 層轉換成機率分布。
3. 比對最終輸出的最高概率值與真實標籤，計算準確率或其他指標，如 F1-score、Recall 等。

範例程式碼 (TensorFlow)：  
```python
import tensorflow as tf

# 假設有三個類別和兩筆樣本
predictions = tf.constant([[0.6, 0.3, 0.1], [0.8, 0., 0.]]) # 模型輸出 (logits)
labels = tf.constant([[0., 1., 0.,], [1., 0., 0.]]) # 真實 One-Hot 標籤

# 使用 softmax + cross entropy 搭配驗證
loss_object = tf.keras.losses.CategoricalCrossentropy()
loss = loss_object(labels, predictions)
print(f"Loss value: {loss.numpy()}")
```

## 補充說明  

### 🔧 關鍵技術工具  

| 工具/框架           | 功能                                        | 官方文件連結                             |
|----------------------|---------------------------------------------|------------------------------------------|
| PyTorch              | 提供 `nn.CrossEntropyLoss` API             | https://pytorch.org/docs/stable/nn.html |
| TensorFlow           | 提供 `tf.keras.losses.CategoricalCrossentropy` | https://www.tensorflow.org/api_docs    |
| Keras                | 高階封裝 TensorFlow 搭配 CategoricalCrossentropy | https://keras.io/api/losses/            |

### 📌 範例比較  

以下列出了不同工具框架下的使用方式：

| 框架         | 定義方式                           | 註解                              |
|--------------|------------------------------------|-----------------------------------|
| PyTorch      | `nn.CrossEntropyLoss()`           | 一般用於多類別非 One-Hot 標籤     |
| TensorFlow   | `CategoricalCrossentropy(from_logits=True)` | 支援 logits 輸入                 |
| scikit-learn | 無內建 Cross Entropy，但能間接透過 log-loss 完成   | 適合簡單統計分析場景              |

### 🧠 延伸／常見誤解  

#### 誤解一：「可以直接用 MSE 處理分類問題嗎？」
不建議！MSE 在多類別分類問題上無法有效懲罰錯誤概率，不如 Cross Entropy 高效。例如，一個錯誤很大的預測可能引發 MSE 的小變化，但在 Cross Entropy 下會受到嚴厲懲罰，有助提升收斂速度。

#### 誤解二：「Softmax 和 Cross Entropy 是同一回事嗎？」
不是！Softmax 是一種激活函數，用來將 logits 映射到概率空間；而 Cross Entropy 則是專門用來衡量這些映射後結果與真實標籤之間差距的一種方法。通常這兩者搭配使用，但概念上完全不同。
