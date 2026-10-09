---
title: "Dropout"
slug: "/notes/dropout"
tags:
  - "AI"
  - "機器學習"
  - "深度學習"
  - "正則化技術"
---
## What？

**Dropout 是什麼？**

Dropout 是一種用於深度學習模型的正則化技術，目的是減少模型過度擬合（[Overfitting](/docs/notes/overfitting)）的問題。它透過在訓練期間隨機丟棄部分神經元來增加模型的泛化能力。這樣能避免模型過於依賴某些特定特徵或權重，並促使網路學習更具代表性的資料特徵。

舉例來說，假設一個神經網路有 10 個神經元，其中某幾個神經元對輸出影響很大。如果沒有 Dropout，模型可能會過度依賴這些「強影響」神經元，而忽略其他部分。使用 Dropout 技術後，每次訓練會隨機讓部分神經元「暫時休息」，迫使網路在不同情境下進行學習。

---

## Who？

**誰使用、誰受影響？**

Dropout 主要是深度學習工程師與研究人員在設計與訓練模型時使用的工具。它通常出現在需要處理大量資料且希望提升模型泛化性能的場景。例如：
- **深度學習工程師**：設計卷積神經網路（[CNN](/docs/notes/convolutional-neural-network)）或循環神經網路（[RNN](/docs/notes/recurrent-neural-network)）時使用 Dropout。
- **研究人員**：進行人工智慧相關研究時，用以比較不同正則化方法的效果。
- **商業應用開發者**：開發推薦系統、影像識別等高需求場景，希望避免因資料偏差導致性能下降。

此外，最直接受影響的是訓練中的模型本身，它不僅需要在 Dropout 的干擾下完成訓練，還需保證最終推論階段能穩定運作。

---

## When？

**什麼時間點會用到 Dropout？**

Dropout 通常在以下情境中被使用：
1. **訓練深度學習模型時**：尤其是在資料量有限或特徵複雜但容易過擬合的小型數據集上。
2. **提升泛化性能時**：希望模型能對未見過的資料有良好預測能力。
3. **多層結構中間層**：通常放置於全連接層（Fully Connected Layers），但也可以根據需求應用於其他層如卷積層（Convolutional Layers）。

---

## Where？

**Dropout 出現在架構哪個部分？**

Dropout 通常被插入到深度學習架構中的隱藏層（Hidden Layers）。具體位置包括：
1. **全連接層之間**：最常見的位置，用以減少全連接層內部權重依賴性。
2. **卷積層之後**：若用於 CNN 架構，可以放置於卷積操作完成後，但不建議放在輸入層或輸出層。
3. **RNN 的時間步驟中間位置**：若是 [LSTM](/docs/notes/lstm) 或 GRU 等結構，也可加入 Dropout 增加正則效果。

例如，在 Keras 中，可以透過 `Dropout` 層輕鬆地實現此功能：
```python
from keras.layers import Dropout

model.add(Dropout(rate=0.5))
```

---

## Why？

**為什麼要用 Dropout？解決了什麼問題？**

主要原因是解決深度學習中的「過擬合」問題。當模型太複雜且參數太多，又搭配有限的訓練資料時，很容易出現以下情況：
1. 模型記住了訓練集中的具體樣本，而非通用模式。
2. 對測試集表現不佳，泛化能力不足。

Dropout 透過隨機丟棄部分神經元，使得每次前向傳播和反向傳播都基於不同子網路進行更新。這讓模型更具韌性，不容易被單一特徵主導。

公式上可以表達為：
$$
y = f(x; \theta)
$$
其中 $\theta$ 是參數，我們通過隨機屏蔽部分 $\theta$ 的方式來逼迫 [Optimizer](/docs/notes/optimizer) 找到更穩健的解。

---

## How？

### 🛠️ 建立階段

1. 設定隱藏層結構，例如全連接層或卷積層。
2. 在指定位置加入 `Dropout` 層，並設定丟棄比例 `rate`（通常介於 0 到 0.5）。
3. 確保其他超參數如 learning rate 與 batch size 維持合理範圍，以避免 Dropout 過強導致收斂困難。
4. 使用標準框架如 TensorFlow 或 PyTorch 實現：

PyTorch 範例：
```python
import torch.nn as nn

drop_layer = nn.Dropout(p=0.5) # 丟棄比例為 50%
output = drop_layer(input)
```

### 🔍 查詢階段

- 在查詢（推論）階段，不再進行隨機丟棄操作，而是使用完整網路結構進行計算。
- 在框架中自動切換模式，例如 PyTorch 中設定 `model.eval()` 即可停用 Dropout：

```python
model.eval()
output = model(input)
```

---

## 補充說明

### 📌 範例比較

| 技術名稱          | 是否支援正則化 | 泛化能力提升效果 |
|-------------------|---------------|------------------|
| L2 Regularization | 是            | 中等             |
| Batch Normalization | 部分支援     | 顯著             |
| Dropout           | 是            | 高               |

### 🧠 延伸／常見誤解

1. **誤解：「所有區塊都應該加 Dropout」**
   - 錯！通常只加在中間隱藏層，輸入與輸出層不建議使用，以免損失重要資訊。

2. **誤解：「丟棄比例越高越好」**
   - 錯！比例一般建議介於 0 到 0.5，如果超過可能導致信息流失太多，使得收斂困難。

3. **延伸技術：「Spatial Dropout」**
   - 用於 [CNN](/docs/notes/convolutional-neural-network) 中，不僅丟棄某些節點，還可以丟棄整個 feature map，是更針對圖像任務的一種方法。
