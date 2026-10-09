---
title: "LSTM"
slug: "/notes/lstm"
tags:
  - "AI"
  - "DeepLearning"
  - "MachineLearning"
  - "NLP"
---
## What？

**Long Short-Term Memory 是什麼？**  
LSTM 是一種特殊的 [Recurrent Neural Network](/docs/notes/recurrent-neural-network)（RNN），設計用來克服普通 RNN 在長序列資料中出現的短期記憶問題。其核心特點是能夠有效地記住重要資訊並忘記不必要的資訊，透過引入 "記憶單元"（Memory Cell）來實現這一功能。

### 具體特徵  
- **記憶單元**：包含三個主要 Gate（控制門）：Input Gate、Forget Gate 和 Output Gate。
- **解決問題**：一般 RNN 在處理長時間依賴（long-term dependencies）時會出現梯度消失或爆炸，而 LSTM 能透過 Cell State 保持較穩定的梯度。

### 簡單比喻  
可以將 LSTM 想像成一個智能筆記本，它能決定哪些筆記要儲存、更新或丟棄，並在需要時提供正確的回憶。

---

## Who？

**誰使用？誰受影響？**  
LSTM 被廣泛使用於需要處理序列型資料的領域，例如：

- **機器學習工程師**：用於開發語音識別、自然語言處理（[NLP](/docs/notes/nlp)）、音樂生成等應用。
- **研究人員與數據科學家**：進一步探索新模型以改進 LSTM 的效能。
- **企業與產品團隊**：在產品中整合 LSTM 模型以進行文字預測、自動翻譯等功能。

例如，Google 翻譯中的句子生成部分便可能使用了類似 LSTM 的架構來理解上下文。

---

## When？

**什麼時間點會用到？**

LSTM 適合在以下場景中使用：
1. **需要上下文依賴性**：如文本生成或語音辨識。
2. **長時間序列分析**：例如股市走勢預測或天氣預報。
3. **高複雜度非線性模式分析**：如手寫字辨識或情感分析。

舉例來說，如果你正在設計一個聊天機器人，需要根據使用者輸入的一系列文字理解對話上下文，那麼 LSTM 非常適合這類任務。

---

## Where？

**LSTM 出現在架構哪個部分？**

在深度學習架構中，LSTM 通常是「序列到序列」（Sequence-to-Sequence）模型中的核心元件。例如：
- 應用於 Encoder 和 Decoder 層，用於自然語言生成任務。
- 作為 Time Series 模型的一部分，用於數據輸入層之後進行特徵提取。

範例：
```plaintext
Input Layer → Embedding Layer → LSTM Layer → Dense Layer → Output
```

---

## Why？

**解決什麼問題？**

普通 RNN 在處理長時間依賴時容易出現梯度消失或爆炸問題，使得模型難以捕捉遠距資訊。而 LSTM 的設計解決了此缺陷，其 Cell State 能有效保存重要資訊並根據需要更新。  

### 實際應用中的價值  
舉例來說，在翻譯句子 "I have a cat who loves fish"，普通 RNN 可能因句子太長而遺失 "who loves fish" 的信息；但 LSTM 可以保存整句上下文並正確理解主題含義。

---

## How？

### 🛠️ 建立階段

建立一個基本的 LSTM 模型可以分為以下步驟：

1. **準備資料集**
   - 將原始資料轉換成數值形式，例如透過 Word Embedding 或 One-hot Encoding。
2. **初始化模型架構**
   - 定義 Input Layer 和 Embedding Layer 等前置層級。
3. **加入 LSTM 層**
   - 使用框架（如 TensorFlow 或 PyTorch）定義帶有 `hidden state` 和 `cell state` 的 LSTM 層。例如：
     ```python
     from keras.models import Sequential
     from keras.layers import LSTM, Dense

     model = Sequential()
     model.add(LSTM(128, input_shape=(timesteps, features)))
     model.add(Dense(1, activation='sigmoid'))
     ```
4. **訓練模型**
   - 使用優化器和[損失函數](/docs/notes/loss-function)進行[反向傳播](/docs/notes/back-propagation)更新權重。

### 🔍 查詢階段

查詢階段通常指的是利用訓練好的模型進行推論。流程如下：
1. 將輸入轉換成與訓練一致的格式，例如文字轉向量化表示。
2. 利用訓練好的模型執行 Forward Pass，產生輸出結果，例如翻譯結果或分類標籤。
3. 如果需要，可以通過 Attention 機制提升查詢精確度，以聚焦重要訊息片段。

範例程式碼：
```python
# 推論階段範例
import numpy as np

input_data = np.array([[0.1, 0.2, 0.3]])
result = model.predict(input_data)
print("Prediction:", result)
```

---

## 補充說明

### 📌 範例比較  

以下是不同序列模型在文本生成上的效果比較：

| 模型類型    | 優勢                              | 缺點                      |
|-------------|-----------------------------------|---------------------------|
| RNN         | 計算速度較快                      | 長時間依賴效果差          |
| GRU         | 記憶能力較強                      | 不支持更複雜依賴          |
| LSTM        | 長短期記憶能力平衡                | 計算成本較高              |

### 🧠 延伸／常見誤解  

#### 誤解澄清
1. 誤認為所有序列任務都必須使用 LSTM。事實上，有些簡單任務如短句分類可以選擇更輕量化的 GRU 或 [CNN](/docs/notes/convolutional-neural-network)。
2. 認為有了 [Attention Mechanism](/docs/notes/self-attention) 後，就完全不需要 LSTM。實際上，兩者可以結合使用以提升效果，如 Transformer 中仍存在類似概念延伸。

#### 延伸應用
除了文本和語音之外，LSTM 也逐漸被應用於金融交易預測、生物醫學信號分析等領域。例如心電圖（ECG）的異常檢測便是一項熱門研究方向。
