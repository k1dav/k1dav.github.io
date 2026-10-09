---
title: "ReLU"
slug: "/notes/relu"
tags:
  - "ActivationFunctions"
  - "DeepLearning"
  - "MachineLearning"
  - "NeuralNetworks"
---
## What？
ReLU（Rectified Linear Unit）是一種簡單而有效的激活函數（Activation Function），定義為 f(x) = max(0, x)。當輸入為正時，輸出等於輸入；當輸入為負時，輸出為零。這個看似簡單的非線性變換在深度學習中引發了革命。

ReLU 在 2011 年被提出後，迅速成為現代深度神經網絡的標準激活函數。相比於 Sigmoid 和 Tanh 等舊函數，ReLU 計算速度更快，且能更有效地解決梯度消失問題（Vanishing Gradient Problem）。例如，在影像分類任務中，使用 ReLU 的卷積神經網絡能更快地訓練並達到更高的精度。

ReLU 的簡潔性和高效性使其成為現代深度學習框架的預設選擇。它允許網絡學習稀疏特徵表示，提高了模型的可解釋性。

---

## Who？
- 深度學習從業者和研究人員
- 構建神經網絡的工程師
- 自然語言處理（NLP）和計算機視覺（Computer Vision）專家
- 遵循最佳實踐的 ML 從業者

---

## When？
1. 在卷積神經網絡（CNN）隱藏層中應用
2. 遞迴神經網絡（RNN）中替代 Tanh 激活函數
3. 深度 Transformer 模型的前饋網絡（Feed-forward Network）層
4. 數值迴歸任務中作為中間層激活（輸出層通常不用 ReLU）

---

## Where？
1. 神經網絡架構的隱藏層（全連接層、卷積層之後）
2. 編碼器-解碼器模型（Encoder-Decoder）的各層
3. Vision Transformer 和 BERT 等預訓練模型的密集層
4. 強化學習中的價值函數（Value Function）網絡

---

## Why？
- **計算高效**：ReLU 只需比較和選擇操作，遠快於指數計算
- **梯度流暢**：避免了 Sigmoid 的梯度消失問題，加速訓練收斂
- **稀疏性**：負值輸出為零，促進了特徵的稀疏表示

---

## How？
### 🛠️ 建立階段
```python
import torch
import torch.nn as nn

# 在 Sequential 模型中使用 ReLU
model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),              # 添加 ReLU 激活
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10)      # 輸出層通常不加激活
)

# 或在自定義層中使用
class CustomNetwork(nn.Module):
    def __init__(self):
        super(CustomNetwork, self).__init__()
        self.fc1 = nn.Linear(784, 256)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(256, 10)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)      # 應用 ReLU
        x = self.fc2(x)
        return x
```

### 🔍 查詢階段
```python
# 查看激活值分布
import numpy as np

# 捕獲隱藏層輸出
hidden_output = model[0](input_data)
hidden_output = model[1](hidden_output)  # ReLU 後的輸出

# 分析稀疏性
sparsity = (hidden_output == 0).float().mean()
print(f"稀疏度：{sparsity:.2%}")  # 輸出為零的比例

# 可視化激活模式
import matplotlib.pyplot as plt
plt.hist(hidden_output.detach().numpy().flatten(), bins=50)
plt.show()
```

---

## 補充說明
### 📌 範例比較
| 激活函數 | 計算複雜度 | 梯度消失 | 神經元死亡 | 用途 |
|---------|----------|--------|----------|------|
| ReLU | 低 | 無 | 有 | 隱藏層 |
| Sigmoid | 中等 | 有 | 無 | 二分類輸出 |
| Tanh | 中等 | 有 | 無 | 循環神經網絡 |
| Leaky ReLU | 低 | 無 | 無 | 防止死亡神經元 |

### 🧠 延伸／常見誤解
- **誤解**：ReLU 不能用在輸出層。實際上，對於迴歸任務，輸出層常不使用激活函數或使用線性激活。
- **延伸**：Leaky ReLU 在負值區域使用小斜率（如 0.01x），解決了「死亡 ReLU」現象，其中某些神經元在訓練期間永遠不會被啟動。
