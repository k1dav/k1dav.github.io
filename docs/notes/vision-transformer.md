---
title: "Vision Transformer"
slug: "/notes/vision-transformer"
tags:
  - "AI"
  - "ComputerVision"
  - "DeepLearning"
---
## What？

Vision Transformer （簡稱 ViT）是一種基於 Transformer 架構的模型，專門應用於圖像處理的領域。它將圖像分割成小塊（稱為 patches），並以類似於 NLP 中 Token 的方式進行處理，利用 Self-Attention 機制來捕捉圖像特徵。

簡單來說， ViT 是一種新穎的深度學習模型，它改變了傳統 [Convolutional Neural Network](/docs/notes/convolutional-neural-network) 的思路，讓 Transformer 不僅能處理文字，也能有效分析視覺數據。在實務中， ViT 常用於影像分類、物件偵測以及語意分割等任務。

---

## Who？

主要使用 Vision Transformer 的族群包括：

1. **研究者與學者**：探索新的模型架構與技術進步。
2. **工程師**：在視覺相關應用中，如自動駕駛、醫學影像分析等領域採用 ViT。
3. **AI 開發者**：希望優化現有影像模型或開發更高效解決方案的人。
4. **企業**：需要在產品中嵌入尖端影像處理技術的公司，如電商推薦系統或監控系統。

不過也需要注意的是，由於 ViT 訓練所需資源較多，因此小型團隊可能會面臨計算成本挑戰。

---

## When？

Vision Transformer 通常使用在以下情境：

- **訓練階段**：當你擁有大量標註好的影像資料集（如 ImageNet）。
- **推論階段**：需要快速且高準確率地分析輸入圖片，例如即時物件偵測或分類。
- **替代 CNN 模型**：當傳統 CNN 面臨瓶頸（如對大規模資料的泛化能力不足）時，可以考慮試用 ViT。

此外，在異質性較高的影像資料（比如衛星圖、X光片）上， ViT 可能更具優勢。

---

## Where？

Vision Transformer 主要出現在以下架構部分：

- **輸入層**：ViT 將原始圖片切割成固定大小的小塊（ patches），並將每個 patch 轉換為向量表示。
- **核心層**：使用 Multi-Head Self-Attention 機制來捕捉全局特徵，而非局限於局部感受野（如 CNN）。
- **輸出層**：透過 MLP Head 或其他方法將最後的特徵轉換為預測結果。

這些部分可以嵌入到大規模 AI 系統中，例如作為子模型的一部分，或者整合到多模態架構之中。

---

## Why？

Vision Transformer 解決了以下問題：

1. **局部 vs 全域特徵捕捉問題**  
   傳統 [CNN](/docs/notes/convolutional-neural-network) 擅長提取局部特徵，但面臨全局上下文理解不夠強的問題。而 ViT 藉由 [Self-Attention Mechanism](/docs/notes/self-attention) 能同時考慮圖像中的所有區域，提升了全局感知能力。

2. **靈活性不足問題**
   與 CNN 相比， Vision Transformer 可以適配不同大小和維度的輸入資料，更加通用化。

3. **性能瓶頸**
   在一些大型資料集上，如 ImageNet ， ViT 的效能往往超越 ResNet 等主流 CNN 架構。此外，它也展現了更好的可擴展性和泛化能力。

---

## How？

### 🛠️ 建立階段

建立 Vision Transformer 一般包含以下步驟：

1. 將圖片切割成固定大小的小塊（ patches），例如每個 patch 大小設為 \(16 \times 16\) pixels。  
2. 將每個 patch 映射到高維向量空間，這一步通常使用 Linear Projection。  
3. 添加 Position Embedding 到每個向量，以保留位置信息。  
4. 使用 Multi-Head Self-Attention 機制進行特徵提取。  
5. 通過一系列 Fully Connected Layers （MLP Head）進行分類或回歸操作。  

程式範例（簡化版）：  
```python
import torch.nn as nn

class SimpleViT(nn.Module):
    def __init__(self, num_patches, embed_dim, num_classes):
        super().__init__()
        self.patch_embed = nn.Linear(num_patches, embed_dim)
        self.position_embed = nn.Parameter(torch.randn(1, num_patches, embed_dim))
        self.transformer = nn.ModuleList([nn.MultiheadAttention(embed_dim, num_heads=8) for _ in range(6)])
        self.mlp_head = nn.Linear(embed_dim, num_classes)

    def forward(self, x):
        x = self.patch_embed(x) + self.position_embed
        for layer in self.transformer:
            x = layer(x)[0]
        return self.mlp_head(x.mean(dim=1))
```

### 🔍 查詢階段

查詢步驟如下：

1. 將輸入圖片切割成 patches 並轉換為數值表示。  
2. 運行已訓練好的 Vision Transformer 模型進行推論。  
3. 分析得到結果並完成目標任務，例如返回預測類別或座標點位置。

範例流程：
```python
def predict(image):
    image_patches = preprocess(image)  # 切割並轉換
    model_output = trained_vit(image_patches)
    return interpret_output(model_output)
```

---

## 補充說明

### 📌 範例比較

| 技術                       | 性能表現   | 訓練資源需求 | 適配場景   |
| ------------------------ | ------ | ------ | ------ |
| [ResNet](/docs/notes/resnet)               | 高準確率   | 資源需求中等 | 局部特徵為主 |
| Vision Transformer (ViT) | 更好泛化能力 | 資源需求較高 | 全域特徵分析 |

### 🧠 延伸／常見誤解

1. **誤解一：ViT 完全取代 CNN**
   - 雖然 ViT 展現了卓越性能，但在某些場景下，如低資源環境下的小型任務， CNN 還是有其優勢。例如在邊緣設備上的部署通常更偏好輕量級模型。
   
2. **誤解二：Self-Attention 是唯一關鍵**
   - 雖然 Self-Attention 是核心機制，但 Position Embedding 和 Patch Dividing 同樣不可忽略。如果沒有正確設計這些部分，其性能可能顯著下降。
   
3. **延伸應用**
   - 除了影像分類外，目前已有人嘗試將 Vision Transformer 用於多模態學習，例如結合文本與圖像資訊進行跨領域任務。
