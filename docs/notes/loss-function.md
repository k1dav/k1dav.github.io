---
title: "Loss Function"
slug: "/notes/loss-function"
tags:
  - "AI"
  - "DeepLearning"
  - "MachineLearning"
---
## What？

損失函數（Loss Function）是一個在機器學習和深度學習中非常重要的概念，它用來量化模型的預測結果與真實答案之間的誤差。簡單來說，損失函數就像一個「打分機制」，它告訴我們模型有多接近或多偏離目標。

舉個例子，假設我們在做房價預測，如果模型預測房價是 500 萬，但實際房價是 550 萬，那麼損失函數就可以幫助我們計算出這 50 萬差距的影響程度，並根據這個損失值來調整模型參數。

---

## Who？

損失函數主要由以下兩類人使用和受影響：

1. **[機器學習](/docs/notes/machine-learning)工程師**：負責訓練模型並優化其性能的人，需要選擇合適的損失函數。
2. **研究人員**：探索新型演算法或改良現有技術的人，也會涉及設計或改進損失函數。

此外，最終使用者可能間接受到影響，比如當推薦系統因為錯誤的損失函數導致精準度下降時，用戶體驗可能會受到負面衝擊。

---

## When？

在以下情境中，我們會用到損失函數：

1. **模型訓練時**：每次更新參數（例如透過[Gradient Descent](/docs/notes/gradient-descent)）都需要依靠損失函數。
2. **評估模型性能時**：透過計算損失值來判斷模型是否達到預期效果。
3. **超參數調整時**：不同的損失函數會影響特定[Hyperparameters](/docs/notes/hyperparameters)（如 Learning Rate）的選擇和表現。

---

## Where？

在架構層面，損失函數通常出現在以下位置：

- **訓練流程中**：作為[Back Propagation](/docs/notes/back-propagation)（Backpropagation）的核心部分。
- **演算法核心邏輯中**：例如梯度下降需要依賴 [Loss Function](/docs/notes/loss-function) 的導數。
- **目標定義部分**：模型目的是將 Loss 降到最低，因此它是整個優化問題中的關鍵元素。

---

## Why？

使用損失函數的主要目的是解決以下問題：

1. **量化誤差**：幫助我們了解模型與真實答案之間有多大偏差。
2. **指導學習方向**：提供明確的優化目標，以便透過反向傳播更新權重。
3. **比較不同方案效果**：當有多種模型或設定時，能用 Loss 值作為客觀比較基準。

例如，在分類任務中，如果錯誤率太高，我們可以檢查是否選擇了不合適的 Loss Function，比如應該用 Cross-Entropy 而不是 Mean Squared Error。

---

## How？

### 🛠️ 建立階段

建立階段主要包含以下步驟：

1. **定義目標問題**
   - 確保了解任務性質，例如是回歸還是分類。
   
2. **選擇合適的 Loss Function**
   - 回歸問題常用 Mean Squared Error 或 Mean Absolute Error。
   - 分類問題則常見 Cross-Entropy 或 Hinge Loss 等。

3. **將 Loss Function 整合進模型架構**
   - 在 TensorFlow 或 PyTorch 中，可以直接調用 API 定義：
     ```python
     # PyTorch 範例
     import torch.nn as nn
     loss_function = nn.CrossEntropyLoss()
     ```

4. **啟動訓練流程**
   - 搭配 Optimizer 和 Backpropagation 使用：
     ```python
     optimizer.zero_grad()
     loss.backward()
     optimizer.step()
     ```

### 🔍 查詢階段

查詢階段可以這樣進行：

1. 計算每次輸入樣本後產生的 Loss 值：
   ```python
   loss_value = loss_function(predicted, target)
   ```

2. 分析 Loss 值趨勢：
   - 繪製圖表（例如 Matplotlib），觀察收斂情況：
     ```python
     plt.plot(epoch_list, loss_values)
     plt.xlabel("Epochs")
     plt.ylabel("Loss")
     plt.show()
     ```

3. 調整超參數或重新選擇 Loss Function：
   基於查詢結果，如果發現 Loss 無法穩定下降，可以重新檢視學習率、Batch Size 或更換其他方法。

---

## 補充說明

### 📌 範例比較

以下是不同任務中常見損失函數比較：

| 任務類型        | 損失函數               | 優點                         | 缺點                     |
|-----------------|-----------------------|-----------------------------|--------------------------|
| 回歸            | Mean Squared Error    | 計算簡單且易於理解           | 對離群值敏感            |
| 回歸            | Mean Absolute Error   | 對離群值較不敏感             | 不易處理微小變化        |
| 分類            | Cross-Entropy         | 適合多分類問題               | 較難解釋直觀含義        |

### 🧠 延伸／常見誤解

#### 誤解 1: 搶先選擇複雜的 Loss Function  
許多人認為越複雜的功能越好，其實初始訓練時應該從簡單且直觀的方法開始，例如回歸可先嘗試 Mean Squared Error，再進一步微調。

#### 誤解 2: 忽略對資料分布特性的考慮  
如果資料分布異常，例如存在大量噪音或極端值，就需要考慮 Robust 的方法，例如 Huber Loss，而非直接套用 MSE 或 MAE。

#### 延伸應用  
除了傳統用途外，有些特殊場景下也可以自定義特殊的 Loss Functions，例如 GAN 的對抗性目標需要設計 Generator 和 Discriminator 的專屬公式。
