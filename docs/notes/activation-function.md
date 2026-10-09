---
title: "Activation Function"
slug: "/notes/activation-function"
tags:
  - "AI"
  - "DeepLearning"
  - "NeuralNetworks"
---
## What？

**激活函數（Activation Function）是什麼？**

激活函數是一種用於[人工神經網路](/docs/notes/artificial-neural-network)的數學函數，主要負責給非線性的特性加到模型中，使網路能夠學習複雜的資料模式，而不僅僅是線性關係。簡單來說，它像是模型的「調節器」，決定每個神經元要傳遞多少資訊到下一層。

舉例來說，如果沒有使用激活函數，神經網路的輸出只會是線性組合，無法解決像圖像辨識或語音識別這類需要高度非線性 [Features](/docs/notes/features) 的問題。想像你在分類不同顏色的圖片：若只用線性的方式處理，你可能根本分不清藍色和綠色。但加入適當的激活函數後，模型就能更精準地捕捉差異。

---

## Who？

**誰需要使用激活函數？**

1. **AI／機器學習工程師**：在建構深度學習模型時，用來提升性能。
2. **研究人員**：探索不同類型的激活函數如何影響模型表現。
3. **資料科學家**：當處理非結構化資料（如圖片或聲音）時，需要它來讓模型更精準。
4. **應用開發者**：例如開發聊天機器人、推薦系統等需要深度學習支援的應用程式。

任何涉及 [Artificial Neural Network](/docs/notes/artificial-neural-network) 設計或訓練的人都不可避免地會接觸到激活函數。

---

## When？

**什麼時間點會用到？**

1. **[Forward Propagation](/docs/notes/forward-propagation)（Forward Propagation）階段**：每次計算神經元輸出的時候，都會套用激活函數。
2. **模型設計階段**：選擇適合問題需求的激活函數，例如 ReLU、Sigmoid 或 Tanh 等。
3. **訓練過程中調整超參數時**：有些情況下切換不同類型的激活函數可以提高訓練效率或結果精度。
4. **[Inference](/docs/notes/inference)（Inference）階段**：即使已完成訓練，推論也依然需要通過已定義好的激活函數。

---

## Where？

**出現在架構哪個部分？**

激活函數通常應用於人工神經網路中的每一層隱藏層以及輸出層內部。具體位置如下：

1. 隱藏層中的每一個節點（Neuron）：負責將加權輸入值進行非線性轉化並傳遞至下一層。
2. 輸出層：幫助將最後一輪處理結果轉化為所需格式，例如分類問題中常見 Softmax 用於產生概率分佈。

簡單理解，它就藏在每個「神經元」後面，扮演「門檻值」或「調整器」角色。

---

## Why？

**為什麼需要使用激活函數？**

1. **引入非線性能力**：如果沒有它，神經網路只能處理簡單的線性問題，但我們大多面對的是複雜且多樣化的資料。
2. **減少 [Overfitting](/docs/notes/overfitting) 風險**：某些特定類型如 ReLU 具有稀疏性的特質，有助於減少過度擬合現象。
3. **控制 [Gradient Explosion](/docs/notes/gradient-explosion) 與 [Gradient Vanishing](/docs/notes/gradient-vanishing) 問題：
   - 像 Sigmoid 在某些情況下容易導致梯度消失，因此選擇適當功能可以改善這種情況。
   - ReLU 則因其簡單且有效，成為目前最常見選擇之一。

---

## How？

### 🛠️ 建立階段

以下是建立人工神經網路時如何加入與設定激活函數：

1. 定義你的網路架構：
   - 決定幾層隱藏層與每層包含多少節點。
2. 在每一層明確指定要使用哪種 Activation Function：
   - 常見範例：
     ```python
     from tensorflow.keras.layers import Dense, Activation
     
     # 使用 ReLU 作為隱藏層
     model.add(Dense(64))
     model.add(Activation('relu'))
     
     # 使用 Softmax 作為輸出層
     model.add(Dense(10))
     model.add(Activation('softmax'))
     ```
3. 調整其他超參數，例如 Learning Rate 或 Optimizer，以配合你的選擇。

### 🔍 查詢階段

完成訓練後，你可以透過以下方式查詢結果並檢視效果：

1. 檢視各節點在 Forward Propagation 中是否正確套用了 Activation Function：
   - 使用框架提供的方法，例如 TensorFlow 的 `model.summary()` 查看架構配置。
   
2. 比較不同 Activation Function 的表現：
   - 設置實驗來測試不同選項（如 Sigmoid vs ReLU），並記錄 Loss 和 Accuracy 變化。

---

## 補充說明

### 📌 範例比較

以下展示常見 Activation Functions 的行為比較：

| 激活函數      | 特徵                              | 適用範圍                          |
|---------------|----------------------------------|-----------------------------------|
| Sigmoid       | 輸出介於 0 和 1                  | 二元分類                          |
| Tanh          | 輸出介於 -1 和 1                | 解決資料標準化需求                 |
| ReLU          | 輸出大於 0 保留，小於 0 為 0      | 大部分深度學習任務                 |
| Leaky ReLU    | 改善梯度消失，小於 0 時保留小斜率   | 高效但避免梯度消失                |

---

### 🧠 延伸／常見誤解

#### 誤解一：「所有情境中 ReLU 都比 Sigmoid 好。」
ReLU 雖然方便且快速，但遇到某些極端情境（如所有輸入都小於零），可能導致“死區”（Dead Neurons）。而 Sigmoid 對概率分佈有天然優勢，在二元分類上仍然很實用。

#### 誤解二：「Softmax 是唯一可用在多類別輸出的。」
雖然 Softmax 是最常見選擇，但其他方法如 Sigmoid 結合 One-vs-All 策略也可以達成多類別分類效果。

#### 延伸應用：「自定義 Activation Functions」
若內建選項無法滿足需求，你可以撰寫自定義 Python 函式來實現自己的邏輯。例如創建一個介於 Tanh 與 ReLU 的混合版本，用以處理特殊資料集。
