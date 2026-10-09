---
title: "ResNet"
slug: "/notes/resnet"
tags:
  - "AI"
  - "ComputerVision"
  - "DeepLearning"
---
## ResNet 技術解說

ResNet 是深度學習領域中非常知名的模型架構，特別在影像辨識和分類任務上表現卓越。以下我們將以技術工作者的角度，清楚且條理分明地介紹 ResNet。

---

## What？

**ResNet** （Residual Network）是一種深度神經網路架構，設計目的是解決「網路越深性能反而下降」的問題。傳統上，增加模型層數應該提升表現，但實際上會因梯度消失或梯度爆炸等問題導致效果變差。 ResNet 提出了 **skip connections** （跳躍連接），能有效改善這些問題。

### 簡單說：
ResNet 的核心概念是「殘差學習」（Residual Learning）。它透過將輸入直接傳遞到後面的一層或多層（跳躍連接），讓網路不必完全依賴深層參數來學習新特徵。

### 比喻：
想像你正在搭建一座橋，普通的網路就像要重新從零開始建橋，而 ResNet 則像是在原有橋樑基礎上增添更高效能的結構，使得搭建過程更穩定、更快完成。

---

## Who？

ResNet 主要由以下群體使用或受影響：

- **AI 工程師**：用來設計影像辨識、物件偵測或語音處理模型。
- **資料科學家**：應用於需要高準確率預測的任務，例如醫療影像診斷。
- **研究人員**：探討深度學習中的架構設計及其改進方法。

---

## When？

您可能會在以下情境中使用 ResNet：

1. **影像分類任務**：例如 CIFAR-10 或 ImageNet 資料集。
2. **物件偵測**：如 Faster R-CNN 背後使用 ResNet 作為 backbone。
3. **語音處理與自然語言處理（NLP）應用**：某些情境下也可借助殘差框架進行特徵提取。

---

## Where？

ResNet 通常出現在深度神經網路的核心架構部分，例如：

- **Convolutional Layers（卷積層）**：作為基本模組，用於提取特徵。
- **Skip Connections（跳躍連接）**：分布在每個 Residual Block 中，用於保留輸入訊息。
- **Backbone Networks（主幹網路）**：如 Faster R-CNN 等模型中作為基礎架構。

---

## Why？

ResNet 解決了什麼問題？主要是針對深層網路中的性能下降挑戰：

1. **[Gradient Vanishing](/docs/notes/gradient-vanishing)問題（Vanishing Gradient Problem）**
   - 深層網路中，梯度可能過小導致難以更新權重。而 ResNet 的 skip connections 可以防止訊息逐漸減弱。
   
1. **[Gradient Explosion](/docs/notes/gradient-explosion)問題（Exploding Gradient Problem）**
   - 若梯度過大則可能使訓練不穩定。透過保留部分原始訊息，有助於穩定訓練流程。

3. **模型性能瓶頸**
   - 傳統增加層數方法容易達到飽和，但 ResNet 能夠突破這個障礙並實現更高效能。

---

## How？

### 🛠️ 建立階段

建立 ResNet 模型可以透過以下流程：

1. 定義基本模組：
   - 每個 Residual Block 包含兩個或三個卷積層，每一層後面加上 Batch Normalization 和 ReLU 激活函數。
   
2. 添加 Skip Connections：
   - 將輸入直接加到 Residual Block 的輸出（可能需要調整維度）。

3. 堆疊多個 Residual Blocks：
   - 根據不同版本，如 ResNet-18、ResNet-50 或 ResNet-101，堆疊不同數量與配置的 block。

#### 程式邏輯範例（PyTorch 範例）
```python
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super(ResidualBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=1, padding=1)
        self.bn1 = nn.BatchNorm2d(out_channels)
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1)
        self.bn2 = nn.BatchNorm2d(out_channels)

    def forward(self, x):
        residual = x  # Skip Connection
        out = self.conv1(x)
        out = self.bn1(out)
        out = nn.ReLU()(out)
        out = self.conv2(out)
        out = self.bn2(out)
        out += residual  # Combine with skip connection
        return nn.ReLU()(out)
```

### 🔍 查詢階段

查詢時，通常以以下方式進行：

1. 載入訓練好的模型權重，例如預訓練的 ImageNet 模型。
   
2. 提供輸入資料並通過模型進行推論：
   ```python
   model.eval()
   with torch.no_grad():
       predictions = model(input_data)
   ```

3. 比對結果與 Ground Truth 並計算準確率、損失值等指標。

---

## 補充說明

### 📌 範例比較

| 架構名稱      | 訓練時間  | 表現準確率         |
|---------------|-----------|-------------------|
| AlexNet       | 較短      | 準確率約 57%      |
| VGG           | 中等      | 準確率約 71%      |
| ResNet-50     | 較長      | 準確率約 76%      |

### 🧠 延伸／常見誤解

#### 誤解一：「所有網路都適合用 skip connections」
並非所有場景都適合使用 skip connections。例如在某些 NLP 任務中，其效果未必比其他專門設計的 Transformer 架構來得好。

#### 誤解二：「ResNet 層數越多越好」
雖然增加層数通常可以提升表現，但太多層可能導致運算成本大幅增加，也需注意是否有必要性。例如，在小型資料集上使用 ResNet-101 不一定比 ResNet-50 表現更好。

#### 延伸應用：
除了影像分類外，您也可以嘗試將殘差思想融入其他領域，例如強化學習中的策略生成或時間序列資料分析！
